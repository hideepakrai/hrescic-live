import * as fs from 'fs';
import * as path from 'path';

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    for (let file of list) {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
            results.push(file);
        }
    }
    return results;
}

const srcDir = path.join(process.cwd(), 'src');
const files = walk(srcDir);
let modifiedCount = 0;

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    const original = content;

    // Fix broken fontFamily patterns like:
    // fontFamily: "\"Optima\", \"Times New Roman\", serif'
    // These happen when the fixer changed a single quote inside a double-quoted string
    // Pattern: fontFamily: ""...", "...", ...'  -> fontFamily: "'...', '...', ..."
    
    // Fix pattern: fontFamily: ""X", "Y", Z'  -> fontFamily: "'X', 'Y', Z"
    // Regex: after fontFamily: " we have " immediately (meaning double-quote was replaced to ')  
    content = content.replace(
        /fontFamily:\s*"("([^"]+)",\s*"([^"]+)",\s*([^']+))'/g,
        "fontFamily: \"'$2', '$3', $4\""
    );
    
    // Also fix: fontFamily: ""Optima", "Times New Roman', serif'  -> fontFamily: "'Optima', 'Times New Roman', serif"
    // General: if fontFamily starts with " then inner " followed by font name then " 
    // Match pattern: fontFamily: ""fontname1", "fontname2', ...
    content = content.replace(
        /fontFamily:\s*'("([^"]+)",\s*"([^"]+)",\s*([^'}]+))'/g,
        "fontFamily: \"'$2', '$3', $4\""
    );

    // Fix: "Optima", "Times New Roman", serif'  (extra trailing single quote)
    content = content.replace(/"((?:[^"]+",\s*")*[^'"]+)'/g, (match, inner) => {
        // Only fix if this looks like a fontFamily value
        if (match.includes('Optima') || match.includes('Times New Roman') || match.includes('Georgia') || match.includes('serif') || match.includes('sans-serif')) {
            return '"' + inner + '"';
        }
        return match;
    });

    if (content !== original) {
        fs.writeFileSync(file, content, 'utf8');
        modifiedCount++;
        console.log('Fixed fontFamily in: ' + path.basename(file));
    }
});

console.log('\nTotal files fixed: ' + modifiedCount);

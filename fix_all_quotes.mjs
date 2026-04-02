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

    // Detect lines with JSX attributes that have an unescaped double-quote mid-string.
    // Pattern: ="string"word (double quote opens, then closes, then text continues without operator)
    // We'll look for specific known broken patterns and fix them:

    // Fix: alt="L"Oreal... -> alt="L'Oreal...
    content = content.replace(/="L"Oreal/g, "=\"L'Oreal");
    // Fix: any ="word"word that might be leftover - generic fix for apostrophe-like embedded quotes
    // The most common issue: curly quotes were in original as " which got matched as broken string
    // Replace curly double opening and closing quotes directly with appropriate chars
    content = content.replace(/\u201C/g, "'");   // curly left double quote in JSX text = apostrophe
    content = content.replace(/\u201D/g, "'");   // curly right double quote in JSX text = apostrophe

    if (content !== original) {
        fs.writeFileSync(file, content, 'utf8');
        modifiedCount++;
        console.log('Fixed: ' + path.basename(file));
    }
});

console.log('\nTotal files fixed: ' + modifiedCount);

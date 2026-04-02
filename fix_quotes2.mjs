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

    // Fix reverse: ="... '  (double open, single close for asset paths)
    content = content.replace(/="(\/assets\/[^']+)'/g, '="$1"');

    if (content !== original) {
        fs.writeFileSync(file, content, 'utf8');
        modifiedCount++;
        console.log('Fixed: ' + file);
    }
});

console.log('\nTotal files fixed: ' + modifiedCount);

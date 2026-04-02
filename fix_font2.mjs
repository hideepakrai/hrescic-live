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

const fixes = [
    // Pattern: fontFamily: '"X", "Y", Z'  -> fontFamily: "'X', 'Y', Z"
    [/'("Optima", "Times New Roman", serif)'/g, '"\'Optima\', \'Times New Roman\', serif"'],
    [/"("Optima", "Times New Roman", serif)'/g, '"\'Optima\', \'Times New Roman\', serif"'],
    [/'("Optima", sans-serif)'/g, '"\'Optima\', sans-serif"'],
    [/"("Optima", sans-serif)'/g, '"\'Optima\', sans-serif"'],
    [/'("Georgia", "Times New Roman", serif)'/g, '"\'Georgia\', \'Times New Roman\', serif"'],
    [/"("Georgia", "Times New Roman", serif)'/g, '"\'Georgia\', \'Times New Roman\', serif"'],
];

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    const original = content;

    for (const [pattern, replacement] of fixes) {
        content = content.replace(pattern, replacement);
    }

    if (content !== original) {
        fs.writeFileSync(file, content, 'utf8');
        modifiedCount++;
        console.log('Fixed: ' + path.basename(file));
    }
});

console.log('\nTotal files fixed: ' + modifiedCount);

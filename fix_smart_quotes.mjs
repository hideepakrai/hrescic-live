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

    // Fix 1: alt/any attribute that starts with " but ends with closing " before the actual "
    // Pattern: ="text with embedded " inside"  -> ="text with embedded &quot; inside"
    // Specifically: alt="L"Oreal..." -> alt="L&apos;Oreal..."
    // Actually better: replace curly/smart quotes with straight quotes
    // Replace smart/curly double quotes with straight double quotes
    content = content.replace(/\u201C/g, '"'); // LEFT DOUBLE QUOTATION MARK
    content = content.replace(/\u201D/g, '"'); // RIGHT DOUBLE QUOTATION MARK
    content = content.replace(/\u2018/g, "'"); // LEFT SINGLE QUOTATION MARK  
    content = content.replace(/\u2019/g, "'"); // RIGHT SINGLE QUOTATION MARK

    if (content !== original) {
        fs.writeFileSync(file, content, 'utf8');
        modifiedCount++;
        console.log('Fixed smart quotes in: ' + path.basename(file));
    }
});

console.log('\nTotal files fixed: ' + modifiedCount);

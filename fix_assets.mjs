import * as fs from 'fs';
import * as path from 'path';

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            results = results.concat(walk(file));
        } else { 
            if (file.endsWith('.tsx') || file.endsWith('.ts')) {
                results.push(file);
            }
        }
    });
    return results;
}

const targetDirs = [path.join(process.cwd(), 'src')];

let files = [];
targetDirs.forEach(d => {
    if (fs.existsSync(d)) files = files.concat(walk(d));
});

let modifiedCount = 0;
files.forEach(file => {    
    let rawContent = fs.readFileSync(file, 'utf8');
    let content = rawContent.replace(/["']\.\.\/(?:\.\.\/)*assets\//g, "'/assets/");
    content = content.replace(/["']\.\/assets\//g, "'/assets/");
    
    if (content !== rawContent) {
        fs.writeFileSync(file, content, 'utf8');
        modifiedCount++;
    }
});

console.log('Fixed asset paths in ' + modifiedCount + ' files.');

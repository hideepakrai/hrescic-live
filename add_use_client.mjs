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

const targetDirs = [
    path.join(process.cwd(), 'src', 'components'),
    path.join(process.cwd(), 'src', 'pages'),
    path.join(process.cwd(), 'src', 'hooks')
];

let files = [];
targetDirs.forEach(d => {
    if (fs.existsSync(d)) {
        files = files.concat(walk(d));
    }
});


let modifiedCount = 0;
const clientTriggers = ['useState', 'useEffect', 'useRef', 'useCallback', 'useContext', 'useReducer', 'framer-motion', 'onClick'];

files.forEach(file => {
    let rawContent = fs.readFileSync(file, 'utf8');
    
    if (rawContent.includes('"use client"') || rawContent.includes("'use client'")) return;
    
    let needsClient = clientTriggers.some(trigger => rawContent.includes(trigger));
    if (needsClient) {
        const content = `"use client";\n` + rawContent;
        fs.writeFileSync(file, content, 'utf8');
        modifiedCount++;
    }
});

console.log('Added use client to ' + modifiedCount + ' files.');

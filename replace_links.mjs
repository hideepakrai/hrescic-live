import * as fs from 'fs';
import * as path from 'path';

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            /* Recurse into a subdirectory */
            results = results.concat(walk(file));
        } else { 
            /* Is a file */
            if (file.endsWith('.tsx') || file.endsWith('.ts')) {
                results.push(file);
            }
        }
    });
    return results;
}

const targetDirs = [
    path.join(process.cwd(), 'src', 'components'),
    path.join(process.cwd(), 'src', 'pages')
];

let files = [];
targetDirs.forEach(d => {
    if (fs.existsSync(d)) {
        files = files.concat(walk(d));
    }
});

let modifiedCount = 0;

files.forEach(file => {
    let rawContent = fs.readFileSync(file, 'utf8');
    let content = rawContent;
    
    // Replace react-router-dom Link import with next/link
    if (content.includes("from 'react-router-dom'") || content.includes('from "react-router-dom"')) {
        content = content.replace(/import\s+\{\s*Link\s*\}\s*from\s*['"]react-router-dom['"];?/g, "import Link from 'next/link';");
        // Sometimes useNavigate is there too
        if(content.includes('useNavigate')) {
           content = content.replace(/import\s+\{([^}]*)useNavigate([^}]*)\}\s*from\s*['"]react-router-dom['"];?/g, "import { $1 $2 } from 'react-router-dom';\nimport { useRouter } from 'next/navigation';");
           content = content.replace(/useNavigate\(\)/g, "useRouter()");
        }
        if(content.includes('useLocation')) {
            content = content.replace(/import\s+\{([^}]*)useLocation([^}]*)\}\s*from\s*['"]react-router-dom['"];?/g, "import { $1 $2 } from 'react-router-dom';\nimport { usePathname } from 'next/navigation';");
            content = content.replace(/useLocation\(\)/g, "usePathname()");
        }
    }

    // Replace <Link to= with <Link href=
    // Match <Link ... to=...
    content = content.replace(/<Link([^>]*)to=/g, "<Link$1href=");

    if (content !== rawContent) {
        fs.writeFileSync(file, content, 'utf8');
        modifiedCount++;
    }
});

console.log('Modified ' + modifiedCount + ' files.');

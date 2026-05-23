import fs from 'fs';
import path from 'path';

const srcPath = path.join(process.cwd(), 'src', 'pages', 'EducationELearningPage.tsx');
const destPath = path.join(process.cwd(), 'src', 'pages', 'LearningAndDevelopmentPage.tsx');

let content = fs.readFileSync(srcPath, 'utf-8');

// Replace component name
content = content.replace(/EducationELearningPage/g, 'LearningAndDevelopmentPage');
// Replace titles
content = content.replace(/Education & E-Learning/g, 'Learning & Development');
content = content.replace(/Education & e-learning/g, 'Learning & development');
content = content.replace(/education & e-learning/gi, 'learning & development');
content = content.replace(/education and e-learning/gi, 'learning & development');
content = content.replace(/Education businesses/g, 'Learning & development businesses');
content = content.replace(/education business/gi, 'learning & development business');
content = content.replace(/education platforms/gi, 'learning & development platforms');
content = content.replace(/education ecosystems/gi, 'learning ecosystems');
content = content.replace(/Education growth/g, 'Learning & development growth');
content = content.replace(/education system/gi, 'learning & development system');
content = content.replace(/Education strategy/gi, 'Learning & development strategy');
content = content.replace(/Education/g, 'Learning & Development');
content = content.replace(/education/g, 'learning & development');

fs.writeFileSync(destPath, content);
console.log('Duplicated to LearningAndDevelopmentPage.tsx');

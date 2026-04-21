const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const mascotPattern = /^corgimascot-.+\.png$/;

if (!fs.existsSync(distDir)) {
  throw new Error('dist/ does not exist. Run vite build before copying public assets.');
}

for (const fileName of fs.readdirSync(rootDir)) {
  if (!mascotPattern.test(fileName)) continue;

  fs.copyFileSync(path.join(rootDir, fileName), path.join(distDir, fileName));
}

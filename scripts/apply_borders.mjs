import fs from 'fs';

const JSON_PATH = '/tmp/generated_borders.json';
const TS_PATH = 'src/data/mapPolygons.ts';

const borders = JSON.parse(fs.readFileSync(JSON_PATH, 'utf-8'));
let tsContent = fs.readFileSync(TS_PATH, 'utf-8');

for (const [id, data] of Object.entries(borders)) {
  // Regex to match the region block
  const regionRegex = new RegExp(`(id:\\s*'${id}'.*?polygon:\\s*')[^']*(',\\s*center:\\s*\\[)[^\\]]*(\\])`, 's');
  
  if (regionRegex.test(tsContent)) {
    tsContent = tsContent.replace(regionRegex, `$1${data.polygon}$2${data.center[0]}, ${data.center[1]}$3`);
    console.log(`Updated region: ${id}`);
  } else {
    // Some are formatted slightly differently or on different lines
    console.log(`Regex missed region: ${id}, trying fallback...`);
    const fallbackRegex = new RegExp(`(id:\\s*'${id}'.*?polygon:\\s*')[^']+(')`, 's');
    tsContent = tsContent.replace(fallbackRegex, `$1${data.polygon}$2`);
    
    const centerRegex = new RegExp(`(id:\\s*'${id}'.*?center:\\s*\\[)[^\\]]+(\\])`, 's');
    tsContent = tsContent.replace(centerRegex, `$1${data.center[0]}, ${data.center[1]}$2`);
  }
}

fs.writeFileSync(TS_PATH, tsContent);
console.log('Successfully updated mapPolygons.ts');

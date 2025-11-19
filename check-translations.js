const fs = require('fs');

// Read the translations file
const content = fs.readFileSync('lib/translations.ts', 'utf8');

// Extract the translations object
const translationsMatch = content.match(/export const translations = \{([\s\S]*?)\};/);
if (!translationsMatch) {
  console.error('Could not find translations object');
  process.exit(1);
}

const translationsStr = translationsMatch[1];

// Simple parser to extract keys from each language
function extractKeys(lang) {
  const langMatch = translationsStr.match(new RegExp(`${lang}: \\{([\\s\\S]*?)\\},`));
  if (!langMatch) return new Set();

  const langContent = langMatch[1];
  const keys = new Set();

  // Match key: 'value' or key: "value" patterns
  const keyMatches = langContent.matchAll(/(\w+): ['"`]/g);
  for (const match of keyMatches) {
    keys.add(match[1]);
  }

  return keys;
}

const enKeys = extractKeys('en');
const frKeys = extractKeys('fr');
const arKeys = extractKeys('ar');

console.log('Total English keys:', enKeys.size);
console.log('French keys:', frKeys.size);
console.log('Arabic keys:', arKeys.size);

// Find missing keys
const missingInFr = [...enKeys].filter(key => !frKeys.has(key));
const missingInAr = [...enKeys].filter(key => !arKeys.has(key));

console.log('\nMissing in French:', missingInFr.length);
if (missingInFr.length > 0) {
  console.log(missingInFr);
}

console.log('\nMissing in Arabic:', missingInAr.length);
if (missingInAr.length > 0) {
  console.log(missingInAr);
}
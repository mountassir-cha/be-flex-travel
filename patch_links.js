const fs = require('fs');
const path = require('path');

const filesToPatch = [
  'src/components/ui/ExperienceCard.tsx',
  'src/app/[locale]/transport/page.tsx',
  'src/app/[locale]/tours/page.tsx',
  'src/app/[locale]/reviews/page.tsx',
  'src/app/[locale]/page.tsx',
  'src/app/[locale]/tours/[slug]/page.tsx',
  'src/app/[locale]/contact/page.tsx',
  'src/app/[locale]/excursions/page.tsx',
  'src/app/[locale]/excursions/[slug]/page.tsx',
  'src/app/[locale]/activities/[slug]/page.tsx',
  'src/app/[locale]/activities/page.tsx'
];

const basePath = __dirname;

filesToPatch.forEach(fileRelPath => {
  const fullPath = path.join(basePath, fileRelPath);
  if (fs.existsSync(fullPath)) {
    let content = fs.readFileSync(fullPath, 'utf8');
    if (content.includes("import Link from 'next/link'")) {
      content = content.replace("import Link from 'next/link'", "import { Link } from '@/i18n/routing'");
      fs.writeFileSync(fullPath, content, 'utf8');
      console.log(`Successfully patched: ${fileRelPath}`);
    } else {
      console.log(`No match or already patched: ${fileRelPath}`);
    }
  } else {
    console.error(`File does not exist: ${fullPath}`);
  }
});

const fs = require('fs');
const path = require('path');

const PROJECTS_DIR = path.join(__dirname, '../projects');
const INDEX_FILE = path.join(__dirname, '../index.html');

console.log('Building Markdown projects...');

const files = fs.readdirSync(PROJECTS_DIR);
let projects = [];

files.forEach((file) => {
    if (!file.endsWith('.md') || file.startsWith('_')) return;

    const filePath = path.join(PROJECTS_DIR, file);
    const content = fs.readFileSync(filePath, 'utf-8');

    const slug = file.replace('.md', '');

    // Parse YAML frontmatter using Regex
    const fmMatch = content.match(/^---\n([\s\S]*?)\n---/);
    if (!fmMatch) return;

    const fmLines = fmMatch[1].split('\n');
    const metadata = {};

    fmLines.forEach((line) => {
        const separator = line.indexOf(':');
        if (separator !== -1) {
            const key = line.slice(0, separator).trim();
            const value = line.slice(separator + 1).trim();
            metadata[key] = value;
        }
    });

    projects.push({
        slug,
        title: metadata.title || slug,
        subtitle: metadata.subtitle || '',
        image: metadata.image || null,
        url: metadata.url || null,
        order: parseInt(metadata.order) || 99,
    });
});

// Sort ascending
projects.sort((a, b) => a.order - b.order);

// Generate HTML Cards
const cardsHtml = projects
    .map((p) => {
        const imageContent = p.image
            ? `<div class="browser-mockup">
               <div class="browser-mockup__header">
                   <span class="dot red"></span><span class="dot yellow"></span><span class="dot green"></span>
               </div>
               <div class="browser-mockup__content">
                   <img src="${p.image}" alt="${p.title}">
               </div>
           </div>`
            : `<div class="work-placeholder"></div>`;

        const linkHtml = p.url ? `<a href="${p.url}" target="_blank" class="card-external-link" aria-label="Visit website">Visit Live Site ↗</a>` : '';

        return `
                            <div class="work-card clickable fade-in" data-md="${p.slug}">
                                <div class="work-card__image-container">
                                    ${imageContent}
                                </div>
                                <div class="work-card__meta">
                                    <h3>${p.title}</h3>
                                    <p>${p.subtitle}</p>
                                    ${linkHtml}
                                </div>
                            </div>`;
    })
    .join('\n');

// Read Index
let indexHtml = fs.readFileSync(INDEX_FILE, 'utf-8');

// Replace via injection tokens
const regex = /(<!-- PROJECTS-START -->)[\s\S]*?(<!-- PROJECTS-END -->)/;
if (regex.test(indexHtml)) {
    indexHtml = indexHtml.replace(regex, `$1\n${cardsHtml}\n                            $2`);
    fs.writeFileSync(INDEX_FILE, indexHtml);
    console.log(`Successfully injected ${projects.length} projects into index.html`);
} else {
    console.error('Could not find injection tokens in index.html');
}

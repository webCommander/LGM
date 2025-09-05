const fs = require('fs-extra');
const path = require('path');
const sanityClient = require('@sanity/client');

const client = sanityClient({
  projectId: 'TON_PROJECT_ID', // Remplace par ton projectId
  dataset: 'production',
  apiVersion: '2025-01-01',
  useCdn: false,
});

const contentDir = path.join(__dirname, '../content/posts');

async function fetchAndWritePosts() {
  const query = '*[_type == "post"]{title, slug, body, publishedAt, category}';
  const posts = await client.fetch(query);

  for (const post of posts) {
    const category = post.category || 'autre';
    const categoryDir = path.join(contentDir, category);
    await fs.ensureDir(categoryDir);

    const slug = post.slug?.current || post.title.toLowerCase().replace(/\s+/g, '-');
    const filename = path.join(categoryDir, `${slug}.md`);

    const bodyText = post.body
      .map(block => block.children?.map(c => c.text).join('') || '')
      .join('\n\n');

    const markdown = `---
title: "${post.title}"
slug: "${slug}"
date: "${post.publishedAt || new Date().toISOString()}"
category: "${category}"
---

${bodyText}
`;

    await fs.writeFile(filename, markdown, 'utf8');
    console.log(`✅ ${category}/${slug}.md créé`);
  }

  console.log('📦 Tous les articles Sanity ont été exportés vers Hugo !');
}

fetchAndWritePosts().catch(err => console.error(err));

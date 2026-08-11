#!/usr/bin/env node

/**
 * Dev.to Post Publisher
 *
 * Usage: node scripts/publish-to-devto.js <post-slug>
 *
 * This script publishes a blog post to Dev.to via their API.
 *
 * Required environment variables:
 * - DEVTO_API_KEY: Your Dev.to API key (get from https://dev.to/settings/extensions)
 */

import { readFileSync } from 'fs';
import { join } from 'path';

async function publishToDevTo(postSlug) {
  const apiKey = process.env.DEVTO_API_KEY;

  if (!apiKey) {
    console.error('Missing required environment variable: DEVTO_API_KEY');
    console.error('Get your API key from: https://dev.to/settings/extensions');
    process.exit(1);
  }

  // Read blog post
  const postPath = join(process.cwd(), 'src/content/blog', `${postSlug}.md`);
  const postContent = readFileSync(postPath, 'utf-8');

  // Extract frontmatter and content
  const frontmatterMatch = postContent.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!frontmatterMatch) {
    console.error('Invalid post format');
    process.exit(1);
  }

  // Parse frontmatter manually (simple approach)
  const frontmatter = {};
  const frontmatterLines = frontmatterMatch[1].split('\n');
  frontmatterLines.forEach(line => {
    const [key, ...valueParts] = line.split(':');
    if (key && valueParts.length > 0) {
      const value = valueParts.join(':').trim().replace(/^["']|["']$/g, '');
      frontmatter[key.trim()] = value;
    }
  });

  const bodyMarkdown = frontmatterMatch[2].trim();

  const { title, description, tags = '' } = frontmatter;

  // Parse tags
  const tagList = tags
    .split(',')
    .map(t => t.trim().replace(/^["']|["']$/g, ''))
    .filter(Boolean)
    .slice(0, 4); // Dev.to allows max 4 tags

  // Create Dev.to article
  const article = {
    article: {
      title,
      published: false, // Save as draft first
      body_markdown: bodyMarkdown,
      tags: tagList,
      description,
      canonical_url: `https://martincartledge.io/posts/${postSlug}`,
    },
  };

  const response = await fetch('https://dev.to/api/articles', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'api-key': apiKey,
    },
    body: JSON.stringify(article),
  });

  if (!response.ok) {
    const error = await response.text();
    console.error('Failed to publish to Dev.to:', error);
    process.exit(1);
  }

  const result = await response.json();
  console.log('✅ Successfully created draft on Dev.to!');
  console.log('Article ID:', result.id);
  console.log('Edit URL:', `https://dev.to/dashboard/posts/${result.id}/edit`);
  console.log('');
  console.log('ℹ️  Article saved as DRAFT - review and publish manually');
}

const postSlug = process.argv[2];
if (!postSlug) {
  console.error('Usage: node scripts/publish-to-devto.js <post-slug>');
  process.exit(1);
}

publishToDevTo(postSlug).catch(console.error);

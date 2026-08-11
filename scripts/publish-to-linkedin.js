#!/usr/bin/env node

/**
 * LinkedIn Post Publisher
 *
 * Usage: node scripts/publish-to-linkedin.js <post-slug>
 *
 * This script publishes a blog post to LinkedIn via their API.
 *
 * Required environment variables:
 * - LINKEDIN_ACCESS_TOKEN: Your LinkedIn OAuth 2.0 access token
 * - LINKEDIN_PERSON_URN: Your LinkedIn person URN (urn:li:person:XXXXX)
 */

import { readFileSync } from 'fs';
import { join } from 'path';
import { parse } from 'yaml';

async function publishToLinkedIn(postSlug) {
  const accessToken = process.env.LINKEDIN_ACCESS_TOKEN;
  const personUrn = process.env.LINKEDIN_PERSON_URN;

  if (!accessToken || !personUrn) {
    console.error('Missing required environment variables:');
    console.error('- LINKEDIN_ACCESS_TOKEN');
    console.error('- LINKEDIN_PERSON_URN');
    process.exit(1);
  }

  // Read blog post
  const postPath = join(process.cwd(), 'src/content/blog', `${postSlug}.md`);
  const postContent = readFileSync(postPath, 'utf-8');

  // Extract frontmatter
  const frontmatterMatch = postContent.match(/^---\n([\s\S]*?)\n---/);
  if (!frontmatterMatch) {
    console.error('No frontmatter found in post');
    process.exit(1);
  }

  const frontmatter = parse(frontmatterMatch[1]);
  const { title, description, tags = [] } = frontmatter;

  const postUrl = `https://martincartledge.io/posts/${postSlug}`;

  // Create hashtags from tags
  const hashtags = tags.map(tag => `#${tag.replace(/\s+/g, '')}`).join(' ');

  // Compose post text
  const postText = `📝 New blog post: ${title}

${description}

${hashtags}

Read more: ${postUrl}`;

  // LinkedIn API v2 request
  const response = await fetch('https://api.linkedin.com/v2/ugcPosts', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
      'X-Restli-Protocol-Version': '2.0.0',
    },
    body: JSON.stringify({
      author: personUrn,
      lifecycleState: 'PUBLISHED',
      specificContent: {
        'com.linkedin.ugc.ShareContent': {
          shareCommentary: {
            text: postText,
          },
          shareMediaCategory: 'ARTICLE',
          media: [
            {
              status: 'READY',
              originalUrl: postUrl,
            },
          ],
        },
      },
      visibility: {
        'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC',
      },
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    console.error('Failed to publish to LinkedIn:', error);
    process.exit(1);
  }

  const result = await response.json();
  console.log('✅ Successfully published to LinkedIn!');
  console.log('Post ID:', result.id);
  console.log('Post URL:', postUrl);
}

const postSlug = process.argv[2];
if (!postSlug) {
  console.error('Usage: node scripts/publish-to-linkedin.js <post-slug>');
  process.exit(1);
}

publishToLinkedIn(postSlug).catch(console.error);

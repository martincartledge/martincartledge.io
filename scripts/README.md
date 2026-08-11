# Blog Automation Scripts

This directory contains scripts to automate publishing your blog posts to social media platforms.

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Get LinkedIn Credentials (One-time setup)

```bash
# Set your LinkedIn app credentials
export LINKEDIN_CLIENT_ID="your_client_id"
export LINKEDIN_CLIENT_SECRET="your_client_secret"

# Run the OAuth helper
npm run publish:setup
```

This will:
- Open your browser
- Walk you through LinkedIn authorization
- Display your access token and person URN
- Save them for future use

### 3. Publish a Post

After writing a new blog post in `src/content/blog/`, publish it:

```bash
npm run publish:linkedin your-post-slug

# Example:
npm run publish:linkedin my-new-blog-post
```

## Available Scripts

- **`npm run publish:setup`** - Get LinkedIn OAuth credentials (one-time)
- **`npm run publish:linkedin <slug>`** - Publish a specific post to LinkedIn

## Files

- **`get-linkedin-token.js`** - Interactive OAuth flow for getting LinkedIn credentials
- **`publish-to-linkedin.js`** - Publish a blog post to LinkedIn

## Environment Variables

Create a `.env` file (don't commit this!):

```bash
LINKEDIN_ACCESS_TOKEN=your_access_token_here
LINKEDIN_PERSON_URN=urn:li:person:your_id_here
```

## Automated Publishing

See `AUTOMATION_SETUP.md` in the project root for:
- GitHub Actions setup (fully automated)
- Zapier/Make.com setup (easiest, no-code)
- Additional platform integrations

## Troubleshooting

### Token Expired

LinkedIn tokens expire after 60 days. Re-run:

```bash
npm run publish:setup
```

### Post Not Publishing

Check:
1. Your credentials are correct in `.env`
2. Your LinkedIn app has "Share on LinkedIn" permission
3. The post slug matches the filename in `src/content/blog/`

### Module Not Found

Make sure you've installed dependencies:

```bash
npm install
```

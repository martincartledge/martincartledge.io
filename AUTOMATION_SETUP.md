# Blog Post Automation Setup Guide

This guide explains how to automatically publish your markdown blog posts to LinkedIn and other platforms when you push to GitHub.

## Overview

You have **three options** for automation:

1. **GitHub Actions (Recommended for developers)** - Fully automated, runs on every push
2. **Zapier/Make.com (Easiest, no-code)** - RSS-based automation
3. **Manual Script (On-demand)** - Run when you want to publish

---

## Option 1: GitHub Actions (Fully Automated)

### What it does:
- Detects when you add/update a markdown file in `src/content/blog/`
- Extracts post metadata (title, description, URL)
- Publishes to LinkedIn automatically
- Can extend to Twitter, Slack, webhooks, etc.

### Setup Steps:

#### 1. Get LinkedIn Access Token

LinkedIn requires OAuth 2.0 authentication. Here's how to set it up:

**a) Create a LinkedIn App:**
1. Go to https://www.linkedin.com/developers/apps
2. Click "Create app"
3. Fill in required details:
   - App name: "Blog Publisher"
   - LinkedIn Page: (select your personal page or create one)
   - Accept terms and create

**b) Configure App Permissions:**
1. In your app, go to "Products" tab
2. Request access to "Share on LinkedIn" and "Sign In with LinkedIn using OpenID Connect"
3. Wait for approval (usually instant for personal use)

**c) Get OAuth Credentials:**
1. Go to "Auth" tab
2. Copy your Client ID and Client Secret
3. Add redirect URL: `http://localhost:8080/callback`

**d) Generate Access Token:**

```bash
# Install dependencies
npm install -g simple-oauth2

# Run this script (replace CLIENT_ID and CLIENT_SECRET)
node scripts/get-linkedin-token.js
```

Or use this manual flow:
1. Visit this URL (replace YOUR_CLIENT_ID):
```
https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=YOUR_CLIENT_ID&redirect_uri=http://localhost:8080/callback&scope=w_member_social%20r_liteprofile
```

2. Authorize the app
3. Copy the `code` from the redirect URL
4. Exchange code for token:

```bash
curl -X POST https://www.linkedin.com/oauth/v2/accessToken \
  -d 'grant_type=authorization_code' \
  -d 'code=YOUR_CODE' \
  -d 'client_id=YOUR_CLIENT_ID' \
  -d 'client_secret=YOUR_CLIENT_SECRET' \
  -d 'redirect_uri=http://localhost:8080/callback'
```

**e) Get Your Person URN:**

```bash
curl -X GET https://api.linkedin.com/v2/me \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

Look for the `id` field. Your Person URN will be: `urn:li:person:{id}`

#### 2. Add GitHub Secrets

1. Go to your GitHub repo → Settings → Secrets and variables → Actions
2. Add these secrets:
   - `LINKEDIN_ACCESS_TOKEN`: Your OAuth access token
   - `LINKEDIN_PERSON_URN`: `urn:li:person:YOUR_ID`

#### 3. Enable GitHub Actions

The workflow is already created at `.github/workflows/publish-to-platforms.yml`

Just push your changes:
```bash
git add .github/
git commit -m "Add automated publishing workflow"
git push
```

#### 4. Test It

Create a new blog post:
```bash
# Create new post
cat > src/content/blog/test-automation.md << 'EOF'
---
title: "Testing Automation"
description: "This post will auto-publish to LinkedIn!"
pubDatetime: 2026-08-06T10:00:00Z
tags:
  - automation
  - testing
---

# Testing Automation

This is a test post to verify the automation works!
EOF

# Commit and push
git add src/content/blog/test-automation.md
git commit -m "Test automated publishing"
git push
```

Check your LinkedIn profile - the post should appear automatically!

---

## Option 2: Zapier/Make.com (No-Code, Easiest)

### What it does:
- Monitors your RSS feed for new posts
- Automatically posts to LinkedIn when it detects a new item

### Setup Steps:

#### Using Zapier (Paid, $20/month):

1. Go to https://zapier.com/
2. Create a new Zap
3. **Trigger:** RSS by Zapier → "New Item in Feed"
   - Feed URL: `https://martincartledge.io/rss.xml`
   - Check every 15 minutes
4. **Action:** LinkedIn → "Create Share Update"
   - Connect your LinkedIn account
   - Post text: 
     ```
     📝 New blog post: {{title}}
     
     {{description}}
     
     Read more: {{link}}
     ```
5. Test and turn on your Zap

#### Using Make.com (More affordable, ~$9/month):

1. Go to https://www.make.com/
2. Create new scenario
3. Add **RSS → Watch RSS feed items**
   - URL: `https://martincartledge.io/rss.xml`
4. Add **LinkedIn → Create a Share**
   - Connect LinkedIn
   - Text: Use RSS module fields (title, description, link)
5. Activate scenario

#### Using n8n (Free, Self-hosted):

If you want free automation, use n8n:

1. Deploy n8n (Heroku, Railway, or self-host)
2. Create workflow:
   - **RSS Feed Read** → `https://martincartledge.io/rss.xml`
   - **LinkedIn** → Create post
3. Set to run every 15 minutes

---

## Option 3: Manual Script (On-Demand)

Use the provided script when you want to publish manually:

### Setup:

```bash
# Add to your .env file (don't commit this!)
echo "LINKEDIN_ACCESS_TOKEN=your_token_here" >> .env
echo "LINKEDIN_PERSON_URN=urn:li:person:your_id" >> .env
```

### Usage:

```bash
# After creating a new post, run:
node scripts/publish-to-linkedin.js your-post-slug

# Example:
node scripts/publish-to-linkedin.js testing-automation
```

---

## Additional Platforms

### Twitter/X

**Using GitHub Actions:**
1. Get Twitter API credentials from https://developer.twitter.com/
2. Add secrets: `TWITTER_API_KEY`, `TWITTER_API_SECRET`, `TWITTER_ACCESS_TOKEN`, `TWITTER_ACCESS_SECRET`
3. Set `ENABLE_TWITTER=true` in GitHub repository variables

**Using Zapier/Make.com:**
Just add a Twitter action after the RSS trigger

### Dev.to

Dev.to has an RSS import feature:
1. Go to https://dev.to/settings/publishing-from-rss
2. Add your RSS feed: `https://martincartledge.io/rss.xml`
3. Posts will auto-import (you can edit before publishing)

### Hashnode

Similar to Dev.to:
1. Go to your blog settings → Import
2. Add RSS feed: `https://martincartledge.io/rss.xml`

### Medium

Medium requires their API:
1. Get API token from https://medium.com/me/settings/security
2. Use their API to publish: https://github.com/Medium/medium-api-docs

---

## Workflow Summary

### Your Publishing Process (with automation):

1. **Write in markdown:**
   ```bash
   vim src/content/blog/my-new-post.md
   ```

2. **Add frontmatter:**
   ```yaml
   ---
   title: "My New Post"
   description: "A brief description"
   pubDatetime: 2026-08-06T10:00:00Z
   tags:
     - javascript
     - webdev
   ---
   ```

3. **Commit and push:**
   ```bash
   git add .
   git commit -m "New post: My New Post"
   git push
   ```

4. **Automation handles the rest:**
   - ✅ Post appears on your website
   - ✅ RSS feed updates
   - ✅ LinkedIn post created
   - ✅ Twitter post created (if enabled)
   - ✅ Dev.to imports (if enabled)

---

## Troubleshooting

### LinkedIn token expired
LinkedIn access tokens expire after 60 days. You'll need to:
1. Re-run the OAuth flow
2. Update your GitHub secret

Or use a refresh token flow (requires more complex setup).

### Posts not publishing
1. Check GitHub Actions logs: Repo → Actions tab
2. Verify secrets are set correctly
3. Check LinkedIn API rate limits

### RSS not updating
1. Clear your RSS cache
2. Verify the feed works: https://martincartledge.io/rss.xml
3. Check Zapier/Make.com logs

---

## Recommended Approach

**For you, I recommend:**

1. **Start with Zapier/Make.com** (easiest, works immediately)
   - No code required
   - Works with your existing RSS feed
   - Can add multiple platforms easily
   - Cost: ~$9-20/month

2. **Upgrade to GitHub Actions later** (if you want more control)
   - Free
   - More customization
   - Requires more setup time

Your RSS feed is already live at: https://martincartledge.io/rss.xml

You can test it with any RSS reader right now!

---

## Questions?

Feel free to ask if you need help with:
- Getting LinkedIn API credentials
- Setting up Zapier/Make.com
- Customizing the GitHub Action
- Adding more platforms

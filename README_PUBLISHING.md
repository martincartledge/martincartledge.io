# 📝 Blog Publishing System - Quick Reference

Your complete guide to writing and publishing blog posts from your website.

---

## 🚀 Quick Start (Choose One)

### Option A: Simple Editor (2 minutes)
```bash
yarn add marked
yarn dev
# Visit: http://localhost:4321/editor
```

### Option B: Decap CMS (5 minutes)
1. Edit `public/admin/config.yml` - add your GitHub repo
2. Enable OAuth on Netlify/Vercel
3. Visit: `https://martincartledge.io/admin/`

### Option C: Keep Using VS Code
```bash
# Create file in src/content/blog/
# Commit and push
# (What you're doing now)
```

---

## 📦 Installation Commands

```bash
# For simple editor (markdown preview)
yarn add marked

# For publishing automation
yarn add open yaml

# For Tina CMS (best experience)
yarn add tinacms @tinacms/cli

# Install everything:
yarn add marked open yaml
```

---

## 🎯 Available Scripts

```bash
# Development
yarn dev                      # Start dev server
yarn start                    # Alias for dev

# Building  
yarn build                    # Build for production
yarn preview                  # Preview build

# Publishing
yarn publish:setup            # Get LinkedIn credentials
yarn publish:linkedin <slug>  # Publish to LinkedIn

# Code Quality
yarn format                   # Format with Prettier
yarn lint                     # Run ESLint
```

---

## 📍 Editor URLs

| Editor | Development | Production |
|--------|-------------|------------|
| **Simple Editor** | `http://localhost:4321/editor` | `https://martincartledge.io/editor` |
| **Decap CMS** | N/A (production only) | `https://martincartledge.io/admin/` |
| **Tina CMS** | `http://localhost:4321/admin/` | `https://martincartledge.io/admin/` |

---

## ✍️ Writing Workflow

### Current (VS Code):
```
1. Create .md file
2. Write frontmatter manually
3. Write content
4. Commit & push
5. Wait for deploy
6. Share on social (manually)
```

### With Simple Editor:
```
1. Visit /editor
2. Fill in form
3. Write with live preview
4. Copy markdown
5. Create file & commit
6. Auto-deploys
```

### With Decap CMS:
```
1. Visit /admin/ (anywhere, even mobile)
2. Click "New Post"
3. Write in rich editor
4. Click "Publish"
5. Auto-commits & auto-deploys ✨
```

### With Full Automation:
```
1. Visit /admin/
2. Write & publish
3. Auto-commits
4. Auto-deploys
5. Auto-posts to LinkedIn
6. Auto-posts to Twitter (optional)
7. Everything else automatic! 🚀
```

---

## 🤖 Automation Options

### Option 1: Make.com/Zapier (Easiest)
- **Cost:** $9/month
- **Setup:** 10 minutes
- **Method:** RSS-based
- **Delay:** ~15 minutes

```
RSS Feed → Make.com → LinkedIn/Twitter/etc.
```

### Option 2: GitHub Actions (Free)
- **Cost:** Free
- **Setup:** 15 minutes
- **Method:** Git-based
- **Delay:** Instant

```
Git Push → GitHub Actions → LinkedIn/Twitter/etc.
```

### Option 3: Manual Scripts
- **Cost:** Free
- **Setup:** 5 minutes
- **Method:** On-demand

```bash
yarn publish:linkedin my-post-slug
```

---

## 📋 Frontmatter Template

```yaml
---
title: "Your Post Title"
description: "Brief description for SEO"
author: "Martin Cartledge"
pubDatetime: 2026-08-06T10:00:00Z
featured: false
draft: false
tags:
  - javascript
  - webdev
  - tutorial
---

# Your content starts here
```

---

## 🔧 Configuration Files

| File | Purpose |
|------|---------|
| `public/admin/config.yml` | Decap CMS configuration |
| `public/admin/index.html` | Decap CMS admin interface |
| `src/pages/editor.astro` | Simple built-in editor |
| `.github/workflows/publish-to-platforms.yml` | GitHub Actions automation |
| `scripts/publish-to-linkedin.js` | LinkedIn publishing script |
| `scripts/get-linkedin-token.js` | OAuth helper |

---

## 🌐 External Services Setup

### Make.com (Recommended)
1. Sign up: https://www.make.com/
2. Create scenario: RSS → LinkedIn
3. RSS URL: `https://martincartledge.io/rss.xml`
4. Connect LinkedIn
5. Activate

### GitHub Actions
1. Run: `yarn publish:setup`
2. Copy access token & person URN
3. Add to GitHub Secrets:
   - `LINKEDIN_ACCESS_TOKEN`
   - `LINKEDIN_PERSON_URN`
4. Push workflow file

### Netlify OAuth
1. Dashboard → Settings → Access control
2. OAuth → Install provider → GitHub
3. Done!

### Vercel OAuth
1. Deploy: https://github.com/vencax/netlify-cms-github-oauth-provider
2. Add env vars (Client ID & Secret)
3. Update `config.yml` with gateway URL

---

## 📊 Feature Comparison

| Feature | VS Code | Simple Editor | Decap CMS | Tina CMS |
|---------|---------|---------------|-----------|----------|
| **Setup Time** | 0 min | 2 min | 5 min | 15 min |
| **Live Preview** | ❌ | ✅ | ❌ | ✅ |
| **Auto-commit** | ❌ | ❌ | ✅ | ✅ |
| **Rich Editor** | ❌ | ❌ | ✅ | ✅ |
| **Image Upload** | Manual | Manual | ✅ | ✅ |
| **Mobile** | ❌ | Partial | ✅ | ✅ |
| **Offline** | ✅ | ✅ | ❌ | Partial |
| **Multi-user** | ✅ | ❌ | ✅ | ✅ |

---

## 🎯 Recommended Setup

### For Immediate Use:
```bash
yarn add marked
yarn dev
# Visit http://localhost:4321/editor
```

### For Best Experience:
1. Update `public/admin/config.yml`
2. Enable OAuth (Netlify/Vercel)
3. Visit `/admin/`

### For Full Automation:
1. Setup Decap CMS (above)
2. Sign up for Make.com
3. Connect RSS → LinkedIn
4. Done!

---

## 📚 Documentation Index

- **This file:** Quick reference & commands
- **`YARN_SETUP.md`:** Detailed yarn-specific setup
- **`EDITOR_OPTIONS.md`:** Editor comparison & features
- **`CMS_SETUP.md`:** Decap/Tina detailed setup
- **`AUTOMATION_SETUP.md`:** Publishing automation
- **`QUICK_START.md`:** 10-minute quick start
- **`WORKFLOW_DIAGRAM.md`:** Visual diagrams

---

## 🆘 Common Issues

### Module not found: marked
```bash
yarn add marked
```

### OAuth not working
- Check config.yml repo name
- Verify OAuth enabled
- Clear browser cache

### Editor not loading
```bash
yarn dev
# Check http://localhost:4321/editor
```

### Publishing script errors
```bash
yarn add open yaml
yarn publish:setup
```

---

## 🎬 Next Action

Pick one and get started:

**Easiest:**
```bash
yarn add marked && yarn dev
```

**Best UX:**
```bash
# Edit public/admin/config.yml
# Enable OAuth
# Visit /admin/
```

**Full Power:**
```bash
yarn add marked open yaml
# Setup Decap + Make.com
# Never manually post again!
```

---

## ✅ Status Checklist

- [ ] Install dependencies (`yarn add marked open yaml`)
- [ ] Choose editor (Simple/Decap/Tina)
- [ ] Test writing a post
- [ ] Optional: Setup automation
- [ ] Optional: Add more platforms
- [ ] Start publishing! 🚀

---

**Need help?** Check the detailed guides in the other markdown files!

**Ready to go?** 
```bash
yarn add marked
yarn dev
```

Visit `http://localhost:4321/editor` and start writing! ✍️

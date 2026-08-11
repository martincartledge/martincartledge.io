# 🚀 Setup Guide (Using Yarn)

Quick setup guide for all blog editor and automation features using **Yarn**.

---

## 📦 Install Required Dependencies

```bash
# For the simple built-in editor (markdown preview)
yarn add marked

# For LinkedIn/Dev.to publishing scripts
yarn add open yaml

# All at once:
yarn add marked open yaml
```

---

## 🎯 Option 1: Simple Built-in Editor

### Step 1: Install Dependencies
```bash
yarn add marked
```

### Step 2: Start Dev Server
```bash
yarn dev
```

### Step 3: Visit Editor
```
http://localhost:4321/editor
```

### Step 4: Write and Publish
1. Fill in title, description, tags
2. Write content (see live preview)
3. Click "Copy to Clipboard"
4. Create new file: `src/content/blog/your-post.md`
5. Paste markdown
6. Commit and push!

---

## 🎯 Option 2: Decap CMS (Web-based)

### Step 1: Update Config
Edit `public/admin/config.yml` and set your GitHub repo:
```yaml
backend:
  name: github
  repo: YOUR_USERNAME/martincartledge.io
  branch: main
```

### Step 2: Enable OAuth

**On Netlify:**
1. Dashboard → Settings → Access control → OAuth
2. Install GitHub provider
3. Done!

**On Vercel:**
1. Deploy OAuth gateway: https://github.com/vencax/netlify-cms-github-oauth-provider
2. Update config.yml with your gateway URL

### Step 3: Visit Admin
```
https://martincartledge.io/admin/
```

Login with GitHub and start writing!

---

## 🎯 Option 3: Tina CMS (Best Experience)

### Step 1: Install Tina
```bash
yarn add tinacms @tinacms/cli
```

### Step 2: Initialize
```bash
yarn tinacms init
```

Follow the prompts:
- Framework: **Astro**
- Collection name: **blog**
- Collection path: **src/content/blog**

### Step 3: Update Scripts

The scripts are already in `package.json`:
```json
{
  "scripts": {
    "dev": "astro check --watch & astro dev",
    "tina:dev": "tinacms dev -c \"astro dev\"",
    "tina:build": "tinacms build && astro build"
  }
}
```

### Step 4: Start with Tina
```bash
yarn tina:dev
```

Visit: `http://localhost:4321/admin/`

---

## 📝 Publishing Scripts

### LinkedIn Publishing

#### Setup:
```bash
# Get LinkedIn credentials
yarn publish:setup
```

Follow the browser prompts to authorize.

#### Publish a Post:
```bash
yarn publish:linkedin your-post-slug
```

Example:
```bash
yarn publish:linkedin my-awesome-post
```

### Dev.to Publishing

```bash
yarn run node scripts/publish-to-devto.js your-post-slug
```

---

## 🤖 Automated Publishing (Make.com/Zapier)

No installation needed! Works with your RSS feed:

### Setup:
1. Sign up: https://www.make.com/
2. Create scenario: RSS → LinkedIn
3. RSS URL: `https://martincartledge.io/rss.xml`
4. Connect LinkedIn account
5. Activate!

Details: See `QUICK_START.md`

---

## 🔧 GitHub Actions (Automated Publishing)

Already configured! Just add secrets:

### Add GitHub Secrets:
1. Go to: GitHub repo → Settings → Secrets → Actions
2. Add secrets:
   - `LINKEDIN_ACCESS_TOKEN` (get from `yarn publish:setup`)
   - `LINKEDIN_PERSON_URN` (get from `yarn publish:setup`)

### Enable:
```bash
git add .github/workflows/publish-to-platforms.yml
git commit -m "Enable automated publishing"
git push
```

Now every new post auto-publishes to LinkedIn!

---

## 🎬 Complete Workflow

### Current Workflow:
```bash
# 1. Write post
vim src/content/blog/my-post.md

# 2. Commit
git add .
git commit -m "New post: My Post"
git push

# 3. Manually share everywhere (15 min)
```

### With Simple Editor:
```bash
# 1. Start dev server
yarn dev

# 2. Visit editor
# http://localhost:4321/editor

# 3. Write post (browser)
# 4. Copy markdown
# 5. Paste to file
# 6. Commit and push
```

### With Decap CMS:
```bash
# 1. Visit admin (from anywhere, even phone)
# https://martincartledge.io/admin/

# 2. Click "New Post"
# 3. Write in browser
# 4. Click "Publish"
# 5. Done! Auto-commits and deploys
```

### With Full Automation:
```bash
# 1. Visit admin
# https://martincartledge.io/admin/

# 2. Write and publish
# 3. Relax - everything else automatic:
#    ✅ Commits to GitHub
#    ✅ Deploys to site
#    ✅ Updates RSS
#    ✅ Posts to LinkedIn
#    ✅ Posts to Twitter (optional)
#    ✅ Posts to Dev.to (optional)
```

---

## 📊 Package.json Scripts

All available scripts:

```bash
# Development
yarn dev                    # Start Astro dev server
yarn start                  # Alias for dev
yarn tina:dev              # Start with Tina CMS (after install)

# Building
yarn build                 # Build for production
yarn preview              # Preview production build
yarn tina:build           # Build with Tina CMS

# Publishing
yarn publish:setup        # Get LinkedIn OAuth credentials
yarn publish:linkedin     # Publish post to LinkedIn

# Code Quality
yarn format               # Format code with Prettier
yarn format:check        # Check code formatting
yarn lint                # Run ESLint
```

---

## 🆘 Troubleshooting

### "Module not found: marked"
```bash
yarn add marked
```

### "Permission denied"
Make sure you're in the project directory:
```bash
cd ~/Desktop/martincartledge.io
yarn add marked
```

### "OAuth error" (Decap CMS)
- Check `config.yml` has correct repo name
- Verify OAuth is enabled (Netlify/Vercel)
- Try clearing browser cache

### Tina not working
```bash
# Reinstall
yarn remove tinacms @tinacms/cli
yarn add tinacms @tinacms/cli
yarn tinacms init
```

---

## 🎯 Recommended Setup Path

### Quick Start (5 minutes):
```bash
# 1. Install editor dependencies
yarn add marked

# 2. Start dev server
yarn dev

# 3. Visit http://localhost:4321/editor
# 4. Start writing!
```

### Best Experience (15 minutes):
```bash
# 1. Update public/admin/config.yml (your repo name)
# 2. Enable OAuth (Netlify/Vercel)
# 3. Visit https://martincartledge.io/admin/
# 4. Login and write from anywhere!
```

### Full Automation (20 minutes):
```bash
# 1. Setup Decap CMS (above)
# 2. Sign up for Make.com
# 3. Connect RSS → LinkedIn
# 4. Install dependencies for scripts
yarn add open yaml

# 5. Get credentials
yarn publish:setup

# 6. Add to GitHub Secrets
# 7. Push workflow file
# 8. Done! Complete automation
```

---

## 📦 Dependencies Summary

### Currently in package.json:
- ✅ All Astro/React dependencies
- ✅ Tailwind, Fuse.js, etc.

### Need to add:
```bash
# For simple editor
yarn add marked

# For publishing scripts  
yarn add open yaml

# For Tina CMS (optional)
yarn add tinacms @tinacms/cli

# All at once:
yarn add marked open yaml tinacms @tinacms/cli
```

---

## 🚀 Next Steps

1. **Install dependencies:**
   ```bash
   yarn add marked open yaml
   ```

2. **Pick your editor:**
   - Simple: Visit `/editor`
   - Decap CMS: Visit `/admin/` (after OAuth setup)
   - Tina: Install and run `yarn tina:dev`

3. **Optional - Add automation:**
   - Make.com for social posting
   - GitHub Actions for instant publishing

4. **Start writing from your site!** ✍️

---

## 📚 More Info

- **Editor comparison:** `EDITOR_OPTIONS.md`
- **CMS setup details:** `CMS_SETUP.md`
- **Automation setup:** `AUTOMATION_SETUP.md`
- **Quick start guide:** `QUICK_START.md`

---

**Ready to install and start writing?**

```bash
yarn add marked open yaml
yarn dev
# Visit http://localhost:4321/editor
```

🎉 That's it! You're ready to write and publish from your site!

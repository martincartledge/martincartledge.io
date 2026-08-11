# Blog Post Editor Setup Guide

You now have **two options** for writing and publishing blog posts directly from your website!

## 🎯 Quick Comparison

| Feature | Decap CMS | Tina CMS |
|---------|-----------|----------|
| **Setup Time** | 5 minutes | 10 minutes |
| **Editor Style** | Traditional CMS | Visual, WYSIWYG |
| **Live Preview** | ❌ | ✅ Yes! |
| **GitHub Integration** | ✅ Built-in | ✅ Built-in |
| **Free Tier** | ✅ Unlimited | ✅ 2 users |
| **Recommended For** | Quick setup | Best experience |

---

## Option 1: Decap CMS (Ready Now!)

### ✅ Already Set Up!

I've already created the files. You just need to enable it.

### Setup Steps:

#### 1. Enable GitHub OAuth (Via Netlify)

**If you're on Netlify:**
1. Go to your Netlify dashboard
2. Site settings → Access control → OAuth
3. Click "Install provider"
4. Select GitHub
5. Done! ✅

**If you're on Vercel:**
You'll need to set up OAuth yourself (see "Vercel OAuth Setup" below)

#### 2. Access Your Editor

Once OAuth is set up, visit:
```
https://martincartledge.io/admin/
```

#### 3. Log In

- Click "Login with GitHub"
- Authorize the app
- You're in! 🎉

#### 4. Start Writing

1. Click "New Blog Posts"
2. Fill in the form:
   - Title
   - Description
   - Tags
   - Content (markdown editor)
3. Click "Publish"
4. Post commits to GitHub automatically!
5. Vercel/Netlify deploys automatically!

### Screenshots of What You'll See:

```
┌─────────────────────────────────────────┐
│  📝 Content Manager                     │
├─────────────────────────────────────────┤
│  Collections:                           │
│  → Blog Posts (15 entries)              │
│  → Pages                                │
│                                         │
│  [New Blog Posts]                       │
└─────────────────────────────────────────┘

Click "New Blog Posts":

┌─────────────────────────────────────────┐
│  New Entry                              │
├─────────────────────────────────────────┤
│  Title: [________________]              │
│  Description: [___________]             │
│  Tags: [tag1] [tag2] [+]                │
│  Featured: ☐                            │
│  Draft: ☐                               │
│                                         │
│  Body:                                  │
│  ┌─────────────────────────────────┐   │
│  │ # My New Post                   │   │
│  │                                 │   │
│  │ Write your content here...      │   │
│  └─────────────────────────────────┘   │
│                                         │
│  [Save]  [Publish]                      │
└─────────────────────────────────────────┘
```

---

## Option 2: Tina CMS (Better Experience)

Tina gives you a **visual editor** with live preview - you see exactly how your post will look as you write!

### Setup Steps:

#### 1. Install Tina

```bash
npm install tinacms @tinacms/cli
```

#### 2. Initialize Tina

```bash
npx @tinacms/cli init
```

This creates:
- `.tina/config.ts` - Tina configuration
- `tina/schema.ts` - Content schema

#### 3. Update package.json

I'll add these scripts for you:

```json
"scripts": {
  "dev": "tinacms dev -c \"astro dev\"",
  "tina:dev": "tinacms dev -c \"astro dev\"",
  "tina:build": "tinacms build && astro build"
}
```

#### 4. Access Your Editor

```bash
npm run dev
```

Then visit:
```
http://localhost:4321/admin/index.html
```

#### 5. Features You'll Get:

- ✅ **Live preview** as you type
- ✅ **Visual markdown editor**
- ✅ **Image uploads**
- ✅ **Drag & drop**
- ✅ **Auto-save**
- ✅ **Git-based** (commits to GitHub)

---

## Vercel OAuth Setup (If not using Netlify)

If you're deploying to Vercel, you need to set up OAuth manually:

### Option A: Use OAuth Gateway Service

1. **Sign up for https://github-oauth.vercel.app/**
2. Follow their setup guide
3. Update `config.yml`:
   ```yaml
   backend:
     name: github
     repo: martincartledge/martincartledge.io
     branch: main
     base_url: https://your-oauth-gateway.vercel.app
   ```

### Option B: Self-Host OAuth

1. Deploy this OAuth server: https://github.com/vencax/netlify-cms-github-oauth-provider
2. Add to your Vercel environment variables
3. Update config.yml with your URL

---

## Recommended Path for You

### Start with Decap (Easiest):

1. ✅ **Already set up** - Files are ready
2. ✅ **Works immediately** with Netlify
3. ✅ **5-minute setup**

### Upgrade to Tina Later (Optional):

1. Better editing experience
2. Live preview
3. Visual editor
4. Worth the extra setup time

---

## Your New Workflow

### Before (Manual):
```
1. Open VS Code
2. Create markdown file
3. Write frontmatter manually
4. Write content
5. Commit to GitHub
6. Wait for deploy
```

### After (With CMS):
```
1. Visit martincartledge.io/admin/
2. Click "New Post"
3. Fill in form (no frontmatter!)
4. Write in visual editor
5. Click "Publish"
6. Done! Auto-commits & deploys ✨
```

---

## Accessing Your Editor

### Decap CMS:
- **URL:** https://martincartledge.io/admin/
- **Login:** GitHub OAuth

### Tina CMS:
- **Development:** http://localhost:4321/admin/
- **Production:** https://martincartledge.io/admin/ (after setup)
- **Login:** GitHub OAuth

---

## Features You Get

### ✅ Write Posts in Browser
No need for VS Code - use the web interface

### ✅ Rich Text Editor
Markdown toolbar with buttons for formatting

### ✅ Image Uploads
Drag & drop images directly into posts

### ✅ Preview Mode
See how your post looks before publishing

### ✅ Git Integration
All changes commit to GitHub automatically

### ✅ Collaborative
Share editor access with co-authors

### ✅ Mobile Friendly
Write posts from your phone!

---

## Current Status

### ✅ Completed:
- Decap CMS config created
- Admin interface ready
- File structure set up

### 🟡 Needs Setup (5 minutes):
- Enable GitHub OAuth (Netlify)
  OR
- Set up OAuth gateway (Vercel)

### 📦 Files Created:
- `public/admin/config.yml` - CMS configuration
- `public/admin/index.html` - Admin interface

---

## Next Steps

### For Netlify Users:
1. Go to Netlify dashboard
2. Enable GitHub OAuth (2 clicks)
3. Visit `https://martincartledge.io/admin/`
4. Start writing! ✍️

### For Vercel Users:
1. Set up OAuth gateway (see above)
2. Visit `https://martincartledge.io/admin/`
3. Start writing! ✍️

### Want Tina Instead?
1. Run `npm install tinacms @tinacms/cli`
2. Run `npx @tinacms/cli init`
3. Follow the prompts
4. Enjoy visual editing! 🎨

---

## Troubleshooting

### "Authentication Error"
- OAuth not set up correctly
- Check Netlify/Vercel OAuth settings

### "Cannot read content"
- Check `config.yml` paths match your repo structure
- Verify GitHub repo name is correct

### "No collections found"
- Restart your dev server
- Clear browser cache

---

## Mobile Publishing

With Decap/Tina, you can now:
- ✅ Write posts from your phone
- ✅ Publish on the go
- ✅ Edit drafts anywhere
- ✅ Upload photos from mobile

Just visit `https://martincartledge.io/admin/` on your phone!

---

## Questions?

- **Decap CMS Docs:** https://decapcms.org/docs/
- **Tina CMS Docs:** https://tina.io/docs/
- **OAuth Setup Help:** See "Vercel OAuth Setup" above

---

**Ready to write your first post from your website?** 🚀

Just enable OAuth and visit `/admin/`!

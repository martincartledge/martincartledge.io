# ✍️ Write & Publish From Your Site - Complete Guide

You now have **3 options** for writing blog posts directly from your website!

## 📊 Quick Comparison

| Option | Setup Time | Deployment | Best For |
|--------|-----------|------------|----------|
| **1. Decap CMS** | 5 min | ✅ Ready | Quick start, GitHub users |
| **2. Simple Editor** | 0 min | ✅ Ready | Offline writing, no auth |
| **3. Tina CMS** | 15 min | Need install | Best UX, visual editing |

---

## ✅ Option 1: Decap CMS (Recommended - Ready Now!)

### What You Get:
- ✅ Full-featured CMS interface
- ✅ Rich text markdown editor
- ✅ Image uploads
- ✅ Auto-commits to GitHub
- ✅ Auto-deployment
- ✅ Mobile friendly
- ✅ Collaborative (multi-user)

### Files Already Created:
- ✅ `public/admin/config.yml` - Configuration
- ✅ `public/admin/index.html` - Admin interface

### 🚀 Quick Setup (5 minutes):

#### Step 1: Update GitHub Repo Name

Edit `public/admin/config.yml`:
```yaml
backend:
  name: github
  repo: YOUR_GITHUB_USERNAME/martincartledge.io  # ← Update this!
  branch: main
```

#### Step 2A: If you're on **Netlify**:

1. Go to Netlify Dashboard
2. Your site → Settings → Access control
3. Scroll to "OAuth" section
4. Click "Install provider"
5. Select "GitHub"
6. Done! ✅

#### Step 2B: If you're on **Vercel**:

Use a OAuth gateway service:

1. Go to https://decap-cms-oauth-provider.vercel.app/
2. Click "Deploy your own"
3. Deploy to Vercel
4. Add environment variables:
   - `OAUTH_GITHUB_CLIENT_ID`
   - `OAUTH_GITHUB_CLIENT_SECRET`
5. Update `config.yml`:
   ```yaml
   backend:
     name: github
     repo: YOUR_USERNAME/martincartledge.io
     branch: main
     base_url: https://your-oauth-app.vercel.app
     auth_endpoint: auth
   ```

#### Step 3: Access Your Editor

Visit: **https://martincartledge.io/admin/**

Login with GitHub, and start writing! 🎉

### Demo Workflow:

```
1. Visit martincartledge.io/admin/
2. Click "Login with GitHub" 
3. Click "New Blog Posts"
4. Fill in:
   - Title: "My New Post"
   - Description: "A great post"
   - Tags: javascript, webdev
   - Content: [Write in markdown editor]
5. Click "Publish"
6. Auto-commits to GitHub ✅
7. Auto-deploys to your site ✅
8. Done! 🚀
```

---

## ✅ Option 2: Simple Built-in Editor (Available Now!)

### What You Get:
- ✅ Clean, minimal interface
- ✅ Live markdown preview
- ✅ No authentication needed (add your own)
- ✅ Generates proper frontmatter
- ✅ Copy-to-clipboard
- ✅ Works offline

### Files Already Created:
- ✅ `src/pages/editor.astro` - Editor page

### 🚀 How to Use:

#### Step 1: Install Dependencies

```bash
npm install marked
```

#### Step 2: Visit the Editor

Development:
```
http://localhost:4321/editor
```

Production (after deploying):
```
https://martincartledge.io/editor
```

#### Step 3: Write Your Post

1. Fill in title, description, tags
2. Write content in markdown
3. See live preview on the right
4. Click "Copy to Clipboard"
5. Create file: `src/content/blog/your-slug.md`
6. Paste the markdown
7. Commit and push!

### Demo Workflow:

```
1. Visit /editor
2. Write your post
3. See preview in real-time
4. Click "Copy to Clipboard"
5. Create new file in VS Code
6. Paste and commit
7. Push to GitHub
8. Auto-deploys ✅
```

### 🔒 Add Authentication (Optional):

To protect your editor, add auth:

```astro
---
// In editor.astro, add at the top:
const authToken = Astro.cookies.get("auth_token")?.value;
if (!authToken || authToken !== import.meta.env.EDITOR_PASSWORD) {
  return Astro.redirect("/login");
}
---
```

---

## ⭐ Option 3: Tina CMS (Best Experience)

### What You Get:
- ✅ Visual editor with live preview
- ✅ WYSIWYG experience
- ✅ Inline editing
- ✅ Media management
- ✅ Auto-save
- ✅ Block-based editing

### Setup Steps:

#### 1. Install Tina

```bash
npm install tinacms @tinacms/cli
```

#### 2. Initialize Tina

```bash
npx @tinacms/cli init
```

Follow the prompts:
- Framework: Astro
- Collection name: blog
- Collection path: src/content/blog

#### 3. Update Package Scripts

Add to `package.json`:
```json
{
  "scripts": {
    "dev": "tinacms dev -c \"astro dev\"",
    "build": "tinacms build && astro build"
  }
}
```

#### 4. Configure Schema

Edit `.tina/config.ts`:

```typescript
import { defineConfig } from "tinacms";

export default defineConfig({
  branch: "main",
  clientId: process.env.TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "assets/images",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      {
        name: "blog",
        label: "Blog Posts",
        path: "src/content/blog",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "description",
            label: "Description",
            required: true,
          },
          {
            type: "datetime",
            name: "pubDatetime",
            label: "Publish Date",
            required: true,
          },
          {
            type: "boolean",
            name: "featured",
            label: "Featured",
          },
          {
            type: "boolean",
            name: "draft",
            label: "Draft",
          },
          {
            type: "string",
            name: "tags",
            label: "Tags",
            list: true,
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
      },
    ],
  },
});
```

#### 5. Sign Up for Tina Cloud

1. Go to https://app.tina.io/
2. Sign up (free for 2 users)
3. Create a project
4. Get your Client ID and Token
5. Add to `.env`:
   ```
   TINA_CLIENT_ID=your_client_id
   TINA_TOKEN=your_token
   ```

#### 6. Run the Editor

```bash
npm run dev
```

Visit: **http://localhost:4321/admin/**

---

## 📱 Mobile Publishing

All three options work on mobile!

### Decap CMS:
- Visit `martincartledge.io/admin/` on phone
- Full mobile interface
- Write and publish from anywhere

### Simple Editor:
- Visit `martincartledge.io/editor` on phone
- Basic mobile support
- Copy markdown to notes app

### Tina CMS:
- Visit `martincartledge.io/admin/` on phone
- Optimized mobile interface
- Touch-friendly controls

---

## 🎯 Which Should You Choose?

### Choose **Decap CMS** if:
- ✅ You want it working NOW
- ✅ You're on Netlify (easiest setup)
- ✅ You want a traditional CMS feel
- ✅ You need multi-user support

### Choose **Simple Editor** if:
- ✅ You want no dependencies
- ✅ You don't need authentication yet
- ✅ You want full control
- ✅ You prefer manual commits

### Choose **Tina CMS** if:
- ✅ You want the best editing experience
- ✅ You have 15 minutes for setup
- ✅ You want visual editing
- ✅ You want live preview

---

## 🚀 Quick Start (Recommended Path)

### For Netlify Users:
1. ✅ Use Decap CMS (already set up!)
2. Enable OAuth in Netlify (2 clicks)
3. Visit `/admin/` and start writing

### For Vercel Users:
1. ✅ Use Simple Editor (no auth needed)
2. Visit `/editor` and start writing
3. Copy/paste markdown to files
4. (Later: Set up Decap OAuth for auto-commits)

### For Best Experience:
1. Install Tina CMS
2. 15-minute setup
3. Enjoy visual editing

---

## 📦 What's Already Done

### ✅ Completed:
- Decap CMS config created
- Simple editor page created
- Both ready to use after minimal setup

### 🔧 Needs Setup:
- OAuth for Decap (5 min)
- OR marked package for Simple Editor
- OR Tina installation (15 min)

---

## 🎬 Complete Workflow Example

### Using Decap CMS:

```
Morning:
☕ Grab coffee
🌐 Open martincartledge.io/admin/
📝 Write post in browser
📸 Upload images with drag-drop
👀 Preview post
🚀 Click "Publish"
✅ Auto-commits to GitHub
✅ Auto-deploys to site
✅ RSS updates automatically
✅ LinkedIn auto-posts (if setup)

Total time: Just the writing! Everything else is automated.
```

---

## 🆘 Troubleshooting

### Decap CMS Login Issues:
- Check OAuth is set up correctly
- Verify GitHub repo name in config.yml
- Clear browser cache

### Simple Editor Not Working:
- Make sure `marked` is installed
- Check browser console for errors
- Verify you're on the dev server

### Tina CMS Issues:
- Check Tina Cloud credentials
- Verify `.env` variables
- Restart dev server

---

## 📚 Additional Resources

- **Decap Docs:** https://decapcms.org/docs/
- **Tina Docs:** https://tina.io/docs/
- **Marked.js:** https://marked.js.org/

---

## Current Status

### ✅ Ready to Use:
1. **Decap CMS** - Just needs OAuth setup
2. **Simple Editor** - Just needs `marked` package

### 🟡 Optional Enhancement:
3. **Tina CMS** - Best experience, requires full setup

### 📝 Next Action:
Pick your option and follow the setup steps above!

---

**Want to write your next post from your website?** 

Choose an option and start writing! ✍️

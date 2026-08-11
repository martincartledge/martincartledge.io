# 🚀 Quick Start: Automated Blog Publishing

Get your blog posts automatically published to LinkedIn (and other platforms) in 3 easy steps.

## What You're Setting Up

Write markdown → Push to GitHub → Auto-publish to LinkedIn/Twitter/etc.

---

## 🎯 Recommended: Start with Make.com (10 minutes)

This is the **easiest and fastest** way to get automated publishing working.

### Why Make.com?

- ✅ No code required
- ✅ Works with your existing RSS feed
- ✅ 10-minute setup
- ✅ Add multiple platforms easily
- ✅ Reliable with retries
- ✅ $9/month (free tier available)

### Step-by-Step Setup:

1. **Sign up for Make.com**
   - Go to https://www.make.com/
   - Sign up (free account available)

2. **Create Your First Scenario**
   - Click "Create a new scenario"
   - Add a trigger: Search for "RSS" → Select "RSS" → Choose "Watch RSS feed items"
   - Paste your RSS URL: `https://martincartledge.io/rss.xml`
   - Set interval: Every 15 minutes

3. **Add LinkedIn Integration**
   - Click the + button after RSS
   - Search for "LinkedIn"
   - Choose "Create a Share"
   - Click "Add" to connect your LinkedIn account
   - Authorize Make.com

4. **Configure the Post**
   In the LinkedIn module, set:
   ```
   Text:
   📝 New blog post: {{1.title}}
   
   {{1.description}}
   
   Read more: {{1.url}}
   ```
   
   Link: `{{1.url}}`

5. **Test & Activate**
   - Click "Run once" to test
   - If successful, click "Scheduling" and turn it ON
   - Done! 🎉

### Your First Automated Post:

1. Write a new blog post in `src/content/blog/test-automation.md`
2. Push to GitHub
3. Wait 15-20 minutes
4. Check LinkedIn - your post should be there!

---

## 🔧 Alternative: GitHub Actions (For Developers)

Want instant publishing and more control? Use GitHub Actions instead.

### Setup:

1. **Get LinkedIn credentials:**
   ```bash
   npm install
   npm run publish:setup
   ```
   Follow the prompts to get your access token and person URN.

2. **Add GitHub Secrets:**
   - Go to your repo → Settings → Secrets and variables → Actions
   - Add: `LINKEDIN_ACCESS_TOKEN`
   - Add: `LINKEDIN_PERSON_URN`

3. **Enable workflow:**
   ```bash
   git add .github/workflows/publish-to-platforms.yml
   git commit -m "Add automated publishing"
   git push
   ```

4. **Test:**
   Create a new post and push. It will auto-publish immediately!

---

## 📝 Manual Publishing (Backup Option)

If you want to manually publish specific posts:

```bash
# Setup credentials first
npm run publish:setup

# Then publish any post
npm run publish:linkedin your-post-slug
```

---

## 📚 Adding More Platforms

### Dev.to (Auto-import)

1. Go to https://dev.to/settings/publishing-from-rss
2. Add your RSS: `https://martincartledge.io/rss.xml`
3. Done! Posts auto-import

### Twitter (via Make.com)

1. In your Make.com scenario, add another action
2. Search for "Twitter"
3. Choose "Create a Tweet"
4. Connect your Twitter account
5. Configure tweet text using RSS data

### Hashnode (Auto-import)

1. Go to your Hashnode blog settings
2. Import → RSS Feed
3. Add: `https://martincartledge.io/rss.xml`

---

## 🎬 Your New Workflow

### Before (Manual):
1. Write post
2. Push to GitHub
3. Manually share on LinkedIn
4. Manually share on Twitter
5. Manually cross-post to Dev.to
6. Total time: ~15 minutes

### After (Automated):
1. Write post
2. Push to GitHub
3. ✨ Everything else happens automatically
4. Total time: 0 minutes

---

## 📊 What Gets Automated

| Platform | Method | Delay | Status |
|----------|--------|-------|--------|
| Your Website | Vercel CI/CD | Instant | ✅ Active |
| RSS Feed | Auto-generated | Instant | ✅ Active |
| LinkedIn | Make.com/Actions | ~15 min | 🟡 Setup Required |
| Twitter | Make.com/Actions | ~15 min | 🟡 Optional |
| Dev.to | RSS Import | ~1 hour | 🟡 Optional |
| Hashnode | RSS Import | ~1 hour | 🟡 Optional |

---

## 🆘 Need Help?

1. **For Make.com:** Check `AUTOMATION_SETUP.md` → Option 2
2. **For GitHub Actions:** Check `AUTOMATION_SETUP.md` → Option 1
3. **For manual scripts:** Check `scripts/README.md`
4. **For workflow details:** Check `WORKFLOW_DIAGRAM.md`

---

## ⚡ Pro Tips

1. **Test with a draft first** - Create a test post to verify everything works
2. **Check timing** - Make.com runs every 15 minutes, plan accordingly
3. **Customize messages** - Edit the post template to match your style
4. **Monitor initially** - Check the first few automated posts to ensure quality
5. **Add hashtags** - Include relevant tags in your post frontmatter

---

## 🎯 Next Steps

1. ✅ Pick your automation method (Make.com recommended)
2. ✅ Complete the 10-minute setup
3. ✅ Test with a sample post
4. ✅ Enjoy automated publishing! 🎉

---

**Current Status:**
- ✅ RSS Feed: Live at https://martincartledge.io/rss.xml
- ✅ Automation Scripts: Ready in `/scripts` folder
- ✅ GitHub Actions: Ready in `.github/workflows`
- 🟡 External Services: Awaiting your setup

**Setup Time Investment:**
- Make.com (recommended): ~10 minutes
- GitHub Actions: ~20 minutes
- Both: ~25 minutes

**Time Saved Per Post:** ~15 minutes
**Break-even:** After 2-3 posts 📈

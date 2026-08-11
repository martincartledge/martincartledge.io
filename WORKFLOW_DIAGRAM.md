# Blog Publishing Workflow

## Current Setup (Manual)

```
┌─────────────────┐
│  Write Markdown │
│  in src/content │
│     /blog/      │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   Git Commit    │
│   & Push to     │
│     GitHub      │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Vercel Auto-   │
│  Deploy (CI/CD) │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Live on        │
│  Website +      │
│  RSS Feed       │
└─────────────────┘
```

## Option 1: Automated with GitHub Actions

```
┌─────────────────┐
│  Write Markdown │
│  in src/content │
│     /blog/      │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   Git Commit    │
│   & Push to     │
│     GitHub      │
└────────┬────────┘
         │
         ▼
┌─────────────────────────────────────────┐
│     GitHub Actions Workflow Triggers    │
│  (Detects new/changed markdown files)   │
└───────────┬──────────────┬──────────────┘
            │              │
            │              ├──────────────────────┐
            ▼              ▼                      ▼
    ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
    │   Vercel     │  │   LinkedIn   │  │   Twitter    │
    │   Deploy     │  │   API Post   │  │   API Post   │
    └──────────────┘  └──────────────┘  └──────────────┘
            │              │                      │
            ▼              ▼                      ▼
    ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
    │   Website    │  │  LinkedIn    │  │   Twitter    │
    │   + RSS      │  │   Profile    │  │   Timeline   │
    └──────────────┘  └──────────────┘  └──────────────┘
```

## Option 2: Automated with Zapier/Make.com (Easiest)

```
┌─────────────────┐
│  Write Markdown │
│  in src/content │
│     /blog/      │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   Git Commit    │
│   & Push to     │
│     GitHub      │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Vercel Auto-   │
│  Deploy (CI/CD) │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Website Live   │
│  RSS Updated    │
└────────┬────────┘
         │
         │ (RSS feed polling every 15 min)
         │
         ▼
┌────────────────────────────────────┐
│      Zapier/Make.com/n8n          │
│  Monitors RSS for new entries     │
└──────────┬──────────┬──────────────┘
           │          │
           │          ├──────────────────────┐
           ▼          ▼                      ▼
   ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
   │   LinkedIn   │  │   Twitter    │  │   Dev.to     │
   │   Auto Post  │  │   Auto Post  │  │   Auto Post  │
   └──────────────┘  └──────────────┘  └──────────────┘
```

## Option 3: Manual Publishing Scripts

```
┌─────────────────┐
│  Write Markdown │
│  in src/content │
│     /blog/      │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   Git Commit    │
│   & Push        │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Website Deploys│
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   Run Script:   │
│ npm run publish │
│    :linkedin    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Post to        │
│  LinkedIn       │
└─────────────────┘
```

## Architecture Overview

```
┌────────────────────────────────────────────────────────────┐
│                     YOUR WORKFLOW                          │
└────────────────────────────────────────────────────────────┘

    ┌──────────────┐
    │   Local PC   │
    │  (VS Code)   │
    └──────┬───────┘
           │
           │ Write markdown
           │
           ▼
    ┌──────────────┐
    │   GitHub     │
    │  Repository  │
    └──────┬───────┘
           │
           │ Webhook/CI trigger
           │
           ▼
    ┌──────────────────────────────────────┐
    │         Automation Layer             │
    │  ┌────────────────────────────────┐  │
    │  │   GitHub Actions (Option 1)    │  │
    │  │        OR                      │  │
    │  │   Zapier/Make (Option 2)      │  │
    │  │        OR                      │  │
    │  │   Manual Script (Option 3)    │  │
    │  └────────────────────────────────┘  │
    └──────┬───────────────────────────────┘
           │
           │ Distribute via APIs
           │
           ▼
    ┌─────────────────────────────────────┐
    │        Distribution Channels        │
    │  ┌──────────┐  ┌──────────┐        │
    │  │ LinkedIn │  │ Twitter  │        │
    │  └──────────┘  └──────────┘        │
    │  ┌──────────┐  ┌──────────┐        │
    │  │  Dev.to  │  │ Hashnode │        │
    │  └──────────┘  └──────────┘        │
    │  ┌──────────┐  ┌──────────┐        │
    │  │  Medium  │  │  Custom  │        │
    │  └──────────┘  └──────────┘        │
    └─────────────────────────────────────┘
```

## Data Flow

```
Markdown File (src/content/blog/post.md)
    │
    │ Contains:
    │ - Frontmatter (title, description, tags, date)
    │ - Body content (markdown)
    │
    ▼
RSS Feed (martincartledge.io/rss.xml)
    │
    │ Provides:
    │ - Post title
    │ - Post description
    │ - Post URL
    │ - Publication date
    │
    ▼
Platform APIs
    │
    │ LinkedIn API: Creates share with link preview
    │ Twitter API: Creates tweet with link
    │ Dev.to API: Creates article (with canonical URL)
    │
    ▼
Published Across All Platforms
```

## Recommendation for You

**Start with Option 2 (Zapier/Make.com):**

✅ **Pros:**
- No code required
- Works immediately
- Easy to add/remove platforms
- Built-in error handling and retries
- Works with your existing RSS feed

❌ **Cons:**
- ~$9-20/month cost
- 15-minute delay (RSS polling interval)

**Why this is best for you:**
1. Your RSS feed is already set up
2. Takes 10 minutes to configure
3. Set it and forget it
4. Can add multiple platforms with clicks
5. No API credential management complexity

**Later, if you want more control:**
Migrate to GitHub Actions (free, instant, more customizable)

---

## Quick Setup (Recommended Path)

1. **Sign up for Make.com** ($9/month): https://www.make.com/
2. **Create scenario:**
   - Trigger: RSS → Watch RSS feed items
   - URL: `https://martincartledge.io/rss.xml`
   - Action: LinkedIn → Create a share
3. **Connect LinkedIn account** (one-click OAuth)
4. **Activate scenario**
5. **Done!** New posts auto-publish to LinkedIn

Total setup time: ~10 minutes

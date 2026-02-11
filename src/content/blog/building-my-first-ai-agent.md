---
author: Martin Cartledge
pubDatetime: 2026-02-11T20:00:00.169Z
title: Building My First AI Agent
ogImage: "https://i.imgur.com/LMkETwt.png"
tags:
  - artificial intelligence
  - go
featured: true
draft: false
description: My experience building a code-editing agent using the Anthropic API
---

![building-my-first-ai-agent-goldeneye](https://i.imgur.com/LMkETwt.png)

AI agents have never been more prominent in today's technology sector, and I think their momentum will not be slowing down anytime soon. They have become an integral piece in the workflow of technology knowledge workers across the globe, and they have done so in a matter of several months.

But how do these work? If you have used any of the leading agents today, you might have come to the conclusion that they share strengths and pitfalls alike.

I recently came across an article by [Thorsten Ball](https://ampcode.com/notes/how-to-build-an-agent), a long-time favorite writer of mine, that provides a roadmap for building your own AI agent.

I jumped at this tutorial for many reasons: I want to expand my knowledge of these tools, I don't get to use Go in my 9-5 but love the language mechanics, and I knew Thorsten is a source I can trust. He has a great way of explaining dense, archaic concepts simply.

I opened up the webpage and off I went. Here is my journey.

## Immediate Takeaway

By looking at the length of the post, I felt, **there has to be more to this, _right?_** Surely a coding agent was much more involved than what I was seeing. I soon discovered that was not the case.

In the following sections I will go over my experience at a high level - do not expect a micro view of this process, Thorsten does a great job of that! This post is mainly meant to serve as my overall experience and takeaways after building an agent.

## Building GoldenEye

### The bedrock

After creating project files and the backbone of any Go project, **main.go**, I used the Anthropic SDK to create an `Agent` type and a `NewAgent` function that accepts a few parameters: an Anthropic Client and a `getUserMessage` function. This new type and function are wired up in the **main.go** file.

Next, after adding my Anthropic API key, I created a `run` function that accepted a few parameters: `context` and a `conversation` array.

Once my key was wired up along with the `run` function, I was able to run Claude in my terminal—so cool! It greeted me with: `"Chat with Boris, slug head"` (a nod to the James Bond film _GoldenEye_, namely the N64 game, IYKYK).

![setting-up-the-llm](https://i.imgur.com/l4YUrlu.gif)

### Reading, viewing, and editing

Simply creating a wrapper application that can run a LLM locally is cool on its own, but to create a proper coding agent, this application needed to do a few standard things: reading files within a working directory, listing files within that directory, and possibly the most important, _editing_ files within a working directory.

This phase of the tutorial melted my brain a little bit, but after adding the respective types and executable functions, I found that these actions followed similar paths: they needed a strict schema to declare the precise input and output, they needed to marshal and unmarshal JSON (essentially packing and unpacking JSON in the application), and they needed to register their tool's namespace (read, write, list) in the main executable function in the go program.

#### Listing and reading

![listing-and-viewing-files](https://i.imgur.com/W1DYV9y.gif)

#### Editing

![editing-files](https://i.imgur.com/PTyyLpN.gif)

#### I am invincible!

With these three action pillars integrated, GoldenEye could perform similarly to the agent I use at work and at home!

I still feel like I need to process this piece a bit more. There is so much happening, but at the same time, little happening?

I give full credit to Thorsten due to this feeling. He showcases a simple path to getting an agent to work, showcases the patterns when integrating actions within an agent, and presents the final product in a no-nonsense manner.

## What I Learned

This experience reinforced something crucial: **context is KING**. The tool continually showed that being as clear as possible with actions—like `read_file({path: "main.go"})`—only galvanized the emphasis on providing context to increase the chances the agent acts the way you want it to.

More importantly, it demystified what agents actually are. The act of wiring up a model and running it against your code on a local machine is straightforward. What separates companies in this space isn't some secret sauce in the agent architecture—**it's the presentation and the model itself.**

It's how context is handled throughout an ecosystem. It's keeping input and output performance at the tip of high-end for the user.

Companies can shine if they provide a sleek, intuitive UI and a performative, relevant, and dense model pool for their consumers. The agent loop? That's almost a solved problem. The real differentiator is the experience and the intelligence of the underlying model.

## What's Next

Now that I understand how agents work at this level, I want to go deeper. The next layer of abstraction—**the models that power these agents**—is rich in mystery and vast in expansive knowledge. That's where I want to dive next.

Building GoldenEye showed me what's possible with relatively little code. Now I want to understand what makes the intelligence behind it tick.

## Resources

- [How to Build an Agent by Thorsten Ball](https://ampcode.com/notes/how-to-build-an-agent) - The tutorial that inspired this
- [Anthropic API Documentation](https://docs.anthropic.com/)
- [GoldenEye repository](https://github.com/martincartledge/goldeneye) - My implementation

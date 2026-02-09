---
author: Martin Cartledge
pubDatetime: 2026-01-20T10:00:00.169Z
title: Building My First AI Agent
ogImage: ""
tags:
  - artificial intelligence
  - go
featured: true
draft: true
description: My experience building a code-editing agent using the Anthropic API
---

![building-my-first-ai-agent-photo](YOUR_IMAGE_URL_HERE)

## Introduction

[Opening paragraph - set the scene. What prompted you to build an agent? What were your initial thoughts about how complex this would be?]

## What is an Agent?

[Brief explanation of what an agent is and how it differs from a simple LLM API call. The key insight from the tutorial: "an LLM, a loop, and enough tokens"]

## Discovering the Tutorial

[Talk about finding the ampcode tutorial. What drew you to it? Had you worked with Go before? Why did you want to try building an agent?]

## Getting Started

[Your experience setting up the project. Did you have Go installed? Getting your Anthropic API key? Any initial hurdles?]

### Building the Chat Loop

[Your experience implementing the basic conversation interface. What did you learn about how the Anthropic API works? How message history is maintained?]

```go
// Include a code snippet if relevant
```

### Implementing Tools

[Walk through your experience implementing the three tools:]

**read_file**
[What was involved? How does the JSON schema work?]

**list_files**
[Your experience with this tool]

**edit_file**
[The most complex one - what was this like to implement?]

[What was surprising about how tools work with the Anthropic API? The way Claude requests tool use and processes results?]

## Seeing It Work

[The first time you got the agent working - what did that feel like? Walk through a specific example of what you had it do. Did you try the FizzBuzz or ROT13 examples from the tutorial? Or something else?]

## Understanding the Tool Execution Cycle

[Explain how the cycle works from your perspective now that you've built it:

1. Claude analyzes the request
2. Claude requests tool use
3. Your code executes the tool
4. Results go back to Claude
5. Claude decides next steps

What clicked for you when you saw this in action?]

## What I Learned

### About Building Agents

[What did you learn about how agents actually work? Was it simpler or more complex than expected?]

### About the Anthropic API

[Insights from working with the API directly. How does it handle tool calls? Message structure?]

### About Go

[If you learned anything new about Go during this process]

## Challenges Along the Way

[What parts were tricky? Did you run into any bugs? API errors? Logic issues? How did you debug and solve them?]

## The "Aha" Moments

[What surprised you most? What made you think differently about AI agents? Any misconceptions that were corrected?]

## Final Thoughts

[Reflect on the experience. The tutorial's claim that you only need ~300 lines - was that accurate? How does this change what you think is possible with AI?]

[Would you recommend others try building an agent? What's your main takeaway from this experience?]

## What's Next

[What do you want to build now that you understand how agents work? Ideas for improvements to this agent or new agents to create?]

## Resources

- [How to Build an Agent Tutorial](https://ampcode.com/how-to-build-an-agent)
- [Anthropic API Documentation](https://docs.anthropic.com/)
- [Your goldeneye repo - if you want to share it]

---
title: Intro to Distributed Systems
ogImage: https://i.imgur.com/GC3eWj5.png
tags:
  - distributed systems
pubDatetime: 2023-04-21T10:00:00.169Z
featured: true
description: Computing, Concurrency, Fault Tolerance, oh my!
---

![intro-to-distributed-systems-post-photo](https://i.imgur.com/GC3eWj5.png)

🪴 _This is a living post, and will likely be updated periodically_

Hello! It's been a while, so first and foremost, thank you for being here and for taking the time to read this!

I have recently been interested in distributed systems, and decided to put together a roadmap of an open sourced MIT class, 6.824: Distributed Systems Engineering. As I navigate this roadmap, I will collect my thoughts, notes, and learnings and convert them into the series you are reading now.

> 🚨 Disclaimer: I am in no way, shape, or form an expert on distributed systems. The content published here is purely my interpretation of the material I have consumed.

## Series roadmap

Moving forward, I will provide a snapshot into the future of the series I am writing. This helps me pace my content while informing the reader of what to expect upfront. For the distributed systems series you can expect the following:

- Week 1: [Intro to Distributed Systems](https://martincartledge.io/posts/intro-to-distributed-systems)
- Week 2: A deep dive of MapReduce
- Week 3: RPC and Threads
- Week 4: GFS: Google File System
- Week 5: Replication: Primary-backup
- Week 6: Fault Tolerance: Raft
- Week 7: Replication: Zookeeper and CRAQ
- Week 8: Cache Consistency: Frangipani
- Week 9: Distributed Transactions
- Week 10: Spanner
- Week 11: Optimistic Concurrent Control
- Week 12: Big Data: Spark

## So what is a Distributed System?

> A set of cooperating computers used to perform a task

A question you might ask is: _Why would you need more than one machine? How are distributed systems used today?_

Great question, here are some examples of common applications of distributed systems and how they are used:

- Storage for websites (Gmail, YouTube)
- Data-intensive operations (MapReduce)
- Peer to peer file sharing (Dropbox)

### Why use them?

Let's dig into the weeds a bit more on the value of distributed systems.

What do they offer? What problems do they solve?

#### Performance

When more computers are at your disposal, your processing power goes up. When leveraged properly, this can give you highly-tuned performance.

#### Parallelism

When you have more machines available, you can conduct more operations at the same time, or _in parallel_. Having the ability to use parallelism in your systems can also give you high throughput and performance.

#### Fault Tolerance

One certainty of systems and technology is that they _will_ fail. What happens when one of your machines fails? Does your data corrupt and vanish into thin air? This is where _Fault Tolerance_ comes in.

Fault Tolerance allows you the flexibility for your systems to respond in a productive manner when a machine fails in your system. Continuous operation is its bread and butter. 🍞

#### Physical locations

If two systems crash in a forest, does anyone hear it? 🌲🌲

The short answer is, _yes_. Another common tactic in building insulated distributed systems is to think deeply about the physical locations of the machines you use.

Why does this matter? Let me share a scenario with you.

Your machines are co-located in a datacenter on the east coast; a tropical storm hits that location and wipes power from the entire datacenter.

What happens now? Your system does not have anywhere to fail over to, and you are out of luck.

A better approach might be to split your machines on each coast, West and East, respectively. When one fails, the other can still operate.

#### Split computations

For more delicate systems, think financial, it makes sense to dedicate pieces of computations throughout your system.

By splitting up computation that a system performs, you can insulate yourself from malicious attacks. When highly impactful systems share the load of a process, it makes attacking a single point much less successful.

### Challenges:

#### Concurrency

Simply put: _The more machines you have in a system, the more complicated it can get._

Remember when I mentioned a strength of distributed systems was the ability to perform several computations at once? That can also lead to some head scratching moments.

As an example:

You have two processes that are performing computations and writing to a database. If you query your database too soon, your processes might not be complete.

#### Partial failures

A certainty of computing is _failure_. A partial failure is certainly more favorable than a complete failure, however, they can produce just a large headache.

#### Performance

Remember when I alluded to `more computers = more performance`?

That was not completely true. It takes a critical eye and sound strategy to properly tune a distributed system and reap the performance benefits.

As an example: let's talk about _consistency_.

In our _Concurrency_ example, I painted a picture of two separate processes performing computations and updating a single datastore.

To expand on this example: let's say that we really want to ensure that our datastore _always_ has the latest values present. We do not want to run the risk of returning out-of-date data.

This comes at a cost, and is commonly referred to as [_Strong Consistency_](https://en.wikipedia.org/wiki/Strong_consistency).

Of course, you should strive to have the most complete data available as often as possible, but remember, this does come at a cost.

### In Summary

Distributed Systems is a _vast_ topic, and one I could spend months writing about. I hope this introduction post was helpful to you in understanding:

- What a Distributed System is
- When using a Distributed System makes sense
- What benefits Distributed Systems offer
- What challenges you might face when working with a Distributed System

In my next post, I will dive into a pioneering technology within the Distributed Systems world: MapReduce.

Thanks for reading!

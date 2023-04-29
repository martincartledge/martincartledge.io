---
title: A Deep Dive of MapReduce
tags:
  - distributed systems
pubDatetime: 2023-05-01T10:00:00.169Z
featured: false
draft: true
description: Exploring a foundational technology in Distributed Systems
---

![deep-dive-of-mapreduce-blog-post](https://i.imgur.com/GC3eWj5.png)

🪴 _This is a living post, and will likely be updated periodically_

MapReduce was a revolutionary concept within the field of Distributed Systems, therefore, I felt it deserved its own post.

You might have heard of it in the past, and for good reason. The world's most popular search engine, Google, used MapReduce heavily for several years.

It is my goal of this post is to share the following key points:

- What is MapReduce
- How does MapReduce work
- Why use MapReduce

## What is MapReduce

> Programming model and implementation for processing and generating large datasets

MapReduce was created with the goal of processing hundreds of terabytes of data at scale. During the time of its inception, 2004, the industry was relying on hardware that simply could not keep up with the demand of processing big data.

The manner in which it performs this processing is split into two actions, you guessed it, mapping and reducing.

To use:

A user specifies a map function:

- Processes a key/value pair
- Which generates a set of intermediate values associated with the same key

And a reduce function:

- merges all values associated with the same key

- Automatically parallelized and executed on a large cluster of commodity machines

The run time system handles:

- Partitioning the input data
- Scheduling the program’s execution across a set of machines
- Machine failures
- Managing the inter-machine communication

Inspired by the map and reduce primitives found in Lisp, among other functional programming languages

The goal: handle processing large sets of data at Google, while hiding parallelization, fault-tolerance, data distribution and load balancing.

The computation takes a set of input key/value pairs and returns a set out output key/value pairs.

MapReduce library is written in C++

## How Does MapReduce Work

## Why use MapReduce

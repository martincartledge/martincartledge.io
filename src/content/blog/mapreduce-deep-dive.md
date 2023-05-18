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

A map operation is performed on each _logical_ record derived from the input, a set of key/value pairs are composed, then a reduce operation is applied to _all_ values that _share the same key_.

When broken down into steps:

- A user specifies a `map` function:
  - Processes a key/value pair
  - A set of intermediate values associated with the same key is generated
- A user specifies a `reduce` function:
  - All values associated with the same key are merged
  - This operation is automatically parallelized and executed on a large cluster of commodity machines

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

There are many different ways to implement MapReduce, but for simplicity sake, I will provide an overview similiar to what Jeffrey Dean and Sanjay Ghemawat cited in their [MapReduce paper](https://research.google/pubs/pub62/).

- Large clusters are connected via Ethernet
- Each machine is equipped with dual-processor x86 processors
  - OS: Linux
  - Between 2-4 GB of memory per machine
- Commodity networking hardware is used
  - 100 megabits per second
  - 1 gigabit per second at the machine level
- Clusters consist of hundreds/thousands of machines
  - Failures are common
- Storage is handled in two primary methods
  - IDE disks attached to each machine
  - A distributed file system (GFS) that manages the data stored on the machine's disks
  - GFS uses replication to ensure data availability amidst unreliable hardware
- A user submits jobs to a scheduling system
  - Within each job are sets of tasks
  - These tasks are mapped by the scheduler to available machines within the cluster

## Implementation

Now we know _what_ it looks like to implement MapReduce, but what happens when MapReduce is used? Next, I will describe the execution phase.

### Execution

- Input files are split into M (map) pieces, typically 16/64 megabytes
  - The split size is controllable via parameter
- Several copies of the program are spun up on a cluster of dedicated machines
- There is one `master` copy, this copy assigns idle works M (map) and R (reduce) tasks
- If a worker is assigned a M (map) task, it will read the contents of the corresponding input split
  - This worker parses key/value pairs of the input and passes each key/value pair to the user-defined Map function
  - Intermediate key/value pairs produced are buffered in memory
- Buffered pairs are written to local disk periodically and are partitioned into R (reduce) regions
  - The locations of the buffered pairs on local disk are passed back to the `master` worker who takes care of sending these locations to the R (reduce) workers
- When a R (reduce) worker is notified by the `master` worker of these new locations, Remote Procedure Calls (RPC) to read the buffered data from the local disks of the M (map) workers
- After the R (reduce) worker has read all data, keys are sorted so that occurences with the same key are grouped together
  - In cases where the data is too large, in-memory sort is not used, but rather an external sort function
- The R (reduce) worker iterates through the sorted data and passes a key and set of values to the user supplied reduce function
- Once the map and reduce tasks are complete, the `MapReduce` call returns back to the user code
- The output of the `MapReduce` execution can be found in the R (reduce) output files, one file per task

### `master` data structures

### Fault tolerance

#### Worker failure

### Locality

### Task granularity

## Refinements

### Skipping bad records

### Local execution

### Status information

### Counters

## Experience

## Conclusions

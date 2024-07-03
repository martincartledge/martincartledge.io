---
author: Martin Cartledge
pubDatetime: 2024-07-05T10:00:00.169Z
title: Knowledge Representation and Expert Systems
ogImage: "https://i.imgur.com/JOE5VfU.jpg"
tags:
  - artificial intelligence
featured: false
draft: true
description: Learning Artificial Intelligence - Week 2
---

![knowledge-and-representation-post-photo](https://i.imgur.com/JOE5VfU.jpg)

The core of artificial intelligence, is the pursuit of greater knowledge. The ultimate goal being that this knowledge is used to view the world as a human does.

When AI was first being evolved, the top down approach to creating systems was the prominent path. This involved getting knowledge from human experts of a topic and convert that information into a machine-readable format. The core principles of this approach are _Knowledge Representation_ and _Reasoning_.

## Knowledge Representation

> Knowledge represents our understanding of the world, and comes from an active learning process. The information we receive integrates into our personal model of the world.

What is the difference between knowledge and information? When you read a book are you reading knowledge or information?

The answer is information (or data). Knowledge is gained once we integrate the information or data we consume and integrate it with our own internal model.

There are four pillars that illustrate the relationship between knowledge and information:

- **Data**: Raw facts or numbers
- **Information**: Data that has been processed
- **Knowledge**: Information that has been integrated into our understanding
- **Wisdom**: Knowledge that has been applied

This pyramid and illustrative concept is called the [DIKW pyramid](https://en.wikipedia.org/wiki/DIKW_pyramid).

The problem that Knowledge Representation attempts to solve is how to represent knowledge in a way that a computer can understand and in a way that the data stored can be automatically useable. The two extremes of this problem being: algorithms that are used by a computer, and human natural language that we use every day.

Algorithms can be interpreted and run by a computer, but are not as easily understood by humans. Natural language is of course easily understood by humans, however, it is not as easily deciphered by a computer.

## Computer Representation of Knowledge

There are a number of ways that knowledge can be represented in a computer:

### Network Representation

This representation is based on how we think about concepts or information in our own mind. These related pieces of information form a network in our brains.

When this is replicated for a computer, the networks we form in our brain can be represented as a graph in a computer. These are also referred to as _Semantic Networks_

### Object-Attribute-Value Triplets or Attribute-Value Pairs

Before we go any further, take a look at this example:

| Object | Attribute | Value |
| ------ | --------- | ----- |
| Anakin | Father    | Luke  |

If you take a few seconds, you can probably determine the relationship between these three pieces of information. This is called an _Object-Attribute-Value triplet_.

Taking a step back, imagine this data in the form of a graph structure. A node (object) of the graph would represent _Anakin_. This node would have an edge, _Father_ that would point to another node, _Luke_. Let's see that visually as well:

TODO: Add diagram

### Hierarchical Representation

Humans have a tendency of grouping similar information together. If we think of a Tesla, we know that it is a car, and that all cars have wheels. This is what Hierarchical representation is; a way of representing knowledge in a tree-like structure.

#### Frame representation

If Hierarchical representation is a tree-like structure, a _Frame_ is an object (node) on that tree. These frames contain _slots_, which can house different pieces of information. To reiterate the structure, a _Frame_ forms a tree-like, hierarchical structure. Similar to an object-oriented language like Java, a frame can be thought of as a class, and the slots as the attributes of that class.

> Scenarios: a complex frame that can unfold in time

| Slot       | Value  | Default Value |
| ---------- | ------ | ------------- |
| Name       | Anakin | -             |
| Is-A       | Jedi   | -             |
| Lightsaber | Red    | Blue          |

### Procedural Representation

> Representing knowledge by a list of actions that occur when a specific condition is met

If you have ever written logic in programming, you have used procedural representation. Procedural representation is not exclusive to programmers however, if you have followed a recipe or helped determine when a family member is sick, you have used procedural representation.

Put simply, if-then statements allow us to draw conclusions. As an example:

_IF_ the lightsaber is red, _THEN_ the person is a Sith.

### Logic Representation

> A way to represent human knowledge in a universal way

#### Predicate Logic

Predicate logic is a mathematical way of representing knowledge. However, it is too complex to be computable, because of this a subset is commonly used instead. Some examples include _Horn_ or _Prolog_.

#### Descriptive Logic

Descriptive logic is comprised of a family of logic systems that represent and reason the hierarchical structure of knowledge. This is a more computable form of logic. An example of this is _Semantic Web_.

## Expert Systems

### Forward vs Backward Inference

#### Implementing Expert Systems

## Ontologies and the Semantic Web

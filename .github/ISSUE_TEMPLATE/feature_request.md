---
name: "✨ Feature request"
about: "Propose a new feature or improvement for convert-japanese"
title: "feat: <short summary>"
labels: enhancement
assignees: ""
---

## Summary
A clear, concise description of the feature you’d like to see.

## Problem / Motivation
- What problem does this solve?
- Who benefits (use case / audience)?
- Why is the current behavior insufficient?

## Proposed Solution
Describe how you think this should work.

- **API / Config shape** (functions, options, defaults):
  ```ts
  // Example
  toFullSizeCharacters(input, {
    mode: "strict" | "normalize",
    include: { kana: true, ascii: true, punctuation: true },
    customMap?: Record<string, string>, // user-supplied overrides
    keepBackslash?: boolean,            // don't convert '\' → '￥'
  })

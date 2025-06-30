---
title: "GitClone - My educational git clone"
date: 2025-06-29T22:22:30+05:30
categories:
  - project
tags:
  - project
  - educational
---

## Intoduction

Hello there! Nice to see you here again.

Here, I am going to talk about `gitclone`. An educational project which I made to understand how version control systems like Git work under the hood.

My goal with this project was simple. Build a replica of the core of Git but using nodejs. And I would say that I did manage to build it! It can do commits, revert back to a previous commit, switch branches, view commit logs etc.

## Commands

**Let's see some examples of gitclone commands:**

```bash
gitclone init # Initialises a gitclone repository

gitclone add # Stage a file

gitclone commit -m "message" # Does a commit with the message `message`

gitclone log # Logs all commits

gitclone reset $SHA256_OF_COMMIT # Resets back to a commit

gitclone branch test # Creates a new branch called test
```

## Conclusion

If you are either a clueless person on how Git works, or want to learn something new, you can check out `gitclone` source code and learn for yourself!

[GitClone Source Code](https://github.com/Byson94/gitclone)

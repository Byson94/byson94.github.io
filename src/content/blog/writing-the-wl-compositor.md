---
title: Writing The Ideal Wayland Compositor
date: 2026-07-18
description: Writing the wayland compositor of my dreams.
---

In the last post, I talked about what I think is the ideal wayland compositor. And this post will talk about 
I decided to build it myself, the progress I made, and the limitation I am facing.

## Project

Let me introduce you to the project first. I called it **buzzay**. And it works exactly as the window manager
I mentioned in the previous blog post of mine (but with a catch which I'll get to).

It is plugin first, and loads plugins that are inside the following directories:

- `/usr/lib/buzzay-plugins/`
- `~/.local/share/buzzay-plugins/`

They can be loaded, and messaged to, like so:

```bash
$ buzzay --load <name>
$ buzzay --msg <name> <arg1> <arg2> ...
```

For those interested in the project, here are the links:

- Source: https://github.com/Byson94/buzzay
- Website: https://byson94.is-a.dev/buzzay

## Progress

Its only been a few days since I started writing it and I believe I made a fair amount of progress. The compositor
can be loaded and can display cursor and windows too. 

As of right now, it implements the `xdg-shell`, and `xdg-decoration` protocols.

With this much progress made, I now plan on extending the plugin API and adding support to more protocols like `layer_shell`,
`gamma`, etc. And also work a little on the window manager API's and the window manager itself.

## Limitations

Ehh, I was quickly proven why compositors don't just follow this architecture. 
Here are the main limitations and issues that I faced.

### Safety

Exposing the compositor server to the plugins is a safety risk. A plugin can maliciously or accidentally corrupt 
or pass invalid data to the server which will result in the whole compositor crashing. And the server is something
that gets updated quite often. If a plugin relies on it, then it would have to contantly be recompiled to keep up 
to date with the compositor. If it is not recompiled and is out of date, then it will simply crash the whole compositor
which is **a terrible user experience**.

### Complexity of wlroots

`wlroots` is severely undocumented and complex. Trying to map it 1:1 will make the compositor complex too, which 
I am actively trying to avoid. And I cant pass the raw wlroots data around because wlroots API is unstable. 
I cant expose the compositor server and let the plugins figure it out on their own too because of the safety
reasons mentioned above.

## Solutions & Vision

To solve all the problems, I decided to make the plugin API an abstraction that allows plugins to hook into existing
compositor functions. Although this approach makes it so that plugins **cannot** register custom protocols into the
compositor, it is a necessary sacrifice I have to sadly make.

So it is certain that I will be working on this project for a while as it is peaking my curiosity. So until then,
peace!

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

As of right now, it implements the `xdg-shell`, `xdg-decoration`, `viewporter`, `cursor-shape`, `gamma`, `idle-notify`,
and `idle-inhibit` protocols, along with a partial `layer-shell` implementaiton.

I am now working on the window management system and on finishing the `layer-shell` implementation.

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

### Lack of room to grow

If I don't expose the compositor server to the plugins, then everyting would have to run through hooks.
This isn't ideal because not every case can be covered through hooks. If I did expose the compositor server
to the plugins then I will suffer from the safety issues mentioned right above!

Let me give you a more precise example. Take a window manager like niri for example. When you 
try to move a window through inputs (using something like `Super+Click`), you would see that the compositor
would highlight where the window will stick to when you leave it. But this thing isn't really easy
to implement in buzzay just because of the sole reason that it should leave the work to plugins.

This is an issue exclusive to this architecture. It is neither possible to cover every scenario nor possible
to let the plugins have full access to the compositor server while ensuring fully safety. Trying to implement
a safe API that covers most scenarios is time consuming and has a chance of making the compositor end up
like X11.

## Solutions & Vision

Although I am still to find a cleaner solution, I decided to make the plugin API an abstraction that allows plugins to hook into existing
compositor functions. Although this severely reduces the things a plugin can do, it is a necessary sacrifice I am forced to make.
The compositor **has to be opinionated**. Plugins no longer can just do "anything". I will now be building the plugin API to be more of a 
configuration system rather than an extension system. This is the only way in which both the compositor and the plugin can coexist safely.

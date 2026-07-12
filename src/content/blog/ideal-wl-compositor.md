---
title: Ideal Wayland Compositor
date: 2026-07-12
description: The ideal wayland compositor from my dreams.
---

Modern wayland compositors are very monolithic in nature. They combine both the compositor and the window manager into one.
And this does not leave any room for extensibility. But it does not have to be like that, the compositor and the window manager 
should be split, which will allow one compositor to have a vast ecosystem. 

River is the compositor that solves this problem. But why not go one step further? Why decouple only the window manager
from the core? Why not go one step further and decouple the entire compositor? All compositors need constant updates
to keep up with modern wayland protocols, or add new features to satisfy the users. And a highly decoupled compositor
can just composite and let the comminity lead it however they want. And this my friend, is the ideal wayland compositor
in my point of view.

## The Proposal

After a lot of brainstorming, I came up with the exact thing that makes the compositor of my dreams.

### Fundamentals

- There should be no configuration file at all.
- Everything should be done via IPC and shell.
- Plugin system should be the biggest priority.
- Just Keep It Simple Stupid (KISS).
- Everything in pure C.

That should be the fundamentals of the compositor. Just enough to do one thing well.

### Proposed IPC System

The user should be able to interact with the compositor using shell commands through the IPC.
Here is a simple system I could think of right now:

```bash
#!/bin/bash

# Note: 'comp' stands for Compositor Name

# Load plugins
comp --load window-mgr
comp --load input

# Input handling
comp --msg input "Super+Return" "kitty"
comp --msg input "Super+Q" "comp --msg window-mgr close_active"
```

The `--load` command loads the plugins **into** the compositor. Not just implementing some protocol that the compositor 
supports. Just extend the core compositor entirely. **Users will have maximum control that way.**

### Plugin System

This must be the heart and soul of the compositor. There must be a `comp.h` file which plugins can use.
The plugins will then use the `comp.h` file to build a plugin and compile down to a `.so` file which 
the compositor can load and execute freely.

The benifit of having the compositor written in pure C is this, the plugin system. C ABI is completely stable. 
Infact, C is the lingua franca language that every other languages use to communicate with each other. Because of this,
the compositor can just pass the whole whatever thing it has over to the plugin and just **let it do whatever it wants.**

## Conclusion

A plugin system is the solution to all problems. It lets the users extend something beyond what it was 
originally built for. An architecture like that is pretty hard to beat under the ideal circumstances.

---
title: Configure Kitty to be Super Fast
date: 2026-09-20
description: How to setup kitty terminal to open super fast.
---

It is after I tried out foot terminal I realized how slow kitty is. The main feature that makes foot so fast is its
client-server system. One single server will be responsible for handling the terminal. So, the client can just 
immediately start up since the server already is warmed up.

I'm not sure if this is an already a well known feature of kitty. But I surely am only discovering it now, and this blog
will serve as a documentation which I can visit later when I setup kitty again.

## Reasons to Choose Kitty

Before going forward, it is important to know why I choose kitty over foot, despite kitty being slower than it. 
The main reason is the built in multiplexer in kitty. It just ties with the terminal so much better than the
foot + tmux setup. And I find kitty's default multiplexer keybindings to be way faster and more convenient than tmux's
default keybindings. Although the keybindings in tmux can be changed to be similar to kitty's, some things like
making mouse support is not as robust as kitty's.

## Client-Server Approach in Kitty

Kitty has a `--single-instance` (`-1` in short) argument which will make kitty use existing instances as a "server",
thus reducing startup time.

So this command can be used to launch kitty as a single instance:

```bash
kitty -1
```

But this still requires at least one instance of kitty to be alive to use it as the server. To eliminate this requirement, 
we can start up an headless kitty instance during startup of your window manager:

```bash
kitty -1 --detach --start-as=hidden
```

## Application in Sway

These commands can be applied in sway with the following config:

```conf
# During startup
exec kitty -1 --detach --start-as=hidden

# Terminal Binding
bindsym Mod4+Return exec kitty -1
```

## Conclusion

This will make kitty's startup time *blazingly fast*. Finally, I can save *1s* of time...

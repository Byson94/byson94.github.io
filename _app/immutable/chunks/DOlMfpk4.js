var e=`---
title: Ewwii
---

Ewwii is a fork of [eww](https://github.com/elkowar/eww), the popular rust based widget system. It improves eww in the following ways:

- Migrates from GTK3 to GTK4, improve performance with GPU acceleration.
- Uses [NBCL](/projects/nbcl/) as the configuration language for more control and power.
- Introduces a plugin system capable of replacing the configuration language and register new widgets.

The main reason why I even set out to fork eww was not because I had these ideas planned in my head from the start.
I had noticied a few core issues with other widget system's that made me feel like I must create a solution myself.
Eww was one of the lightest widget systems that you could do a lot of stuff with. But it was limiting compared to
its modern alternatives. I wanted eww to be as capable as its modern alternatives while staying lightweight.
And... that's how ewwii was born. 

I've been working ewwii since and have added a lot of new and unique features. It is one of my best creations and 
I aim to improve it even more in the future. Mostly by introducing more plugin API's and exposing abstractions
for Linux services like wifi and battery.

**Links:**

[Github](https://github.com/ewwii-sh/ewwii) |
[Website](https://ewwii-sh.github.io) |
[Documentation](https://ewwii-sh.github.io/docs)
`;export{e as default};
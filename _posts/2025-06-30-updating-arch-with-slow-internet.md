---
title: "Updating arch linux with a slow internet"
date: 2025-06-29T16:57:30+05:30
categories:
  - blog
tags:
  - blog
  - story
---

## Introduction

We all know the feeling when the internet is slow and you cant do an arch update. I have been in this situation multiple times. In this blog, I am going to talk about how we can safely install arch updates with a slow internet.

First of all, let's talk about arch. Arch is a rolling-release operating system which comes under the familiy of Linux distributions (or distros). It is a minimal but fast distribution which can probably run on any low end pc. But due to it's rolling-release nature, updates are frequent and if you dont update for a long time, you might fall victim to [dependency hell](https://en.wikipedia.org/wiki/Dependency_hell).

Due to these reasons, updating arch using a slow internet is a nightmare! So, I'll show you what I do when I have a slow internet connection.

## Updating & Problems

Most people uses `$ sudo pacman -Syu` to update their system. And it works fine for people with a stable internet connection! But when it comes to people with a slow internet connection, the story is different. This command will mostly **not** work as inteded. Especially because of timeouts, installation errors and `404 error codes` from arch mirrors.

But, instead of `$ sudo pacman -Syu`, you can run `$ sudo pacman -Syuw`. Why `$ sudo pacman -Syuw` you may ask. It is because it only downloads the packages and doesn't install them. This is exactly what we need to download all packages one after another safely. If you are interested about this more, you can observe the following diagram:

<!-- Diagram section start -->
<style>
  .diagram-grid {
    user-select: none;
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: center;
    align-items: flex-start;
  }

  .diagram-item {
    flex: 1 1 300px;
    text-align: center;
  }

  .diagram-item img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
    transition: transform 0.2s ease;
  }

  .diagram-item img:hover {
    transform: scale(1.02);
  }

  .diagram-item p {
    margin-top: 0.5rem;
    font-weight: bold;
    font-size: 0.95rem;
  }

  .diagram-item a:focus {
    outline: none;
  }

</style>

<div class="diagram-grid">
  <div class="diagram-item">
    <a href="/assets/images/diagrams/pacman_Syu.png" target="_blank" rel="noopener noreferrer">
      <img src="/assets/images/diagrams/pacman_Syu.png" alt="pacman -Syu diagram" />
    </a>
    <p>sudo pacman -Syu</p>
  </div>
  <div class="diagram-item">
    <a href="/assets/images/diagrams/pacman_Syuw.png" target="_blank" rel="noopener noreferrer">
      <img src="/assets/images/diagrams/pacman_Syuw.png" alt="pacman -Syuw diagram" />
    </a>
    <p>sudo pacman -Syuw</p>
  </div>
</div>

<!-- Diagram section over -->

Even though both commands does almost the same thing, I suggest that you do `$ sudo pacman -Syuw` because, if you have a slow internet connection, then your goal is downloading packages more than installing it. So, `$ sudo pacman -Syuw` is a safer alternative to `$ sudo pacman -Syu` because we can install the downloaded packages whenever we want with `$ sudo pacman -Su`. But it is also important to mention that even if you run `$ sudo pacman -Syuw`, you may encounter timeouts and other problems that causes the download to fail. But the packages which are downloaded before the errors are still in your system, and the next time you run `$ sudo pacman -Syuw`, the packages listed will be less because a few packages are already downloaded.

You can use this method multiple times to slowly but steadly download each package. But running `$ sudo pacman -Syuw` alone can't prevent `404 errors` arch mirrors. If you encounter this error, this means that the package that you need is not found in that particular mirror. To fix this, you can urn `$ sudo reflector --latest 20 --sort rate --protocol https --save /etc/pacman.d/mirrorlist`. This will re-rank the arch mirrors based on the ones that are updated recently. But, this command may not always work. If your internet is that slow, it may timeout as well. If that happens, you would have to rank the mirrors manually or remove the mirror that didn't have the package.

### Removing the mirror that doesn't have the package

Let's talk about removing the mirror that gave the `404` error code first. To remove it, first you would have to run `$ sudo vim /etc/pacman.d/mirrorlist` (replace vim with your text editor). Then in there, find the mirror that didn't have the package that you needed. For example, if the `https://cdnmirror.com/archlinux/$repo/os/$arch` mirror gave the `404` error code on a package, then you need to find the `Server = https://cdnmirror.com/archlinux/$repo/os/$arch` entry in `/etc/pacman.d/mirrorlist` and comment it out.

**For example:**

```toml
# Adding a `#` infront of a line, comments that line out.
# Server = https://cdnmirror.com/archlinux/$repo/os/$arch
Server = https://singapore.mirror.pkgbuild.com/$repo/os/$arch
Server = https://mirror.ubrco.de/archlinux/$repo/os/$arch
Server = https://taipei.mirror.pkgbuild.com/$repo/os/$arch
Server = https://mirror.moson.org/arch/$repo/os/$arch
```

### Manually ranking mirrors

If you are manually ranking the mirrors, then you would have to find the fastest mirrors (closest to your region) and also the ones that are updated recently. Then, to add an entry, first run `$ sudo vim /etc/pacman.d/mirrorlist` (replace vim with your text editor) to open up the arch mirrorlist and then add those entries to the top of the file.

**Example:**

For example, if the entry that you need to add is smth like [**https://MIRROR.com/$repo/os/$arch**](#), then you can add it to `/etc/pacman.d/mirrorlist` like this:

```toml
# New mirror
Server = https://MIRROR.com/$repo/os/$arch

# Previous mirrors
Server = https://mirrors.urbanwave.co.za/archlinux/$repo/os/$arch
Server = https://mirror.ufscar.br/archlinux/$repo/os/$arch
Server = https://mirror.theash.xyz/arch/$repo/os/$arch
Server = https://archlinux.c3sl.ufpr.br/$repo/os/$arch
```

Yeah, that's it! If you managed to download all packages using `$ sudo pacman -Syuw`, then you can run `$ sudo pacman -Su` to install the packages that you downloaded using `$ sudo pacman -Syuw`.

## Conclusion

These are the methods that I use to install a new arch update with a slow internet connection.
And if you are an arch user like me and has a slow internet connection, then you should do updates regularly because if you dont, the number of packages to download will add up over time and you might have to download a massive number of packages which will be a pain if you have a slow internet.

This is the end of this small little blog and thank you for reading till here and yeah, I guess that I will end this blog with a stupid quote that I come up with:

> "Download em regularly, else might struggle unregularly"
>
> — Me

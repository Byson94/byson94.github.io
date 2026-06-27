---
title: Switching to go for concurrency
date: 2026-06-26
description: Go concurrency is just way easier.
---

I recently have been learning [Golang](https://go.dev) and I am starting to like it. Though I am experiencing
a bit of friction as I come from a Rust/C background, the concurrency in go is just way easier to work with in general.

In rust, you would need to bring in the full tokio stack just to get a basic concurrent application going, 
then wait a long time for the compiler to compile everything. There is no such issues like this in go,
just use the `go` keyword and boom, you have concurrency. And the compliation takes less than a second.

I find the channels in go much more convenient to work with too. Unlike rust's mpsc, go channels are like
black magic. It just works and you don't know why.

**Concurrency in Go:**

```go
ch := make(chan bool)

go func() {
    defer fmt.Println("Awesome")
    ch <- true
}()

<-ch
```

One may argue that rust is faster and safer than go, and I understand. But sacrificing a little speed
for fast iteration + easy concurrency is a sacrifice I am willing to take. Sorry fellow rustaceans.

That said, I also want to mention that for everything else other than concurrency, I feel that Rust is just
superior. Here are the reasons:

- `Option<T>` and `Result<T, E>` are superior to `if err != null`.
- Clap with `derive` feature (for CLI's).
- Better for systems programming.
- Better WASM support.

And most importantly, **rust is my home turf**. Go is mostly focused on cloud too, which is an area
in which I've never worked, wish to never work on (as of now). So, for everything other than concurrency,
I'll be working right here in rust. And regarding my progress in Go, right now, I am still exploring 
the languageand am yet to make an actual project in it, which I hopefully will do soon (the idea must come). 

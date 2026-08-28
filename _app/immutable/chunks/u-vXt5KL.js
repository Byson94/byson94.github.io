var e=`---
title: NBCL
---

Node Based Configuration Language (NBCL) is configuration language with a twist. Rather than static configuration,
NBCL supports scripting in the language. It can produce both configuration and side-effects. It is built specifically
for the cases where scripting and configuration are both necessary, like the case with [ewwii](/projects/ewwii), as
trying to make a scripting language behave as a configuration language will increase the overall complexity for all users.

Here is an example of the configuration aspect of the language:

\`\`\`nbcl
Node {
    greeting = "Hello!"
    number = 10

    # Create variable
    let value = 2

    # Child node
    Node {
        number = value;
    }
}
\`\`\`

And the scripting aspect:

\`\`\`nbcl
import "other.nbcl" as other

print("Hello, World!")

let var = 2
let map = {
    p1 = 10
    p2 = 3
}

set map.p2 += var
print(map)
\`\`\`

**Links:**

[Github](https://github.com/nbcl-lang/nbcl) |
[Website](https://nbcl-lang.github.io) |
[Documentation](https://nbcl-lang.github.io/docs) |
[Playground](https://nbcl-lang.github.io/playground)
`;export{e as default};
import{H as e,M as t,N as n,U as r,_ as i,f as a,y as o}from"./Bp67M862.js";import"./xihTtKlq.js";var s={title:`NBCL`},{title:c}=s,l=o(`<p>Node Based Configuration Language (NBCL) is configuration language with a twist. Rather than static configuration,
NBCL supports scripting in the language. It can produce both configuration and side-effects. It is built specifically
for the cases where scripting and configuration are both necessary, like the case with <a href="/projects/ewwii">ewwii</a>, as
trying to make a scripting language behave as a configuration language will increase the overall complexity for all users.</p> <p>Here is an example of the configuration aspect of the language:</p> <pre class="language-nbcl"></pre> <p>And the scripting aspect:</p> <pre class="language-nbcl"></pre> <p><strong>Links:</strong></p> <p><a href="https://github.com/nbcl-lang/nbcl" rel="nofollow">Github</a> | <a href="https://nbcl-lang.github.io" rel="nofollow">Website</a> | <a href="https://nbcl-lang.github.io/docs" rel="nofollow">Documentation</a> | <a href="https://nbcl-lang.github.io/playground" rel="nofollow">Playground</a></p>`,1);function u(o){var s=l(),c=n(t(s),4);a(c,()=>`<code class="language-nbcl">Node &#123;
    greeting = &quot;Hello!&quot;
    number = 10

    # Create variable
    let value = 2

    # Child node
    Node &#123;
        number = value;
    &#125;
&#125;</code>`,!0),r(c);var u=n(c,4);a(u,()=>`<code class="language-nbcl">import &quot;other.nbcl&quot; as other

print(&quot;Hello, World!&quot;)

let var = 2
let map = &#123;
    p1 = 10
    p2 = 3
&#125;

set map.p2 += var
print(map)</code>`,!0),r(u),e(4),i(o,s)}export{u as default,s as metadata};
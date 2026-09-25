import{F as e,G as t,I as n,S as r,b as i,h as a}from"./CJov-gak.js";import"./xihTtKlq.js";var o={title:`NBCL`,description:`A configuration language with scripting capabilities.`,headings:[]},{title:s,description:c,headings:l}=o,u=r(`<p>Node Based Configuration Language (NBCL) is configuration language with a twist. Rather than static configuration,
NBCL supports scripting in the language. It can produce both configuration and side-effects. It is built specifically
for the cases where scripting and configuration are both necessary, like the case with <a href="/projects/ewwii">ewwii</a>, as
trying to make a scripting language behave as a configuration language will increase the overall complexity for all users.</p> <p>Here is an example of the configuration aspect of the language:</p> <!> <p>And the scripting aspect:</p> <!> <p><strong>Links:</strong></p> <p><a href="https://github.com/nbcl-lang/nbcl" rel="nofollow">Github</a> | <a href="https://nbcl-lang.github.io" rel="nofollow">Website</a> | <a href="https://nbcl-lang.github.io/docs" rel="nofollow">Documentation</a> | <a href="https://nbcl-lang.github.io/playground" rel="nofollow">Playground</a></p>`,1);function d(r){var o=u(),s=n(e(o),4);a(s,()=>`<pre class="shiki shiki-themes catppuccin-latte dark-plus" style="background-color:#eff1f5;--shiki-dark-bg:#1E1E1E;color:#4c4f69;--shiki-dark:#D4D4D4" tabindex="0"><code><span class="line"><span>Node {</span></span>
<span class="line"><span>    greeting = "Hello!"</span></span>
<span class="line"><span>    number = 10</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    # Create variable</span></span>
<span class="line"><span>    let value = 2</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    # Child node</span></span>
<span class="line"><span>    Node {</span></span>
<span class="line"><span>        number = value;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre>`);var c=n(s,4);a(c,()=>`<pre class="shiki shiki-themes catppuccin-latte dark-plus" style="background-color:#eff1f5;--shiki-dark-bg:#1E1E1E;color:#4c4f69;--shiki-dark:#D4D4D4" tabindex="0"><code><span class="line"><span>import "other.nbcl" as other</span></span>
<span class="line"><span></span></span>
<span class="line"><span>print("Hello, World!")</span></span>
<span class="line"><span></span></span>
<span class="line"><span>let var = 2</span></span>
<span class="line"><span>let map = {</span></span>
<span class="line"><span>    p1 = 10</span></span>
<span class="line"><span>    p2 = 3</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>set map.p2 += var</span></span>
<span class="line"><span>print(map)</span></span></code></pre>`),t(4),i(r,o)}export{d as default,o as metadata};
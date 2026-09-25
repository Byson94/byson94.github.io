import{F as e,P as t,W as n,m as r,x as i,y as a}from"./WWTSD2Qb.js";import"./xihTtKlq.js";var o={title:`NBCL`},{title:s}=o,c=i(`<p>Node Based Configuration Language (NBCL) is configuration language with a twist. Rather than static configuration,
NBCL supports scripting in the language. It can produce both configuration and side-effects. It is built specifically
for the cases where scripting and configuration are both necessary, like the case with <a href="/projects/ewwii">ewwii</a>, as
trying to make a scripting language behave as a configuration language will increase the overall complexity for all users.</p> <p>Here is an example of the configuration aspect of the language:</p> <!> <p>And the scripting aspect:</p> <!> <p><strong>Links:</strong></p> <p><a href="https://github.com/nbcl-lang/nbcl" rel="nofollow">Github</a> | <a href="https://nbcl-lang.github.io" rel="nofollow">Website</a> | <a href="https://nbcl-lang.github.io/docs" rel="nofollow">Documentation</a> | <a href="https://nbcl-lang.github.io/playground" rel="nofollow">Playground</a></p>`,1);function l(i){var o=c(),s=e(t(o),4);r(s,()=>`<pre class="shiki shiki-themes catppuccin-latte dark-plus" style="background-color:#eff1f5;--shiki-dark-bg:#1E1E1E;color:#4c4f69;--shiki-dark:#D4D4D4" tabindex="0"><code><span class="line"><span>Node {</span></span>
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
<span class="line"><span>}</span></span></code></pre>`);var l=e(s,4);r(l,()=>`<pre class="shiki shiki-themes catppuccin-latte dark-plus" style="background-color:#eff1f5;--shiki-dark-bg:#1E1E1E;color:#4c4f69;--shiki-dark:#D4D4D4" tabindex="0"><code><span class="line"><span>import "other.nbcl" as other</span></span>
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
<span class="line"><span>print(map)</span></span></code></pre>`),n(4),a(i,o)}export{l as default,o as metadata};
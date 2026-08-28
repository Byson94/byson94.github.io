import{H as e,M as t,N as n,U as r,W as i,_ as a,f as o,y as s}from"./Bp67M862.js";import"./xihTtKlq.js";var c=i({default:()=>m,metadata:()=>l}),l={title:`Ideal Wayland Compositor`,date:`2026-07-12T00:00:00.000Z`,description:`The ideal wayland compositor from my dreams.`},{title:u,date:d,description:f}=l,p=s(`<p>Modern wayland compositors are very monolithic in nature. They combine both the compositor and the window manager into one.
And this does not leave any room for extensibility. But it does not have to be like that, the compositor and the window manager
should be split, which will allow one compositor to have a vast ecosystem.</p> <p>River is the compositor that solves this problem. But why not go one step further? Why decouple only the window manager
from the core? Why not go one step further and decouple the entire compositor? All compositors need constant updates
to keep up with modern wayland protocols, or add new features to satisfy the users. And a highly decoupled compositor
can just composite and let the comminity lead it however they want. And this my friend, is the ideal wayland compositor
in my point of view.</p> <h2>The Proposal</h2> <p>After a lot of brainstorming, I came up with the exact thing that makes the compositor of my dreams.</p> <h3>Fundamentals</h3> <ul><li>There should be no configuration file at all.</li> <li>Everything should be done via IPC and shell.</li> <li>Plugin system should be the biggest priority.</li> <li>Just Keep It Simple Stupid (KISS).</li> <li>Everything in pure C.</li></ul> <p>That should be the fundamentals of the compositor. Just enough to do one thing well.</p> <h3>Proposed IPC System</h3> <p>The user should be able to interact with the compositor using shell commands through the IPC.
Here is a simple system I could think of right now:</p> <pre class="language-bash"></pre> <p>The <code>--load</code> command loads the plugins <strong>into</strong> the compositor. Not just implementing some protocol that the compositor
supports. Just extend the core compositor entirely. <strong>Users will have maximum control that way.</strong></p> <h3>Plugin System</h3> <p>This must be the heart and soul of the compositor. There must be a <code>comp.h</code> file which plugins can use.
The plugins will then use the <code>comp.h</code> file to build a plugin and compile down to a <code>.so</code> file which
the compositor can load and execute freely.</p> <p>The benifit of having the compositor written in pure C is this, the plugin system. C ABI is completely stable.
Infact, C is the lingua franca language that every other languages use to communicate with each other. Because of this,
the compositor can just pass the whole whatever thing it has over to the plugin and just <strong>let it do whatever it wants.</strong></p> <h2>Conclusion</h2> <p>A plugin system is the solution to all problems. It lets the users extend something beyond what it was
originally built for. An architecture like that is pretty hard to beat under the ideal circumstances.</p>`,1);function m(i){var s=p(),c=n(t(s),18);o(c,()=>`<code class="language-bash"><span class="token shebang important">#!/bin/bash</span>

<span class="token comment"># Note: 'comp' stands for Compositor Name</span>

<span class="token comment"># Load plugins</span>
comp <span class="token parameter variable">--load</span> window-mgr
comp <span class="token parameter variable">--load</span> input

<span class="token comment"># Input handling</span>
comp <span class="token parameter variable">--msg</span> input <span class="token string">"Super+Return"</span> <span class="token string">"kitty"</span>
comp <span class="token parameter variable">--msg</span> input <span class="token string">"Super+Q"</span> <span class="token string">"comp --msg window-mgr close_active"</span></code>`,!0),r(c),e(12),a(i,s)}export{c as t};
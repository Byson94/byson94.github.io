document.querySelectorAll("pre > code").forEach((codeBlock) => {
  const pre = codeBlock.parentNode;
  
  if (pre.parentNode.classList?.contains("code-wrapper")) return;

  const wrapper = document.createElement("div");
  wrapper.className = "code-wrapper";
  
  pre.parentNode.insertBefore(wrapper, pre);
  wrapper.appendChild(pre);

  const button = document.createElement("button");
  button.className = "copy-btn";
  button.type = "button";
  button.innerText = "Copy";
  wrapper.appendChild(button);
});

function copyToClipboard(copyBtn, text) {
  navigator.clipboard.writeText(text).then(() => {
    copyBtn.innerText = "Copied!";
    setTimeout(() => (copyBtn.innerText = "Copy"), 2000);
  });
}

document.addEventListener("click", (e) => {
  if (!e.target.classList.contains("copy-btn")) return;

  const copyBtn = e.target;
  const wrapper = e.target.closest(".code-wrapper");
  const code = wrapper.querySelector("pre code");

  if (code) {
    copyToClipboard(copyBtn, code.innerText);
  }
});

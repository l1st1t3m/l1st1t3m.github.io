document.addEventListener("click", function(e) {

  if (e.target.tagName === "CODE" && 
      e.target.closest(".post-body") &&
      !e.target.closest("pre")) {

    const el = e.target;
    const text = el.innerText;

    function showCopied() {
      const original = el.innerText;
      el.classList.add("copied");
      el.innerText = "已复制";

      setTimeout(() => {
        el.innerText = original;
        el.classList.remove("copied");
      }, 1000);
    }

    // 优先用 clipboard API
    if (navigator.clipboard && window.isSecureContext) {

      navigator.clipboard.writeText(text)
        .then(showCopied)
        .catch(fallbackCopy);

    } else {
      fallbackCopy();
    }

    // 兼容方案（Safari / 权限拒绝）
    function fallbackCopy() {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      showCopied();
    }

  }

});
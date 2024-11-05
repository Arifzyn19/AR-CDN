document.getElementById("navbar-toggle").onclick = function () {
  const navbar = document.getElementById("mobile-menu");
  navbar.classList.toggle("hidden");
  navbar.style.maxHeight = navbar.classList.contains("hidden")
    ? null
    : navbar.scrollHeight + "px";
};

window.onscroll = function () {
  const header = document.getElementById("header");
  header.classList.toggle("bg-gray-900", window.scrollY > 50);
};

function createNotification(message) {
  const notification = document.createElement("div");
  notification.className =
    "notification bg-green-200 text-green-800 p-2 rounded mb-2";
  notification.textContent = message;
  document.getElementById("notification-container").appendChild(notification);
  setTimeout(() => {
    notification.remove();
  }, 3000);
}

document.addEventListener("DOMContentLoaded", function () {
  const languageDropdown = document.getElementById("language-dropdown");
  const codeBlocks = document.querySelectorAll(".code-block");

  languageDropdown.addEventListener("change", function () {
    const selectedLanguage = this.value;

    codeBlocks.forEach((block) => {
      block.classList.add("hidden");
    });

    const selectedCodeBlock = document.getElementById(
      `code-block-${selectedLanguage}`,
    );
    if (selectedCodeBlock) {
      selectedCodeBlock.classList.remove("hidden");
    }
  });
});

function copyToClipboard(button) {
  const codeBlock = button.previousElementSibling;
  const code = codeBlock.textContent;

  navigator.clipboard.writeText(code).then(() => {
    const originalText = button.innerHTML;
    button.innerHTML = '<i class="fas fa-check"></i> Copied!';
    setTimeout(() => {
      button.innerHTML = originalText;
    }, 2000);
  });
}

document.getElementById('navbar-toggle').onclick = function() {
  const navbar = document.getElementById('mobile-menu');
  navbar.classList.toggle('hidden');
  navbar.style.maxHeight = navbar.classList.contains('hidden') ? null : navbar.scrollHeight + 'px';
};

window.onscroll = function() {
  const header = document.getElementById('header');
  header.classList.toggle('bg-gray-900', window.scrollY > 50);
};

document.getElementById("chooseFile").addEventListener("click", (event) => {
  event.preventDefault();
  document.getElementById("input").click();
});

document.getElementById("input").addEventListener("change", async (event) => {
  const maxFileSize = 5 * 1024 * 1024;
  const file = event.target.files[0];

  if (file) {
    if (file.size > maxFileSize) {
      createNotification("Ukuran file melebihi batas maksimum 5MB.");
      document.getElementById("input").value = "";
      document.getElementById("uploading").style.display = "none";
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    document.getElementById("uploading").style.display = "block";

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        createNotification(result.error || "Terjadi kesalahan saat mengupload file.");
      } else {
        createNotification("File berhasil diupload.");
        window.location.href = `/data/${result.data.filename}`;
      }
    } catch (error) {
      console.error(error);
      createNotification("Gagal menghubungi server.");
    } finally {
      document.getElementById("uploading").style.display = "none";
    }
  }
});

const dropArea = document.getElementById("drop-area");
dropArea.addEventListener("dragover", (event) => {
  event.preventDefault();
  dropArea.classList.add("dragover");
});

dropArea.addEventListener("dragleave", () => {
  dropArea.classList.remove("dragover");
});

dropArea.addEventListener("drop", async (event) => {
  event.preventDefault();
  dropArea.classList.remove("dragover");
  const files = event.dataTransfer.files;

  if (files.length > 0) {
    const file = files[0];
    const maxFileSize = 5 * 1024 * 1024;

    if (file.size > maxFileSize) {
      createNotification("Ukuran file melebihi batas maksimum 5MB.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    document.getElementById("uploading").style.display = "block";

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        createNotification(result.error || "Terjadi kesalahan saat mengupload file.");
      } else {
        createNotification("File berhasil diupload.");
        window.location.href = `/data/${result.data.filename}`;
      }
    } catch (error) {
      console.error(error);
      createNotification("Gagal menghubungi server.");
    } finally {
      document.getElementById("uploading").style.display = "none";
    }
  }
});

function createNotification(message) {
  const notification = document.createElement('div');
  notification.className = 'notification bg-green-200 text-green-800 p-2 rounded mb-2';
  notification.textContent = message;
  document.getElementById('notification-container').appendChild(notification);
  setTimeout(() => {
    notification.remove();
  }, 3000);
}

function copyLink(url) {
  const textarea = document.createElement('textarea');
  textarea.value = url;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
  createNotification('Link telah berhasil disalin ke clipboard.');
}

function copyToClipboard(element) {
  var temp = document.createElement("textarea");
  temp.value = document.querySelector(element).textContent;
  document.body.appendChild(temp);
  temp.select();
  document.execCommand("copy");
  document.body.removeChild(temp);
  alert("Code copied to clipboard!");
}

// Handle language change
document.getElementById("language-dropdown").addEventListener("change", function() {
  var selectedLanguage = this.value;
  
  document.getElementById("code-block-curl").classList.add("hidden");
  document.getElementById("code-block-fetch").classList.add("hidden");
  document.getElementById("code-block-axios").classList.add("hidden");
  document.getElementById("code-block-python").classList.add("hidden");
  
  if (selectedLanguage === "curl") {
    document.getElementById("code-block-curl").classList.remove("hidden");
  } else if (selectedLanguage === "fetch") {
    document.getElementById("code-block-fetch").classList.remove("hidden");
  } else if (selectedLanguage === "axios") {
    document.getElementById("code-block-axios").classList.remove("hidden");
  } else if (selectedLanguage === "python") {
    document.getElementById("code-block-python").classList.remove("hidden");
  }
});
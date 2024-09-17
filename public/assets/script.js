const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const navLink = document.querySelectorAll(".nav-link");

// Toggle mobile menu
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

// Close mobile menu when a nav link is clicked
navLink.forEach((n) =>
  n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  }),
);

// Handle file selection and upload
document.getElementById("chooseFile").addEventListener("click", (event) => {
  event.preventDefault();
  document.getElementById("input").click();
});

document.getElementById("input").addEventListener("change", async (event) => {
  const maxFileSize = 5 * 1024 * 1024; // 5MB
  const file = event.target.files[0];

  if (file && file.size > maxFileSize) {
    createNotification("Ukuran file melebihi batas maksimum 5MB.");
    document.getElementById("input").value = "";
    document.getElementById("uploading").style.display = "none";
  } else if (file) {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        createNotification(
          result.error || "Terjadi kesalahan saat mengupload file.",
        );
        document.getElementById("uploading").style.display = "none";
      } else {
        createNotification("File berhasil diupload.");
        window.location.href = `/data/${result.data.filename}`;
      }
    } catch (error) {
      console.error(error);
      createNotification("Gagal menghubungi server.");
      document.getElementById("uploading").style.display = "none";
    }

    document.getElementById("uploading").style.display = "block";
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
    const maxFileSize = 5 * 1024 * 1024; // 5MB

    if (file.size > maxFileSize) {
      createNotification("Ukuran file melebihi batas maksimum 5MB.");
      document.getElementById("uploading").style.display = "none";
    } else {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        const result = await response.json();

        if (!response.ok) {
          createNotification(
            result.error || "Terjadi kesalahan saat mengupload file.",
          );
          document.getElementById("uploading").style.display = "none";
        } else {
          createNotification("File berhasil diupload.");
          window.location.href = `/data/${result.data.filename}`;
        }
      } catch (error) {
        console.error(error);
        createNotification("Gagal menghubungi server.");
        document.getElementById("uploading").style.display = "none";
      }

      document.getElementById("uploading").style.display = "block";
    }
  }
});

// Function to create and display notifications
function createNotification(message) {
  const notification = document.createElement("div");
  notification.className = "notification";
  notification.textContent = message;
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.display = "none";
  }, 3000);
}

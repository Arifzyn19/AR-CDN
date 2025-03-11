Dropzone.options.uploadDropzone = {
  paramName: "file",
  maxFilesize: 50,
  acceptedFiles: ".png,.jpg,.jpeg,.pdf,.mp3,.m4a,.mp4,.wav,.flac,.avi,.mkv",
  addRemoveLinks: true,
  dictRemoveFile: "Hapus",
  dictCancelUpload: "Batal",
  dictDefaultMessage: "",
  createImageThumbnails: true,
  thumbnailWidth: 140,
  thumbnailHeight: 140,

  init: function () {
    this.on("addedfile", function (file) {
      file.previewElement.querySelector(".dz-progress").style.opacity = 1;
    });

    this.on("success", async function (file, response) {
      console.log("File:", file);
      console.log("Response", response);

      file.previewElement.querySelector(".dz-progress").style.opacity = 0;

      const fileUrl = `/data/${response.data.filename}`;
      setTimeout(() => {
        window.location.href = fileUrl;
      }, 3000);
    });

    this.on("error", function (file, errorMessage) {
      console.error(errorMessage);
      showNotification(
        "error",
        typeof errorMessage === "string" ? errorMessage : "Upload failed",
      );

      setTimeout(() => {
        this.removeFile(file);
      }, 1000);
    });
  },
};

function showNotification(type, message) {
  const notification = document.createElement("div");
  notification.className = `fixed bottom-4 right-4 px-6 py-3 rounded-lg text-white transform transition-all duration-300 ease-out ${
    type === "success" ? "bg-green-500" : "bg-red-500"
  }`;

  notification.innerHTML = `
        <div class="flex items-center space-x-2">
            <span class="text-sm font-medium">${message}</span>
        </div>
    `;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.transform = "translateX(0)";
  }, 100);

  setTimeout(() => {
    notification.style.transform = "translateX(100%)";
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 3000);
}

function showToast(message, duration = 3000) {
  const toast = document.getElementById("toast");
  const toastMessage = document.getElementById("toast-message");

  toastMessage.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, duration);
}

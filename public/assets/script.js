const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const navLink = document.querySelectorAll(".nav-link");

hamburger.addEventListener("click", mobileMenu);

function mobileMenu() {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
}

navLink.forEach(n => n.addEventListener("click", closeMenu));

function closeMenu() {
  hamburger.classList.remove("active");
  navMenu.classList.remove("active");
}

document.getElementById('chooseFile').addEventListener('click', (event) => {
  event.preventDefault();
  document.getElementById('input').click();
});

document.getElementById('input').addEventListener('change', () => {
  document.getElementById('uploadForm').submit();
  document.getElementById('uploading').style.display = 'block';
});

const dropArea = document.getElementById('drop-area');
dropArea.addEventListener('dragover', (event) => {
  event.preventDefault();
  dropArea.classList.add('dragover');
});
dropArea.addEventListener('dragleave', () => {
  dropArea.classList.remove('dragover');
});
dropArea.addEventListener('drop', (event) => {
  event.preventDefault();
  dropArea.classList.remove('dragover');
  const files = event.dataTransfer.files;
  document.getElementById('input').files = files;
  document.getElementById('uploadForm').submit();
  document.getElementById('uploading').style.display = 'block';
});
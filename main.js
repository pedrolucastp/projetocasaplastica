document.addEventListener("DOMContentLoaded", () => {
  loadHTML("header", "header.html", initializeMenu);
  loadHTML("footer", "footer.html");

  function initializeMenu() {
    const menuToggle = document.getElementById("menu-toggle");
    const navMenu = document.querySelector(".nav-menu");
    const body = document.body;

    menuToggle.addEventListener("click", () => {
      navMenu.classList.toggle("open");
      body.classList.toggle("menu-open");
    });

    navMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("open");
        body.classList.remove("menu-open");
      });
    });
  }

  function loadHTML(elementID, filePath, callback) {
    const element = document.getElementById(elementID);
    fetch(filePath)
      .then((response) => response.text())
      .then((data) => {
        element.innerHTML = data;
        if (callback) callback(); // Execute the callback after content is loaded
      })
      .catch((error) => console.error("Erro ao carregar o arquivo:", error));
  }
});

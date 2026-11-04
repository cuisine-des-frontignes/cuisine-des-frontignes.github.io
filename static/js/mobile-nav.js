/*
 * Complément discret à slim.js : état ARIA et fermeture du menu.
 * Le menu et les recettes du site existant restent inchangés.
 */
(function () {
  "use strict";

  const button = document.querySelector(".nav-btn");
  const menu = document.querySelector(".nav-list");
  if (!button || !menu) return;

  menu.id = "navigation-rubriques";
  button.setAttribute("role", "button");
  button.setAttribute("aria-controls", menu.id);
  button.setAttribute("aria-expanded", "false");
  button.setAttribute("aria-label", "Afficher les rubriques");

  function sync() {
    const open = button.classList.contains("is-on");
    button.setAttribute("aria-expanded", String(open));
    button.setAttribute(
      "aria-label",
      open ? "Masquer les rubriques" : "Afficher les rubriques"
    );
  }

  // slim.js change la classe lors du clic ; synchroniser juste après.
  button.addEventListener("click", sync);

  // Un lien à rôle de bouton doit aussi réagir à la barre d'espace.
  button.addEventListener("keydown", function (event) {
    if (event.key === " ") {
      event.preventDefault();
      button.click();
    }
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && button.classList.contains("is-on")) {
      button.classList.remove("is-on");
      sync();
      button.focus();
    }
  });

  document.addEventListener("click", function (event) {
    if (!event.target.closest(".nav") && button.classList.contains("is-on")) {
      button.classList.remove("is-on");
      sync();
    }
  });
})();

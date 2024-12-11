document.addEventListener("DOMContentLoaded", () => {
  const app = document.getElementById("app");

  // Cargar una vista al iniciar la app
  loadView("home");

  // Manejar clics en el menú
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const view = e.target.getAttribute("href").split("/").pop().replace(".html", ""); // Obtén el nombre de la vista
      loadView(view);
    });
  });

  // Función para cargar vistas dinámicamente
  function loadView(viewName) {
    fetch(`views/${viewName}.html`) // Carga la vista desde la carpeta "views"
      .then((response) => {
        if (!response.ok) throw new Error("Vista no encontrada");
        return response.text();
      })
      .then((html) => {
        app.innerHTML = html;

        // Solo ejecutar lógica adicional si es la vista "api"
        if (viewName === "api") fetchAndDisplayGames();
      })
      .catch((error) => {
        app.innerHTML = `<p>Error al cargar la vista: ${error.message}</p>`;
      });
  }
});

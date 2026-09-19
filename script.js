(() => {
    "use strict";

    const menuButton = document.getElementById("menuButton");
    const siteMenu = document.getElementById("siteMenu");

    function closeMenu() {
        if (!menuButton || !siteMenu) return;
        menuButton.setAttribute("aria-expanded", "false");
        siteMenu.classList.remove("open");
    }

    if (menuButton && siteMenu) {
        menuButton.addEventListener("click", () => {
            const expanded = menuButton.getAttribute("aria-expanded") === "true";
            menuButton.setAttribute("aria-expanded", String(!expanded));
            siteMenu.classList.toggle("open", !expanded);
        });

        siteMenu.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", closeMenu);
        });

        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") closeMenu();
        });

        document.addEventListener("click", (event) => {
            if (!siteMenu.classList.contains("open")) return;
            if (!siteMenu.contains(event.target) && !menuButton.contains(event.target)) {
                closeMenu();
            }
        });
    }

    const year = document.getElementById("year");
    if (year) year.textContent = new Date().getFullYear();

    const markdownTarget = document.querySelector("[data-markdown]");
    if (markdownTarget) {
        const source = markdownTarget.getAttribute("data-markdown");

        fetch(source)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Failed to load ${source}: ${response.status}`);
                }
                return response.text();
            })
            .then((markdown) => {
                if (typeof marked === "undefined") {
                    throw new Error("marked.js is unavailable.");
                }
                markdownTarget.innerHTML = marked.parse(markdown);
            })
            .catch((error) => {
                console.error(error);
                markdownTarget.innerHTML = "<p>Unable to load this document.</p>";
            });
    }
})();



document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;
    const themeToggle = document.getElementById("themeToggle");
    const themeIcon = themeToggle.querySelector("i");
    const currentYear = document.getElementById("currentYear");
    const contactForm = document.getElementById("contactForm");
    const formFeedback = document.getElementById("formFeedback");

   
    currentYear.textContent = new Date().getFullYear();


    const savedTheme = localStorage.getItem("esther-portfolio-theme");

    if (savedTheme === "dark") {
        body.classList.add("dark-mode");
        updateThemeButton(true);
    }

  
    themeToggle.addEventListener("click", () => {
        const isDark = body.classList.toggle("dark-mode");

        localStorage.setItem(
            "esther-portfolio-theme",
            isDark ? "dark" : "light"
        );

        updateThemeButton(isDark);
    });

    function updateThemeButton(isDark) {
        themeIcon.className = isDark
            ? "bi bi-sun"
            : "bi bi-moon-stars";

        themeToggle.setAttribute(
            "aria-label",
            isDark ? "Ativar modo claro" : "Ativar modo escuro"
        );

        themeToggle.setAttribute(
            "title",
            isDark ? "Ativar modo claro" : "Ativar modo escuro"
        );
    }


    document.querySelectorAll("#mainNav .nav-link").forEach((link) => {
        link.addEventListener("click", () => {
            const nav = document.getElementById("mainNav");

            if (nav.classList.contains("show")) {
                bootstrap.Collapse.getOrCreateInstance(nav).hide();
            }
        });
    });


    const revealElements = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.12
        });

        revealElements.forEach((element) => observer.observe(element));
    } else {
        revealElements.forEach((element) => {
            element.classList.add("is-visible");
        });
    }


    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();
        event.stopPropagation();

        formFeedback.textContent = "";

        if (!contactForm.checkValidity()) {
            contactForm.classList.add("was-validated");
            formFeedback.textContent =
                "Confira os campos destacados e tente novamente.";
            return;
        }

        const name = document.getElementById("name").value.trim();

        formFeedback.textContent =
            `Obrigada, ${name}! Os campos foram validados. ` +
            "Para enviar mensagens de verdade, é necessário conectar " +
            "o formulário a um serviço ou backend.";

        contactForm.reset();
        contactForm.classList.remove("was-validated");
    });
});

// =========================================================
// PORTFÓLIO ARIANY PANTALEÃO
// Interações do portfólio
// =========================================================

document.addEventListener("DOMContentLoaded", () => {

    // Elementos que serão revelados durante a rolagem
    const elementos = document.querySelectorAll(
        ".section, .project-card, .tech-card, .contact-section"
    );

    // Estado inicial
    elementos.forEach((elemento) => {
        elemento.style.opacity = "0";
        elemento.style.transform = "translateY(25px)";
        elemento.style.transition =
            "opacity 0.7s ease, transform 0.7s ease";
    });

    // Observa quando os elementos entram na tela
    const observador = new IntersectionObserver(
        (entradas, observer) => {

            entradas.forEach((entrada) => {

                if (entrada.isIntersecting) {

                    entrada.target.style.opacity = "1";
                    entrada.target.style.transform =
                        "translateY(0)";

                    observer.unobserve(entrada.target);
                }

            });

        },
        {
            threshold: 0.12
        }
    );

    elementos.forEach((elemento) => {
        observador.observe(elemento);
    });


    // =====================================================
    // Navegação suave
    // =====================================================

    const links = document.querySelectorAll(
        'a[href^="#"]'
    );

    links.forEach((link) => {

        link.addEventListener("click", (evento) => {

            const destino = link.getAttribute("href");

            if (destino === "#") {
                return;
            }

            const elementoDestino =
                document.querySelector(destino);

            if (elementoDestino) {

                evento.preventDefault();

                elementoDestino.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    });

});

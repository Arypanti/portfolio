document.addEventListener("DOMContentLoaded", () => {
  // Elementos principais
  const startBtn = document.getElementById("startBtn");
  const cover = document.getElementById("bookCover");
  const book = document.getElementById("book");
  const music = document.getElementById("bg-music");
  const toggleBtn = document.getElementById("toggleMusic");

  // Abrir o livro com animação
  startBtn.addEventListener("click", () => {
    cover.classList.add("turn");
    setTimeout(() => {
      cover.style.display = "none";
      book.style.display = "block";
      try {
        music.play();
      } catch (e) {
        console.warn("Falha ao iniciar música:", e);
      }
    }, 1000);
  });

  // Alternar música de fundo
  toggleBtn.addEventListener("click", () => {
    if (music.paused) {
      music.play();
      toggleBtn.textContent = "🔊 Pausar Música";
    } else {
      music.pause();
      toggleBtn.textContent = "▶️ Tocar Música";
    }
  });

  // Navegar entre capítulos com transição suave
  window.mostrarPagina = function(id) {
    const paginas = document.querySelectorAll('.pagina');
    paginas.forEach(p => {
      p.classList.remove('ativa');
      p.style.opacity = 0;
    });
    const alvo = document.getElementById(id);
    if (alvo) {
      alvo.classList.add('ativa');
      setTimeout(() => {
        alvo.style.opacity = 1;
      }, 50);
    }
  };

  // Virar cartas ao clicar
  document.querySelectorAll('.carta-container').forEach(container => {
    container.addEventListener('click', () => {
      container.classList.toggle('virada');
    });
  });
});


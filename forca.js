const palavras = ["ELYNDRA", "KAEL", "MALRIK", "NYSSA", "SERAPHINE", "THORNE", "VIRELLA" , "VAMPIRO", ];
let palavraSecreta = "";
let palavraAdivinhada = [];
let erros = 0;
const maxErros = 6;

const palavraEl = document.getElementById("palavra");
const tecladoEl = document.getElementById("teclado");
const errosEl = document.getElementById("erros");
const mensagemEl = document.getElementById("mensagem");
const canvas = document.getElementById("forca");
const ctx = canvas.getContext("2d");
const btnReiniciar = document.getElementById("reiniciar");

function iniciarJogo() {
  palavraSecreta = palavras[Math.floor(Math.random() * palavras.length)];
  palavraAdivinhada = Array(palavraSecreta.length).fill("_");
  erros = 0;
  atualizarTela();
  desenharForca();
  criarTeclado();
  mensagemEl.textContent = "";
}

function atualizarTela() {
  palavraEl.textContent = palavraAdivinhada.join(" ");
  errosEl.textContent = `Erros: ${erros} / ${maxErros}`;
}

function criarTeclado() {
  tecladoEl.innerHTML = "";
  const alfabeto = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  alfabeto.forEach(letra => {
    const btn = document.createElement("button");
    btn.textContent = letra;
    btn.onclick = () => escolherLetra(letra, btn);
    tecladoEl.appendChild(btn);
  });
}

function escolherLetra(letra, btn) {
  btn.disabled = true;
  if (palavraSecreta.includes(letra)) {
    palavraSecreta.split("").forEach((l, i) => {
      if (l === letra) palavraAdivinhada[i] = letra;
    });
  } else {
    erros++;
    desenharBoneco(erros);
  }
  verificarFim();
  atualizarTela();
}

function verificarFim() {
  if (!palavraAdivinhada.includes("_")) {
    mensagemEl.textContent = "🎉 Você venceu!";
    desabilitarTeclado();
  } else if (erros >= maxErros) {
    mensagemEl.textContent = `💀 Você perdeu! A palavra era: ${palavraSecreta}`;
    desabilitarTeclado();
  }
}

function desabilitarTeclado() {
  const botoes = tecladoEl.querySelectorAll("button");
  botoes.forEach(b => (b.disabled = true));
}

function desenharForca() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.lineWidth = 3;
  ctx.strokeStyle = "#fff";
  ctx.beginPath();
  ctx.moveTo(10, 240);
  ctx.lineTo(190, 240);
  ctx.moveTo(50, 240);
  ctx.lineTo(50, 20);
  ctx.lineTo(150, 20);
  ctx.lineTo(150, 40);
  ctx.stroke();
}

function desenharBoneco(passo) {
  ctx.strokeStyle = ["red", "orange", "yellow", "green", "blue", "purple"][passo - 1] || "white";
  switch (passo) {
    case 1: ctx.beginPath(); ctx.arc(150, 60, 20, 0, Math.PI * 2); ctx.stroke(); break; // cabeça
    case 2: ctx.beginPath(); ctx.moveTo(150, 80); ctx.lineTo(150, 140); ctx.stroke(); break; // corpo
    case 3: ctx.beginPath(); ctx.moveTo(150, 100); ctx.lineTo(120, 120); ctx.stroke(); break; // braço esq
    case 4: ctx.beginPath(); ctx.moveTo(150, 100); ctx.lineTo(180, 120); ctx.stroke(); break; // braço dir
    case 5: ctx.beginPath(); ctx.moveTo(150, 140); ctx.lineTo(120, 180); ctx.stroke(); break; // perna esq
    case 6: ctx.beginPath(); ctx.moveTo(150, 140); ctx.lineTo(180, 180); ctx.stroke(); break; // perna dir
  }
}

btnReiniciar.addEventListener("click", iniciarJogo);

iniciarJogo();


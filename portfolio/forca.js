// =========================================================
// JOGO DA FORCA
// Projeto 04 — JavaScript
// =========================================================

const words = [
    "PYTHON",
    "KOTLIN",
    "JAVASCRIPT",
    "HTML",
    "CSS",
    "ANDROID",
    "FIREBASE",
    "NODEJS",
    "CODIGO",
    "PROGRAMACAO",
    "TECNOLOGIA"
];


let selectedWord;

let guessedLetters = [];

let mistakes = 0;

const maxMistakes = 6;


// =========================================================
// ELEMENTOS DA PÁGINA
// =========================================================

const wordElement =
    document.getElementById("word");

const keyboardElement =
    document.getElementById("keyboard");

const attemptsElement =
    document.getElementById("attempts");

const messageElement =
    document.getElementById("message");

const restartButton =
    document.getElementById("restart");

const parts =
    document.querySelectorAll(".part");


// =========================================================
// INICIAR JOGO
// =========================================================

function startGame() {

    selectedWord =
        words[
            Math.floor(
                Math.random() * words.length
            )
        ];

    guessedLetters = [];

    mistakes = 0;

    messageElement.textContent = "";

    attemptsElement.textContent =
        maxMistakes;

    parts.forEach(part => {

        part.style.display = "none";

    });

    createKeyboard();

    updateWord();
}


// =========================================================
// ATUALIZAR PALAVRA
// =========================================================

function updateWord() {

    wordElement.innerHTML = "";

    selectedWord
        .split("")
        .forEach(letter => {

            const element =
                document.createElement("div");

            element.classList.add("letter");

            if (
                guessedLetters.includes(letter)
            ) {

                element.textContent = letter;

            } else {

                element.textContent = "";

            }

            wordElement.appendChild(element);

        });


    checkWin();
}


// =========================================================
// CRIAR TECLADO
// =========================================================

function createKeyboard() {

    keyboardElement.innerHTML = "";

    const alphabet =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    alphabet
        .split("")
        .forEach(letter => {

            const button =
                document.createElement("button");

            button.textContent = letter;

            button.classList.add("key");

            button.addEventListener(
                "click",
                () => guessLetter(letter)
            );

            keyboardElement.appendChild(button);

        });
}


// =========================================================
// TENTAR UMA LETRA
// =========================================================

function guessLetter(letter) {

    if (
        guessedLetters.includes(letter) ||
        mistakes >= maxMistakes
    ) {

        return;

    }


    guessedLetters.push(letter);


    const buttons =
        document.querySelectorAll(".key");

    buttons.forEach(button => {

        if (
            button.textContent === letter
        ) {

            button.disabled = true;

        }

    });


    if (
        selectedWord.includes(letter)
    ) {

        updateWord();

    } else {

        mistakes++;

        attemptsElement.textContent =
            maxMistakes - mistakes;

        drawPart();

        checkLose();

    }

}


// =========================================================
// DESENHAR PARTE DA FORCA
// =========================================================

function drawPart() {

    if (parts[mistakes - 1]) {

        parts[
            mistakes - 1
        ].style.display = "block";

    }

}


// =========================================================
// VERIFICAR VITÓRIA
// =========================================================

function checkWin() {

    const won =
        selectedWord
            .split("")
            .every(
                letter =>
                    guessedLetters.includes(letter)
            );

    if (won) {

        messageElement.textContent =
            "🎉 Você venceu! Parabéns!";

        disableKeyboard();

    }

}


// =========================================================
// VERIFICAR DERROTA
// =========================================================

function checkLose() {

    if (mistakes >= maxMistakes) {

        messageElement.textContent =
            `😵 Fim de jogo! A palavra era: ${selectedWord}`;

        disableKeyboard();

    }

}


// =========================================================
// DESABILITAR TECLADO
// =========================================================

function disableKeyboard() {

    document
        .querySelectorAll(".key")
        .forEach(button => {

            button.disabled = true;

        });

}


// =========================================================
// JOGAR NOVAMENTE
// =========================================================

restartButton.addEventListener(
    "click",
    startGame
);


// =========================================================
// TECLADO FÍSICO
// =========================================================

document.addEventListener(
    "keydown",
    event => {

        const letter =
            event.key.toUpperCase();

        if (
            /^[A-Z]$/.test(letter)
        ) {

            guessLetter(letter);

        }

    }
);


// =========================================================
// INICIAR
// =========================================================

startGame();
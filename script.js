const cartas = [
    "A", "A",
    "B", "B",
    "C", "C",
    "D", "D",
    "E", "E",
    "F", "F",
    "G", "G",
    "H", "H"
];

let cartasViradas = [];
let paresEncontrados = 0;

// Função para embaralhar as cartas
function embaralhar(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Função para iniciar o jogo
function iniciarJogo() {
    embaralhar(cartas);
    const tabuleiro = document.getElementById("tabuleiro");
    tabuleiro.innerHTML = ""; // Limpar o tabuleiro
    paresEncontrados = 0; // Resetar contagem de pares

    cartas.forEach((carta, index) => {
        const divCarta = document.createElement("div");
        divCarta.classList.add("carta");
        divCarta.setAttribute("data-valor", carta);
        divCarta.setAttribute("data-index", index);
        divCarta.addEventListener("click", virarCarta);
        tabuleiro.appendChild(divCarta);
    });

    document.getElementById("resultado").textContent = "Encontre todos os pares!";
}

// Função para virar a carta
function virarCarta() {
    if (cartasViradas.length < 2) {
        const cartaAtual = this;
        cartaAtual.textContent = cartaAtual.getAttribute("data-valor");
        cartaAtual.classList.add("virada");
        cartasViradas.push(cartaAtual);

        if (cartasViradas.length === 2) {
            setTimeout(verificarPares, 1000);
        }
    }
}

// Função para verificar se as cartas viradas são iguais
function verificarPares() {
    const [carta1, carta2] = cartasViradas;

    if (carta1.getAttribute("data-valor") === carta2.getAttribute("data-valor")) {
        paresEncontrados++;
        if (paresEncontrados === cartas.length / 2) {
            document.getElementById("resultado").textContent = "Parabéns! Você encontrou todos os pares!";
        }
    } else {
        carta1.textContent = "";
        carta1.classList.remove("virada");
        carta2.textContent = "";
        carta2.classList.remove("virada");
    }

    cartasViradas = []; // Resetar cartas viradas
}

// Iniciar o jogo ao carregar a página
window.onload = iniciarJogo;
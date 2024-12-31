const btn = document.querySelector('.talk');
const content = document.querySelector('.content');
const image = document.querySelector('.main .image-container .image img');

function speak(text) {
    const text_speak = new SpeechSynthesisUtterance(text);

    text_speak.lang = "pt-BR";  
    text_speak.rate = 1;
    text_speak.volume = 1;
    text_speak.pitch = 1;

    window.speechSynthesis.speak(text_speak);
}

function wishMe() {
    var day = new Date();
    var hour = day.getHours();

    if (hour >= 0 && hour < 12) {
        speak("Bom dia, bruna...");
    } else if (hour >= 12 && hour < 17) {
        speak("Boa tarde, bruna...");
    } else {
        speak("Boa noite, bruna...");
    }
}

window.addEventListener('load', () => {
    speak("Inicializando chat ...");
    wishMe();
});

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.lang = 'pt-BR';  

recognition.onresult = (event) => {
    const currentIndex = event.resultIndex;
    const transcript = event.results[currentIndex][0].transcript;
    content.textContent = transcript;
    takeCommand(transcript.toLowerCase());
};

btn.addEventListener('click', () => {
    content.textContent = "Ouvindo...";
    recognition.start();
    moveImage(); // Função para mover a imagem ao começar a ouvir
});

function moveImage() {
    image.classList.add("move");  // Adiciona a classe 'move' à imagem
    setTimeout(() => {
        image.classList.remove("move"); // Remove a classe 'move' após a animação
    }, 3000); // A animação dura 3 segundos
}

function takeCommand(message) {
    if (message.includes('olá') || message.includes('oi')) {
        speak("Olá, como posso ajudar?");
    } else if (message.includes("abrir google")) {
        window.open("https://google.com", "_blank");
        speak("Abrindo o Google...");
    } else if (message.includes("abrir youtube")) {
        window.open("https://youtube.com", "_blank");
        speak("Abrindo o Youtube...");
    } else if (message.includes("abrir facebook")) {
        window.open("https://facebook.com", "_blank");
        speak("Abrindo o Facebook...");
    } else if (message.includes('o que é') || message.includes('quem é') || message.includes('o que são')) {
        window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
        const finalText = "Isso que encontrei na internet sobre " + message;
        speak(finalText);
    } else if (message.includes('wikipedia')) {
        window.open(`https://pt.wikipedia.org/wiki/${message.replace("wikipedia", "").trim()}`, "_blank");
        const finalText = "Isso que encontrei na Wikipedia sobre " + message;
        speak(finalText);
    } else if (message.includes('hora')) {
        const time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" });
        const finalText = "A hora atual é " + time;
        speak(finalText);
    } else if (message.includes('data')) {
        const date = new Date().toLocaleString(undefined, { month: "short", day: "numeric" });
        const finalText = "A data de hoje é " + date;
        speak(finalText);
    } else if (message.includes('calculadora')) {
        window.open('Calculator:///');
        const finalText = "Abrindo a Calculadora";
        speak(finalText);
    } else {
        window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
        const finalText = "Encontrei algumas informações sobre " + message + " no Google";
        speak(finalText);
    }
}

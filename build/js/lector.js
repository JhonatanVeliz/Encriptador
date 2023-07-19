const texto = document.querySelector('#result');
const btnReproducir = document.querySelector('#reproducir');

function reproducir(text){
    const read = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(read);
}

btnReproducir.addEventListener('click', ()=> reproducir(texto.innerText));
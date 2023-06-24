// obteniendo los valores de los botones y el formulario con su input HTML
    const formulario = document.querySelector('#form'),
        message = formulario.querySelector('#texto'),
        encriptar = document.querySelector('#encriptar'),
        desencriptarBtn = document.querySelector('#desencriptar');
 
// BOTON DE COPY
const copy = document.querySelector('#copy');
//    valores de los divs html
const asidePincipal = document.querySelector('#aside-principal'),
      asideSecundary = document.querySelector('#aside-secundary'),
      btnDelete = asideSecundary.querySelector('#delete'),
      paragraphAside = document.querySelector('#result');

// MENSAJE DE ALERTA
const messageAlert = document.querySelector('#title');

const dicAlura = {
    a : 'ai',
    e : 'enter',
    i : 'imes',
    o : 'ober',
    u : 'ufat'
};

const dicReverse = {
    ai    : 'a',
    enter : 'e',
    imes  : 'i',
    ober  : '0',
    ufat  : 'u'
};
// FUNCION QUE ENCRIPTA, AL DAR CLICK AL BTN O UN ENTER, EL TEXTO PASA A SER MINUSCULAS Y LUEGO CON EL METODO REPLACE SE VERIFICA CON EXPRESIONES REGULARES SI EN EL STRING HAY IGUALDAD PARA QUE ESTE SEA REMPLAZADO.

const encriptarMessage = ()=>{

    const messageValue = message.value.toLowerCase();

    let valorFinal = messageValue
                        .replace(/e/gi, "enter")
                        .replace(/i/gi, "imes")
                        .replace(/a/gi, "ai")
                        .replace(/o/gi, "ober")
                        .replace(/u/gi, "ufat");

    if(messageValue !== '' && isNaN(messageValue)){
        asidePincipal.classList.add('aside__container--oculto');
        paragraphAside.textContent = valorFinal;
        inputReset();
        asideSecundary.classList.add('aside__result--activo');
        grow();
    }else{
        alerta();
    }
}

// Funcion que resetea el input
const inputReset = ()=>{
    formulario.reset();
}

// FUNCION GROW
const grow = ()=>{

    setTimeout( ()=>{
        desencriptarBtn.classList.add('btn-secundary--active')
    },500);

    setTimeout( ()=>{
        desencriptarBtn.classList.remove('btn-secundary--active');
    }, 1800);

}

const alerta = ()=>{
    messageAlert.classList.add('aside__alert');
    setTimeout( ()=> {
        messageAlert.classList.remove('aside__alert');
    },1650)
}

const desencriptar = ()=>{
    
    const valorFinal = paragraphAside.textContent
                                .replace(/enter/gi, "e")
                                .replace(/imes/gi, "i")
                                .replace(/ai/gi, "a")
                                .replace(/ober/gi, "o")
                                .replace(/ufat/gi, "u");

    paragraphAside.textContent = valorFinal;
}

const funcCopy = ()=>{
    copy.classList.add('copy--active');

    setTimeout( ()=>{
        copy.classList.remove('copy--active');
    }, 1100)

    navigator.clipboard.writeText(paragraphAside.textContent);
}

//  Boton de encriptar

encriptar.addEventListener('click', encriptarMessage);

window.addEventListener('keydown', (e)=>{

    if(e.keyCode === 13 && message.value !== ""){
        encriptarMessage();
    }else if(e.keyCode === 13 && message.value == ""){
        alerta();
    }
});

// PREVENIR EL FUNCIONAMIENTO DEL FORMULARIO
formulario.addEventListener('submit', (e)=>{
    e.preventDefault();
})

desencriptarBtn.addEventListener('click', desencriptar);

copy.addEventListener('click', funcCopy);

btnDelete.addEventListener('click', ()=>{
    asidePincipal.classList.remove('aside__container--oculto');
    asideSecundary.classList.remove('aside__result--activo');
    inputReset();
})
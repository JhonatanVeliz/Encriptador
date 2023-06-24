const $ = (element, nodo = document.body)=> nodo.querySelector(element);

const userDic = $('#file');
userDic.value = '';
const userDicName = $('#file-info');

const defaultAluraDic = {
    a : 'ai',
    e : 'enter',
    i : 'imes',
    o : 'ober',
    u : 'ufat'
};

const pojoReverse = pojo => Object.keys(pojo).reduce((acm, key) => {
    acm[pojo[key]] = key;
    return acm;
}, {});

let dictionary = null; 
let dictionaryReverse = null;

// Diccionario Listo para usar
function fileDic(target){
    try {
        dictionary = JSON.parse(target);
    } catch (error) {
        dicExample();
    }
}

// Verificiacion del userDic
userDic.addEventListener('change', (e)=>{
    const file = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsText(file);
    fileReader.addEventListener('load', (e)=>{
        userDicName.innerText = file.name;
        userDicName.classList.toggle('visible');
        fileDic(e.target.result);
    })
})

// Funcion donde verifica que Diccionario se va a utilizar
const pojo = ()=>{
    if(userDicName.textContent.length === 0){
        dictionary = defaultAluraDic;
    }
    dictionaryReverse = pojoReverse(dictionary);
    return rexifyKeys(dictionary);
};
pojo();
// Funcion que genera la REGEX
function rexifyKeys(dic){
    const joinedKeys = Object.keys(dic).join('|');

    return new RegExp(joinedKeys, 'gi');
}

// Elementos del DOM
const form = $('#form'),
      text = $('#texto');

const btnEncriptar    = $('#encriptar'),
      btnDesencriptar = $('#desencriptar');

const titleAlerta = $('#title');

const showMuneco = $('#aside-principal');
const containerResult = $('#aside-secundary');
const paragraphResult = $('#result');

const btnClear = $('#delete');
const btnCopy  = $('#copy');

const imgDictionary = $('#img');
const modalDictionary = $('#modalWarning');
const btnCerrarDicExample = $('#cerrarWarning');

// Animacion del boton desencriptar
const animationDesencriptar = ()=>{
    setTimeout( ()=>{
        btnDesencriptar.classList.add('btn-secundary--active')
    },500);

    setTimeout( ()=>{
        btnDesencriptar.classList.remove('btn-secundary--active');
    }, 1800);

}
// Funcion de alerta por si el texto no se puede encriptar
const alerta = ()=>{
    titleAlerta.classList.add('aside__alert');
    setTimeout( ()=> {
        titleAlerta.classList.remove('aside__alert');
    },1650)
    return 'Ninguna palabra para encriptar';
}
// Funcion de resultado correcto
const showResult = ()=>{
    showMuneco.classList.add('aside__container--oculto');
    containerResult.classList.add('aside__result--activo');
}

// Funcion que Valida el texto y lo compara con la REGEX
const stringValidation = ()=>{
    const textoIncial = text.value.toLowerCase();
    const textoFinal = ((textoIncial === '' || !isNaN(textoIncial)) ? alerta() : textoIncial.replace(pojo(), function (match) {
        animationDesencriptar();
        showResult();
        form.reset();
        return dictionary[match];
    }));
    paragraphResult.textContent = textoFinal;
}
// Funcion que elimina el resultado
const clearResult = ()=>{
    paragraphResult.textContent = '';
    showMuneco.classList.remove('aside__container--oculto');
    containerResult.classList.remove('aside__result--activo');
}
// Funcion que copia el texto del resultado
const fCopy = ()=>{
    copy.classList.add('copy--active');

    setTimeout( ()=>{
        copy.classList.remove('copy--active');
    }, 1100)

    navigator.clipboard.writeText(paragraphResult.textContent);
}
// Funcion que mustra el ejemplo del Diccionario
const dicExample = ()=>{
    modalDictionary.classList.toggle('warning--activo');
};

const stringValidationReverse = ()=>{
    const texto = paragraphResult.textContent;
    showResult()
    if(text.value === ''){
        const textoResult = texto.replace(rexifyKeys(dictionaryReverse), function (match) {
            return dictionaryReverse[match];
        });
        paragraphResult.textContent = textoResult;
    }else{
        const textoResult = text.value.replace(rexifyKeys(dictionaryReverse), function (match) {
            return dictionaryReverse[match];
        });
        paragraphResult.textContent = textoResult;
    }
};

// Cambiar la imagen en cierto tamaño de la pantalla
(function(){
    if(window.screen.width <= 480){
        imgDictionary.src = './build/assets/example-movil.JPG';
    }
})();


// Prevencion del evento submit en el formulario
form.addEventListener('submit', (e)=>{
    e.preventDefault();
})
btnEncriptar.addEventListener('click', stringValidation);
btnDesencriptar.addEventListener('click', stringValidationReverse);
btnClear.addEventListener('click', clearResult);
btnCopy.addEventListener('click', fCopy);
btnCerrarDicExample.addEventListener('click', dicExample);
userDic.addEventListener('click', dicExample);
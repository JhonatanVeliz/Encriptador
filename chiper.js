const $ = (element, nodo = document.body)=> nodo.querySelector(element);

const defaultAluraDic = {
    a : 'ai',
    e : 'enter',
    i : 'imes',
    o : 'ober',
    u : 'ufat'
};

const userDic = $('#file');
userDic.value = '';
const userDicName = $('#file-info');


const pojoReverse = pojo => Object.keys(pojo).reduce((acm, key) => {
    acm[pojo[key]] = key;
    return acm;
}, {});

let dictionary = { ...defaultAluraDic}; 
let dictionaryReverse = null;

// Diccionario Listo para usar
function fileDic(target){
    try {
        dictionary = JSON.parse(target);
    } catch (error) {
        dicExample();
    }
}

// Aparicion y desaparicion del boton del UserDicName
const userDicNameRemoveAdd = (bolean, _text = '')=>{
    if(bolean){
        userDicName.classList.add('visible');
    }else{
        userDicName.classList.remove('visible');
        dictionary = { ...defaultAluraDic};
    }
    userDicName.innerText = _text;
}

// Verificiacion del userDic
userDic.addEventListener('change', (e)=>{
    const file = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsText(file);
    fileReader.addEventListener('load', (e)=>{
        userDicNameRemoveAdd(true, file.name);
        fileDic(e.target.result);
    })
})

// Funcion donde verifica que Diccionario se va a utilizar
const pojo = ()=>{
    dictionaryReverse = pojoReverse(dictionary);
    return rexifyKeys(dictionary);
};

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

const modalDictionary = $('#modalWarning');
const contentCreateDic = $('.warning__content');

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
    btnCopy.classList.add('copy--active');

    setTimeout( ()=>{
        btnCopy.classList.remove('copy--active');
    }, 1100)

    navigator.clipboard.writeText(paragraphResult.textContent);
}
// Funcion que mustra el ejemplo del Diccionario
const dicExample = ()=>{
    modalDictionary.classList.toggle('warning--activo');
};

const stringValidationReverse = ()=>{
    const texto = paragraphResult.textContent;    
    try {
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
    } catch (error) {
        paragraphResult.textContent = 'No hay nada para desencriptar';
    }

};

// Funcion que remplaza el contenido para crear un nuevo Dic
const createDic = (bolean)=>{
    if(!bolean){
        contentCreateDic.innerHTML = `
        <p class="warning__text">Recuerda que solo se admiten archivos .txt y que el diccionario sea similar al de la imagen</p>
            <div class="warning__img"><img src="${(window.screen.width <= 480) ? './build/assets/example-movil.JPG' : './build/assets/example.JPG'}" alt="modelo del diccionario a seguir" id="img"></div>
            <div class="warning__btns">
                <button class="warning__btn warning__btn--red" onclick="dicExample()">Aceptar</button>
                <button class="warning__btn warning__btn--blue" id="crearDic" onclick="createDic(true)">Crear uno nuevo</button>
            </div>
        `
    }else{
        contentCreateDic.innerHTML = `
        <div class="dicContent">
            <input type="text" class="inputDic" value='{ "a": "remplazo", "e": "remplazo", "i": "remplazo", "o": "remplazo", "u": "remplazo" }'>
            <div class="warning__btns">
                <button class="warning__btn warning__btn--red" onclick="crearNewDic()">Aceptar</button>
                <button class="warning__btn warning__btn--blue" onclick="deleteNewDic()"">Cancelar</button>
            </div>
        </div>
        `;
    };
}
createDic(false);
const removeClassNewDic = ()=>{
    const parentNodeContent = contentCreateDic.parentNode;
    parentNodeContent.classList.toggle('warning--activo');
}

const crearNewDic = ()=>{
    const textoNewDic = $('.inputDic').value;
    dictionary = JSON.parse(textoNewDic);
    removeClassNewDic();
    createDic(false);
}

const deleteNewDic = ()=>{
    removeClassNewDic();
    createDic(false);
}

// Prevencion del evento submit en el formulario
form.addEventListener('submit', (e)=>{
    e.preventDefault();
})

btnEncriptar.addEventListener('click', stringValidation);
btnDesencriptar.addEventListener('click', stringValidationReverse);
btnClear.addEventListener('click', clearResult);
btnCopy.addEventListener('click', fCopy);
userDic.addEventListener('click', dicExample);
userDicName.addEventListener('click', ()=>{
    userDicNameRemoveAdd(false);
});
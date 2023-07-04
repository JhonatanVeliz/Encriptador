import { $ } from "./src/js/export.js";

// Diccionarios
const defaultAluraDic = {
    a: 'ai',
    e: 'enter',
    i: 'imes',
    o: 'over',
    u: 'utaf',
};
// DOM ELEMENTS  ----------------------------------------------------------------
const dicUsuario = $('#file');
const nameFile = $('#fileName');
dicUsuario.value = '';

dicUsuario.addEventListener('change', (e)=>{

    const file = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsText(file);

    fileReader.addEventListener('load', (e)=>{
        crearNombreArchivo(file.name);
        diccionario = JSON.parse(e.target.result);
    })
});

// cree la funcion para crear un div que contiene el nombre del archivo para que el usuario lo visualice y agrege un eventListener para que se elimine el mismo y vacie el input file
function crearNombreArchivo(name) {
    nameFile.innerText = `${name}`;
    nameFile.classList.remove('display-none');
}
nameFile.addEventListener('click', ()=>{
    nameFile.innerText = '';
    nameFile.classList.add('display-none');
    dicUsuario.value = '';
})

// Funcion que revierte el diccionario
function revierteDic(dic) {
    return Object.keys(dic).reduce( (acm, key)=>{
        acm[dic[key]] = key;
        return acm;
    }, {})
}

let diccionario = { ...defaultAluraDic };
let dicRevertido = revierteDic(diccionario);

function asignaDicRevertido(dic) {
    dicRevertido = revierteDic(dic);
}

// DOM ELEMENTS INPUT Y RESULTADOS -------------------------------------------------
const textoEntrada = $('#texto');
const textoSalida  = $('#textoSalida');

const muneco = $('#muneco');
const resultado = $('#resultado');

const encriptar = $('#encriptar');
const desencriptar = $('#desencriptar');

const limpiarResultadoBtn = $('#limpiar');

// REGEX PARA NUMEROS
const numRegex = /[0-9]/gm ;
const keyRegex = /[a|e|i|o|u]/gim;

const limpiarTexto = nodo => nodo.innerText = '';

// si el input de texto esta vacio se mostrara mensaje de error si no se realizara la encriptacion
encriptar.addEventListener('click', ()=>{
    const textoPrincipal = textoEntrada.value;

    if(textoPrincipal === '' || numRegex.test(textoPrincipal)){
        return alert('ingrese solo letras');
    }else{
        let textoFinal = textoPrincipal.replace(keyRegex, match => diccionario[match]);
        funEncriptar(textoFinal);
        textoEntrada.value = '';
    }
})

function funEncriptar(texto) {
    munecoResultadoClases(true)
    textoSalida.innerText = texto;
}

function munecoResultadoClases(boolean) {
    if(boolean){
        muneco.classList.add('display-none');
        resultado.classList.remove('display-none');
    }else{
        muneco.classList.remove('display-none');
        resultado.classList.add('display-none');
        limpiarTexto(textoSalida);
    }
}

limpiarResultadoBtn.addEventListener('click', () => munecoResultadoClases(false));
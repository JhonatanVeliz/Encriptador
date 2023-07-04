import { $ } from "./src/js/export.js";

const btnMode = $('.mode');
const modeImg = $('#imgMode');
const bodyDocument = $('body');
const paragraphInfo = $('#textoAdicional');

btnMode.addEventListener('click', ()=>{
    bodyDocument.classList.toggle('body--dark');
    paragraphInfo.classList.toggle('parrafo-claro');

    if(modeImg.alt == 'claro'){
        modeImg.src = './src/img/luna.png';
        modeImg.alt = 'oscuro';
    }else{
        modeImg.src = './src/img/sol.png';
        modeImg.alt = 'claro';
    }
});
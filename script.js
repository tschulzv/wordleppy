// VARIABLES GLOBALES 
let intentos = 6;
let diccionario = ['APPLE', 'HURLS', 'WINGS', 'YOUTH'];
let palabra;

// ELEMENTOS
const BUTTON = document.getElementById('guess-button');
const INPUT = document.getElementById('guess-input');
const VALOR = INPUT.value;
const GRID = document.getElementById('grid');
const ERROR = document.getElementById('error');
const INTENTOS = document.getElementById('intentos');
const FIN = document.getElementById('fin');
const REINICIAR = document.getElementById('reiniciar');

// EVENTOS 
window.addEventListener('load', init);
BUTTON.addEventListener('click', intentar);
REINICIAR.addEventListener('click', init);

//FUNCIONES

function init(){
    intentos = 6;
    INTENTOS.innerHTML = intentos;
    FIN.style.display = 'none';
    while (GRID.firstChild) {
        GRID.removeChild(GRID.firstChild);
    }
    INPUT.disabled = false;
    BUTTON.disabled = false;
    genPalabra();
}

function genPalabra(){
    // codigo para randomizar la palabra
    palabra = diccionario[Math.floor(Math.random() * diccionario.length)];
}

function intentar(){
    const ROW = document.createElement('div');
    ROW.className = 'row';
    const INTENTO = leerIntento();
    if (INTENTO === palabra){
        terminar("<p>GANASTE!</p>");
        return;
    }
    for (let i in palabra){
        const SPAN = document.createElement('span');
        SPAN.className = 'letter';
        if (INTENTO[i]===palabra[i]){
            SPAN.innerHTML = INTENTO[i];
            SPAN.style.backgroundColor = '#21C67D';
        }
        else if(palabra.includes(INTENTO[i])){
            SPAN.innerHTML = INTENTO[i];
            SPAN.style.backgroundColor = '#EDE98C';
        }
        else{
            SPAN.innerHTML = INTENTO[i];
            SPAN.style.backgroundColor = 'grey';
        }
        ROW.appendChild(SPAN);
    }
        GRID.appendChild(ROW);
        intentos--;
        INTENTOS.innerHTML=intentos;
        if (intentos==0){
            terminar("<p>PERDISTE!</p>");
        }
}


function leerIntento(){
    let intento = document.getElementById("guess-input");
    intento = intento.value;
    intento = intento.toUpperCase(); 
    if (intento.length !== 5){
        mostrarError();
    }
    else{
        ERROR.style.display="none";
        document.getElementById('guess-input').value=""; // resetear input
        return intento;
    }
}

function mostrarError(){
    ERROR.style.display="block";
}

function terminar(mensaje){
    INPUT.disabled = true;
    BUTTON.disabled = true;
    let contenedor = document.getElementById("guesses");
    contenedor.innerHTML = mensaje;
    FIN.style.display="block";
}



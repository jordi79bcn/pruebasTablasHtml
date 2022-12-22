const CLICK_IZQUIERDO = 1;
const MODO_NADA = 0;
const MODO_INSERTAR_UNA = 1;
const MODO_INSERTAR_BLOQUE = 2;

const TIPO_CASILLA_VACIA = 0;
const TIPO_CASILLA_ROJA = 1;

let modo = MODO_NADA;
let suelo = TIPO_CASILLA_ROJA;

let celdaInicio;
const mapa = new Mapa(50, 50);

 function clickCelda(event){
	if (modo == MODO_NADA){
		suelo = event.shiftKey?Suelo.Vacio:Suelo.Rojo;
		
		if (event.ctrlKey){
			modo = MODO_INSERTAR_BLOQUE;
			celdaInicio = event.target;
		}
		else{
			modo = MODO_INSERTAR_UNA;
		}
	}
	else if (modo == MODO_INSERTAR_UNA || modo == MODO_INSERTAR_BLOQUE){
		modo = MODO_NADA;
	}
	else{
		alert("error! modo imposible: " + modo);
	}
		
	mapa.marcarCelda(event.target.id);
 }
 
 function entrarCelda(event){
	 if (modo == MODO_INSERTAR_UNA){
	 	mapa.marcarCelda(event.target.id);
	 }
	 else if (modo == MODO_INSERTAR_BLOQUE){
	 	mapa.marcarBloqueCeldas(celdaInicio.id, event.target.id);
	 }
 }
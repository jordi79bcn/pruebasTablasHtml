"use strict";


const CLICK_IZQUIERDO = 1;
const MODO_NADA = 0;
const MODO_INSERTAR_UNA = 1;
const MODO_INSERTAR_BLOQUE = 2;

let modo = MODO_NADA;
let suelo = Suelo.Vacio;

let celdaInicio;
const mapa = new Mapa(50, 50);

 function clickCelda(event){
	if (modo == MODO_NADA){
		suelo = event.shiftKey?Suelo.Vacio:Suelo.Rojo;
		
		if (event.ctrlKey){
			modo = MODO_INSERTAR_BLOQUE;
			celdaInicio = event.target;
			mapa.iniciarBloqueCeldas(event.target.id, suelo);
		}
		else{
			modo = MODO_INSERTAR_UNA;
			mapa.marcarCelda(event.target.id, suelo);
		}
	}
	else if (modo == MODO_INSERTAR_UNA){
		modo = MODO_NADA;
		mapa.marcarCelda(event.target.id, suelo);
	}
	else if (modo == MODO_INSERTAR_BLOQUE){
		modo = MODO_NADA;
		mapa.cerrarBloqueCeldas(event.target.id);
	}
	else{
		alert("error! modo imposible: " + modo);
	}
}
 
 function entrarCelda(event){
	 if (modo == MODO_INSERTAR_UNA){
	 	mapa.marcarCelda(event.target.id, suelo);
	 }
	 else if (modo == MODO_INSERTAR_BLOQUE){
	 	//mapa.marcarBloqueCeldas(celdaInicio.id, event.target.id, suelo);
	 }
 }
/**
 * 
 */
const CLICK_IZQUIERDO = 1;
const MODO_NADA = 0;
const MODO_INSERTAR_UNA = 1;
const MODO_INSERTAR_BLOQUE = 2;

var modo = MODO_NADA;

 function clickCelda(event){
	if (modo == MODO_NADA)
		modo = MODO_INSERTAR_UNA;
	else if (modo == MODO_INSERTAR_UNA)
		modo = MODO_NADA;
	else
		alert("error! modo imposible: " + modo);
		
	marcarCelda(event.target);
 }
 
 function entrarCelda(event){
	 console.log(event.target.id);
	 if (modo == MODO_INSERTAR_UNA){
	 	marcarCelda(event.target);
	 }
 }
 
 function marcarCelda(div){
	//var div= document.getElementById(idCelda);
	div.classList.add("roja");
 }
 
 
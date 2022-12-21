/**
 * 
 */
const CLICK_IZQUIERDO = 1;
const MODO_NADA = 0;
const MODO_INSERTAR = 1;

var modo = MODO_NADA;

 function clickCelda(idCelda){
	if (modo == MODO_NADA)
		modo = MODO_INSERTAR;
	else if (modo == MODO_INSERTAR)
		modo = MODO_NADA;
	else
		alert("error! modo imposible: " + modo);
		
	marcarCelda(idCelda);
 }
 
 function entrarCelda(event){
	 console.log(event.target.id);
	 if (modo == MODO_INSERTAR){
	 	marcarCelda(event.target.id);
	 }
 }
 
 function marcarCelda(idCelda){
	var div= document.getElementById(idCelda);
	div.classList.add("roja");
 }
 
 
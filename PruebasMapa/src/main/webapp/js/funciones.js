const CLICK_IZQUIERDO = 1;
const MODO_NADA = 0;
const MODO_INSERTAR_UNA = 1;
const MODO_INSERTAR_BLOQUE = 2;

var modo = MODO_NADA;
var celdaInicio;

 function clickCelda(event){
	if (modo == MODO_NADA){
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
		
	marcarUnaCelda(event.target);
 }
 
 function entrarCelda(event){
	 if (modo == MODO_INSERTAR_UNA){
	 	marcarUnaCelda(event.target);
	 }
	 else if (modo == MODO_INSERTAR_BLOQUE){
	 	marcarBloqueCeldas(celdaInicio, event.target);
	 }
 }
 
 function marcarUnaCelda(celda){
	celda.classList.add("roja");
 }
 
 function marcarBloqueCeldas(celdaInicio, celdaFin){
	let celdaActual;

	//incremento fila y columna.
	let incF = 1;
	let incC = 1;
	
	//formato:fila_columna
	let ini = celdaInicio.id.split("_");
	let fin = celdaFin.id.split("_");
	
	console.log("ini: " + ini + "  fin: " + fin);
	
	let f0 = parseInt(ini[0]);
	let c0 = parseInt(ini[1]);
	let f1 = parseInt(fin[0]);
	let c1 = parseInt(fin[1]);
	
	if (f0 > f1) incF = -1; 
	if (c0 > c1) incC = -1;
	
	for (let f = f0; f != f1; f += incF){
		for (let c = c0; c != c1; c += incC){
			let idAct = f + "_" + c;
			celdaActual = document.getElementById(idAct);
			marcarUnaCelda(celdaActual);
		} 
	} 
 }
 
 
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

	//formato:fila_columna
	let ini = celdaInicio.id.split("_");
	let fin = celdaFin.id.split("_");
	
	let f0 = parseInt(ini[0]);
	let c0 = parseInt(ini[1]);
	
	let f1 = parseInt(fin[0]);
	let c1 = parseInt(fin[1]);

	console.log("ini: " + ini + "  fin: " + fin);
	
	let aux;
	
	if (f0 > f1){
		aux = f0;
		f0 = f1;
		f1 = aux;
	}  
	if (c0 > c1){
		aux = c0;
		c0 = c1;
		c1 = aux;	
	}  

	for (let f = f0; f <= f1; f++){
		for (let c = c0; c <= c1; c++){
			let idAct = f + "_" + c;
			celdaActual = document.getElementById(idAct);
			marcarUnaCelda(celdaActual);
		} 
	} 
 }
 
 function intercambiar(a, b){
	 let aux = a;
	 a = b;
	 b = a;
 }
 
 
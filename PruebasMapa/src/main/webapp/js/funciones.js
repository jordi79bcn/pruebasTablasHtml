const CLICK_IZQUIERDO = 1;
const MODO_NADA = 0;
const MODO_INSERTAR_UNA = 1;
const MODO_INSERTAR_BLOQUE = 2;

const TIPO_CASILLA_VACIA = 0;
const TIPO_CASILLA_ROJA = 1;

let modo = MODO_NADA;
let tipoCasilla = TIPO_CASILLA_ROJA;

let celdaInicio;


 function clickCelda(event){
	if (modo == MODO_NADA){
		if (event.shiftKey){
			tipoCasilla = TIPO_CASILLA_VACIA;
		}
		else{
			tipoCasilla = TIPO_CASILLA_ROJA;
		}
		
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
 
  function getCelda(fila, columna){
	let idAct = fila + "_" + columna;
	
	let celda= document.getElementById(idAct);

	return celda;		
 }
 
  function getFilaColumna(celda){
	if (celda.id.indexOf("_") == -1){
		alert("id incorrecto! " + celda.id);
	}
	
	let datos = celda.id.split("_");
	let coord = {};
	
	coord.fila = parseInt(datos[0]);
	coord.col = parseInt(datos[1]);
	
	return coord;		
 }

 function marcarUnaCelda(celda){
	if (tipoCasilla == TIPO_CASILLA_VACIA)
		celda.className = "celda";
	else if (tipoCasilla == TIPO_CASILLA_ROJA)
		celda.classList.add("roja");
	else
		alert("tipo casilla imposible: " + tipoCasilla);
 }
 
 function marcarUnaCeldaFilaCol(fila, col){
	 marcarUnaCelda(getCelda(fila, col));
 }

 function marcarBloqueCeldas(celdaInicio, celdaFin){
	//formato:fila_columna
	let ini = getFilaColumna(celdaInicio);
	let fin = getFilaColumna(celdaFin);
	
	console.log("ini: " + ini + "  fin: " + fin);
	
	let aux;
	
	if (ini.fila > fin.fila){
		aux = ini.fila;
		ini.fila = fin.fila;
		fin.fila = aux;
	}  
	if (ini.col > fin.col){
		aux = ini.col;
		ini.col = fin.col;
		fin.col= aux;
	}    

	for (let f = ini.fila; f <= fin.fila; f++){
		for (let c = ini.col; c <= fin.col; c++){
			marcarUnaCeldaFilaCol(f, c);
		} 
	} 
 }
 
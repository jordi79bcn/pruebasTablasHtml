"use strict";

let modo = Modo.Nada;
let suelo = Suelo.Vacio;

//let celdaInicio;
const mapa = new Mapa(50, 50);

function clickCelda(event) {
	if (modo == Modo.Nada) {
		suelo = event.shiftKey ? Suelo.Vacio : Suelo.Rojo;

		if (event.ctrlKey) {
			modo = Modo.Insertar_bloque;
			//celdaInicio = event.target;
			mapa.iniciarBloqueCeldas(event.target.id, suelo);
		}
		else {
			modo = Modo.Insertar_una;
			mapa.marcarCelda(event.target.id, suelo);
		}
	}
	else if (modo == Modo.Insertar_una) {
		modo = Modo.Nada;
		mapa.marcarCelda(event.target.id, suelo);
	}
	else if (modo == Modo.Insertar_bloque) {
		modo = Modo.Nada;
		mapa.cerrarBloqueCeldas(event.target.id);
	}
	else {
		alert("error! modo imposible: " + modo);
	}

	console.log("modo al terminar click: " + modo)
}

function entrarCelda(event) {
	if (modo == Modo.Insertar_una) {
		mapa.marcarCelda(event.target.id, suelo);
	}
	else if (modo == Modo.Insertar_bloque) {
		//mapa.refrescarBloqueCeldas(celdaInicio.id, event.target.id, suelo);
		mapa.refrescarBloqueCeldas(event.target.id);
	}
}

//--------------- funciones para los botones ---------------------------------

function botonAnadir(event){
	//alert('botonAnadir');
	let list = event.target.classList;
	list.replace("btnApagado", "btnEncendido");    // Devuelve `false` (no existe la clase warning)
}

function botonBorrar(event){
	alert('botonBorrar');
}

function botonSel(event, tipoSel){
	//una, libre, bloque
	if (tipoSel == "una"){
		alert('seleccionar: una');
	}
	else if (tipoSel == "libre"){
		alert('seleccionar: libre');
	}
	else if (tipoSel == "bloque"){
		alert('seleccionar: bloque');
	}
	else{
		alert('error! Seleccionar: ' + tipoSel);
	}
	
}
function botonItem(event, item){
	if (item == "suelo"){
		alert('seleccionar: suelo');
	}
	else if (item == "enemigo"){
		alert('seleccionar: enemigo');
	}
	else if (item == "objeto"){
		alert('seleccionar: objeto');
	}
	else{
		alert('error! item: ' + item);
	}
}

function botonDeshacer(event){
	alert('botonDeshacer');
}

function botonGuardar(event){
	alert('botonGuardar');
}

function botonDescartar(event){
	alert('botonDescartar');
}

function botonCambiarTamCelda(event){
	alert('botonCambiarTamCelda');
}
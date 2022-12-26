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
		//alert("error! modo imposible: " + modo);
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
document.addEventListener("keydown", function(event) {
	switch (event.key) {
	  case 'a':
        event.preventDefault();
        document.getElementById("btnAnadir").click();
	    break;
	  case 'b':
        event.preventDefault();
        document.getElementById("btnBorrar").click();
	    break;
	  case '1':
        event.preventDefault();
        document.getElementById("btnSelUna").click();
	    break;
	  case '2':
        event.preventDefault();
        document.getElementById("btnSelLibre").click();
	    break;
	  case '3':
        event.preventDefault();
        document.getElementById("btnSelBloque").click();
	    break;
	  case 's':
        event.preventDefault();
        document.getElementById("btnItemSuelo").click();
	    break;
	  case 'e':
        event.preventDefault();
        document.getElementById("btnItemEnemigo").click();
	    break;
	  case 'o':
        event.preventDefault();
        document.getElementById("btnItemObjeto").click();
	    break;
	}
});

//esta funcion solo funcionará si el botón en cuestión tiene la clase btnApagado, y pertenece a un "padre" que contiene a to.dos los botones de su grupo.  
function encender(boton){
	
	//apagar los otros botones en este div que están encendidos. El div se saca del padre (parentNode)
	//porque no funciona con querySelector (sin el all)? Porquer queryselector solo devuelve el 1er elemento que cumple con la regla. SI los quieres to.dos, necesitas QuerySelectorAll.
	//ni con .w3-button.btnEncendido? Porque debes tener lio de selectores, mira aqui: https://www.w3schools.com/cssref/css_selectors.php
	boton.parentNode.querySelectorAll('.btnEncendido').forEach(elem=>{
		elem.classList.replace("btnEncendido", "btnApagado");
	})
	
	//ahora encender este boton
	boton.classList.replace("btnApagado", "btnEncendido");
}

function botonAnadir(event){
	encender(event.target);
}

function botonBorrar(event){
	encender(event.target);
}

function botonSel(event, tipoSel){
	encender(event.target);

	//una, libre, bloque
	if (tipoSel == "una"){
		//alert('seleccionar: una');
	}
	else if (tipoSel == "libre"){
		//alert('seleccionar: libre');
	}
	else if (tipoSel == "bloque"){
		//alert('seleccionar: bloque');
	}
	else{
		//alert('error! Seleccionar: ' + tipoSel);
	}
}
function botonItem(event, item){
	encender(event.target);

	if (item == "suelo"){
		//alert('seleccionar: suelo');
	}
	else if (item == "enemigo"){
		//alert('seleccionar: enemigo');
	}
	else if (item == "objeto"){
		//alert('seleccionar: objeto');
	}
	else{
		//alert('error! item: ' + item);
	}
}

function botonDeshacer(event){
	//alert('botonDeshacer');
}

function botonGuardar(event){
	//alert('botonGuardar');
}

function botonDescartar(event){
	//alert('botonDescartar');
}

function botonCambiarTamCelda(event){
	//alert('botonCambiarTamCelda');
}
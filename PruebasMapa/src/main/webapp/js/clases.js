"use strict";

//let suelo = Suelo.Vacio;

class ModoSel {
	static Una = new ModoSel("Insertar_una")
	static Libre = new ModoSel("Insertar_libre")
	static Bloque = new ModoSel("Insertar_bloque")

	constructor(name) {
		this.name = name
	}

	toString() {
		return "Modo: " + this.name;
	}
}

class Accion {
	static Anadir = new Accion("Anadir")
	static Borrar= new Accion("Borrar")

	constructor(name) {
		this.name = name
	}

	toString() {
		return "Accion: " + this.name;
	}
}


// esta clase hace la funciond de "enum" y sirve para escoger el tipo de suelo 
class Suelo {
	static Rojo = new Suelo("rojo")
	static Verde = new Suelo("verde")
	static Vacio = new Suelo("vacio")

	constructor(name) {
		this.name = name
	}
}
class Mapa {
	#filas;
	#columnas;
	#arrayCeldas; //para almacenar celdas en formato fila-columna. va bien para seleccin de bloque
	#mapCeldas; //para almacenar celdas por su id. Mucho más rápido acceder a cada casilla!
	#ultimasMarcadas;
	#idCeldaInicioBloque; //1a celda seleccionada en un bloque
	#idCeldaFinBloque; //2a celda seleccionada en un bloque (cierre)
	#modoSel = ModoSel.Una;
	#suelo;
	#numClick; //se usa para saber si es el 1er click o el 2o, el 1o abre el bloque y el 2o lo cierra.
	#accion; //añadir, borrar. Lo que el usr marque en el menú "acciones"


	constructor(filas, columnas) {
		this.#filas = filas;
		this.#columnas = columnas;
		this.#arrayCeldas = new Array(filas);
		this.#mapCeldas = new Map();
		this.#ultimasMarcadas = []; //array vacio, se usara para guardar las provisionales que se han marcado y poderlas desmarcar.
		this.#suelo = Suelo.Rojo;
		this.#numClick = 0;
		
		this.#inicializarCeldas();
	}

	#inicializarCeldas() { //funcion privada (empieza por #)
		for (let f = 0; f < this.#filas; f++) {
			this.#arrayCeldas[f] = new Array(this.#columnas);
			for (let c = 0; c < this.#columnas; c++) {
				let celda = new Celda(f, c);
				this.#arrayCeldas[f][c] = celda;
				this.#mapCeldas.set(celda.getDivID().toString(), celda);
			}
		}
	}
	
	setModoSel(modoSel){
		if (this.#modoSel != modoSel){
			//cambio de modo de seleccion, reseteamos numClick.
			this.#numClick = 0;

			//si el modo anterior era bloque y ahora hemos ido a otro, cancelamos el bloque.
			if (this.#modoSel == ModoSel.Bloque){
				this.#cancelarBloqueCeldas();				
			}
		}
		
		this.#modoSel = modoSel;
	}
	
	
	//FIXME no permitas cambiar de accion si esta en medio de una seleccion o en otro modo!
	setAccion(accion){
		if (this.#accion != accion){
			//cambio de modo de accion, reseteamos numClick.
			this.#numClick = 0;
			
			if (accion == Accion.Anadir){
				this.#suelo = Suelo.Rojo; //TODO de momento rojo fijo, mas adelante necesitaré una variable sueloSel que guarde el tipo de suelo que he añadido en el menú (falta un selector de tipo de suelo)
			}
			else if (accion == Accion.Borrar){
				this.#suelo = Suelo.Vacio;
			}
			
			this.#accion = accion;
		}
	}

	setSuelo(suelo){
		this.#suelo = suelo;
	}

	#getCeldaFilaCol(fila, col) {
		return this.#arrayCeldas[fila][col];
	}

	#getCeldaPorID(idCelda) {
		return this.#mapCeldas.get(idCelda);
	}

	#marcarCelda(idCelda) {
		this.#mapCeldas.get(idCelda).setSuelo(this.#suelo);
	}

	#desmarcarUltimoBloque() {
		this.#ultimasMarcadas.forEach(idCelda => this.#getCeldaPorID(idCelda).deshacerSuelo());
		this.#ultimasMarcadas.length = 0; //vaciamos el array, ya no hace falta.
	}

	#iniciarBloqueCeldas(idCelda) {
		this.#idCeldaInicioBloque = idCelda;
	}

	#cancelarBloqueCeldas() {
		this.#desmarcarUltimoBloque();
		this.#idCeldaInicioBloque = -1;
		this.#idCeldaFinBloque = -1;
		this.#numClick = 0; //por si acaso, reseteamos el click.
	}

	#cerrarBloqueCeldas(idCelda) {
		this.#idCeldaFinBloque = idCelda;
		this.#desmarcarUltimoBloque();
		this.#marcarBloqueCeldas(this.#idCeldaInicioBloque, this.#idCeldaFinBloque);
		this.#ultimasMarcadas.length = 0; //vaciamos el array, ya no hace falta.

		//--- despues de cerrar, estos valores se resetean.
		this.#idCeldaInicioBloque = -1;
		this.#idCeldaFinBloque = -1;

	}

	//recibe la celda de fin (provisional, puede actualizarse hasta que haga click por 2a vez.)
	#refrescarBloqueCeldas(idCeldaFinProvisional) {
		this.#desmarcarUltimoBloque();
		this.#ultimasMarcadas = this.#marcarBloqueCeldas(this.#idCeldaInicioBloque, idCeldaFinProvisional);
	}

	#marcarBloqueCeldas(idCeldaInicio, idCeldaFin) {
		let ini = this.#getCeldaPorID(idCeldaInicio);
		let fin = this.#getCeldaPorID(idCeldaFin);

		// ---- to.do esto de abajo es para recorrer el bucle de menor a mayor.
		let f0 = ini.getFila();
		let c0 = ini.getColumna();

		let f1 = fin.getFila();
		let c1 = fin.getColumna();

		if (ini.getFila() > fin.getFila()) {
			f0 = fin.getFila();
			f1 = ini.getFila();
		}
		if (ini.getColumna() > fin.getColumna()) {
			c0 = fin.getColumna();
			c1 = ini.getColumna();
		}
		//-----------------------------------------------------------------

		let celda;

		for (let f = f0; f <= f1; f++) {
			for (let c = c0; c <= c1; c++) {
				celda = this.#getCeldaFilaCol(f, c);
				celda.setSuelo(this.#suelo);
				this.#ultimasMarcadas.push(celda.getDivID());
			}
		}

		return this.#ultimasMarcadas;
	}
	
	cancelarAccion(){
		if (this.#modoSel == ModoSel.Bloque){
			this.#cancelarBloqueCeldas();
		}
	}
	
	//-------------------------------------------------------------------

	clickCelda(idCelda) {
		//libre y una son lo mismo, la direrencia es que libre si usará el mouseover y click no.
		//console.log("click! " + this.#numClick);
		if (this.#modoSel == ModoSel.Una){
			this.#marcarCelda(idCelda);
		}
		else if (this.#modoSel == ModoSel.Libre){
			if (this.#numClick == 0){
				this.#marcarCelda(idCelda);
			}
			else{
				//ignoro este click: ya se habrá marcado con entrarCelda
			}
		}
		else if (this.#modoSel == ModoSel.Bloque) {
			if (this.#numClick == 0){
				this.#iniciarBloqueCeldas(idCelda);
			}
			else{
				this.#cerrarBloqueCeldas(idCelda);
			}
		}
		else {
			alert("error! modo imposible: " + this.#modoSel);
		}
		
		this.#numClick++;

		if (this.#numClick == 2)
			this.#numClick = 0;

	}
	
	entrarCelda(idCelda) {
		if (this.#modoSel == ModoSel.Una) {
			//aqui no hacemos nada, ya hemos marcado al hacer click.
		}
		//solo marcamos celda en modo libre si ya hemos hecho click una vez, si no ignoramos.
		else if (this.#modoSel == ModoSel.Libre && this.#numClick == 1) {
			this.#marcarCelda(idCelda);
		}
		else if (this.#modoSel == ModoSel.Bloque && this.#numClick == 1) {
			this.#refrescarBloqueCeldas(idCelda);
		}
	}

//------------------------------------------------------------------------------

	toString() {
		for (let f = 0; f < this.#filas; f++) {
			for (let c = 0; c < this.#columnas; c++) {
				console.log(this.#arrayCeldas[f][c]);
			}
		}
	}
}

//------------------------------------------------------------------------------

class Celda {
	#fila;
	#columna;
	#suelo;
	#sueloAnterior; //aqui guardamos el anterior al hacer setSuelo
	#divID;
	#div; //recuerda no usar div, mejor getDiv! Puede no haberse cargado!

	constructor(fila, columna) {
		this.#fila = fila;
		this.#columna = columna;
		this.#divID = fila + "_" + columna; //montamos el id a partir de la fila y col.
		this.#suelo = Suelo.Vacio; //si no nos dicen nada, está vacío
		this.#sueloAnterior = Suelo.Vacio; //si no nos dicen nada, está vacío
	}

	getFila() {
		return this.#fila;
	}

	getColumna() {
		return this.#columna;
	}

	getSuelo() {
		return this.#suelo;
	}

	//se usa para obtener el div al que hace referencia este objeto celda
	getDivID() {
		return this.#divID;
	}

	#getDiv() {
		//si no esta asignada la variable, lo hacemos
		if (!this.#div) {
			this.#div = document.getElementById(this.#divID); //el div representa la celda del grid
		}

		return this.#div;
	}

	setSuelo(suelo) {
		let ok = true;		 
		let list = this.#getDiv().classList;
		
		//-- cuando esté bien probado se puede eliminar esto:-------------------
		if (list[0] != "celda"){
			alert("error: el estilo debe ser 'celda' en " + this.getDivID());
		}
		if (list.length < 2){
			alert("error: el estilo debe ser 'celda' y algo más en " + this.getDivID());
		}
		//---------------------------------------------------------------
		
		let classAnterior = list[1]; //la 0 será "celda" y la 1 "vacia", "roja"... etc
		
		if (suelo == Suelo.Vacio)
			list.replace(classAnterior, "vacia");
		else if (suelo == Suelo.Rojo)
			list.replace(classAnterior, "roja");
		else if (suelo == Suelo.Verde)
			list.replace(classAnterior, "verde");
		else {
			alert("suelo imposible: " + suelo);
			ok = false;
		}

		//solo asignamos el suelo si es correcto.
		if (ok) {
			this.#sueloAnterior = this.#suelo;
			this.#suelo = suelo;			
		}
	}

	deshacerSuelo() {
		this.setSuelo(this.#sueloAnterior);
	}

	toString() {
		return `Celda (${this.#fila}, ${this.#columna})`;
	}
}
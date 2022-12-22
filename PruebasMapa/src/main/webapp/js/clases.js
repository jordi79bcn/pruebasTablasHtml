"use strict";


class Modo {
	static Nada  = new Modo("Nada")
	static Insertar_una = new Modo("Insertar_una")
	static Insertar_bloque = new Modo("Insertar_bloque")
	
	constructor(name) {
		this.name = name
	}
	
	toString(){
		return "Modo: " + this.name;
	}
}


// esta clase hace la funciond de "enum" y sirve para escoger el tipo de suelo 
class Suelo {
	static Rojo  = new Suelo("rojo")
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
	#sueloInicioBloque; //el suelo a dibujar en ese bloque. Puede ser util si usamos un color para optimizar.


	constructor(filas, columnas) {
	    this.#filas = filas;
	    this.#columnas = columnas;
	    this.#arrayCeldas = new Array(filas);
	    //this.#mapCeldas = new Array(filas*columnas);
	    this.#mapCeldas = new Map();
	    this.#ultimasMarcadas = []; //array vacio, se usara para guardar las provisionales que se han marcado y poderlas desmarcar.

	    this.#inicializar();
	}
  
	#inicializar(){ //funcion privada (empieza por #)
		for (let f = 0; f < this.#filas; f++){
			this.#arrayCeldas[f] = new Array(this.#columnas);
			for (let c = 0; c < this.#columnas; c++){
				let celda = new Celda(f, c);
				this.#arrayCeldas[f][c] = celda;
				this.#mapCeldas.set(celda.getDivID().toString(), celda);
			}
		}
	}
	
	#getCeldaFilaCol(fila, col){
		return this.#arrayCeldas[fila][col];
	}
	
	#getCeldaPorID(idCelda){
		return this.#mapCeldas.get(idCelda);
	}
	
	marcarCelda(idCelda, suelo){
		this.#mapCeldas.get(idCelda).setSuelo(suelo);
	}
	
	#desmarcarUltimoBloque(){
		//FIXME guarda dentro de celda el suelo anterior, para poder "deshacer" si por error haces un bloque encima de una zona ya dibujada.
		this.#ultimasMarcadas.forEach(idCelda => this.marcarCelda(idCelda, Suelo.Vacio));
		this.#ultimasMarcadas.length = 0; //vaciamos el array, ya no hace falta.
	}
	
	iniciarBloqueCeldas(idCelda, suelo){
		this.#idCeldaInicioBloque = idCelda;
		this.#sueloInicioBloque = suelo;
	}
	
	cerrarBloqueCeldas(idCelda){
		this.#idCeldaFinBloque = idCelda;
		this.#desmarcarUltimoBloque();// creo que aqui no hace falta, ya se borra en refrescar.
		this.#marcarBloqueCeldas(this.#idCeldaInicioBloque, this.#idCeldaFinBloque, this.#sueloInicioBloque);
		this.#ultimasMarcadas.length = 0; //vaciamos el array, ya no hace falta.

		//--- despues de cerrar, estos valores se resetean.
		this.#idCeldaInicioBloque = -1;
		this.#idCeldaFinBloque = -1;
		this.#sueloInicioBloque = -1;

	}
	
	//recibe la celda de fin (provisional, puede actualizarse hasta que haga click por 2a vez.)
	refrescarBloqueCeldas(idCeldaFinProvisional){
		this.#desmarcarUltimoBloque();
		this.#ultimasMarcadas = this.#marcarBloqueCeldas(this.#idCeldaInicioBloque, idCeldaFinProvisional, this.#sueloInicioBloque);
	}
		
	#marcarBloqueCeldas(idCeldaInicio, idCeldaFin, suelo){
		let ini = this.#getCeldaPorID(idCeldaInicio);
		let fin = this.#getCeldaPorID(idCeldaFin);
		
		// ---- todo esto de abajo es para recorrer el bucle de menor a mayor.
		let f0 = ini.getFila();
		let c0 = ini.getColumna();
		
		let f1 = fin.getFila();
		let c1 = fin.getColumna();
		
		if (ini.getFila() > fin.getFila()){
			f0 = fin.getFila();
			f1 = ini.getFila();
		}  
		if (ini.getColumna() > fin.getColumna()){
			c0 = fin.getColumna();
			c1 = ini.getColumna();
		}  
		//-----------------------------------------------------------------
		
		let celda;
		
		for (let f = f0; f <= f1; f ++){
			for (let c = c0; c <= c1; c++){
		 		celda = this.#getCeldaFilaCol(f, c);
		 		celda.setSuelo(suelo);
		 		this.#ultimasMarcadas.push(celda.getDivID()); 
			} 
		}
		
		return this.#ultimasMarcadas;
	} 
	
	toString() {
		for (let f = 0; f < this.#filas; f++){
			for (let c = 0; c < this.#columnas; c++){
				console.log(this.#arrayCeldas[f][c]);
			}
		}
	}
}

class Celda {
	#fila;
	#columna;
	#suelo;
	#divID;
	#div; //recuerda no usar div, mejor getDiv! Puede no haberse cargado!
	
  constructor(fila, columna) {
    this.#fila = fila;
    this.#columna = columna;
    this.#divID = fila + "_" + columna; //montamos el id a partir de la fila y col.
   	this.#suelo = Suelo.Vacio; //si no nos dicen nada, está vacío
  }
  
  getFila(){
	  return this.#fila;
  }
  
  getColumna(){
	  return this.#columna;
  }  
  
  getSuelo(){
	  return this.#suelo;
  }
  
  //se usa para obtener el div al que hace referencia este objeto celda
  getDivID(){
    return this.#divID;
  }
  
  #getDiv(){
    //si no esta asignada la variable, lo hacemos
    if (!this.#div){
	    this.#div = document.getElementById(this.#divID); //el div representa la celda del grid
	}
	
	return this.#div;
  }
  
  setSuelo(suelo){
	let ok = true;
	//FIXME posible fuente de problemas: Si usas .add roja y .add verde solo se vera roja! 
	if (suelo == Suelo.Vacio)
		this.#getDiv().className = "celda";
	else if (suelo == Suelo.Rojo)
		this.#getDiv().classList.add("roja");
	else if (suelo == Suelo.Verde)
		this.#getDiv().classList.add("verde");
	else{
		alert("suelo imposible: " + suelo);
		ok = false;
	}
	
	//solo asignamos el suelo si es correcto.
	if (ok){
		this.#suelo = suelo; 
	}
 }

  
  toString() {
    return `Celda (${this.#fila}, ${this.#columna})`;
  }
}
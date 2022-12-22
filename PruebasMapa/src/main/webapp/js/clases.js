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
	 
	constructor(filas, columnas) {
	    this.#filas = filas;
	    this.#columnas = columnas;
	    this.#arrayCeldas = new Array(filas);
	    //this.#mapCeldas = new Array(filas*columnas);
	    this.#mapCeldas = new Map();

	    this.#inicializar();

		console.log("mapCeldas.size: " + this.#mapCeldas.size);
		console.log("mapCeldas: " + this.#mapCeldas);
		console.log("mapCeldas.get(3_3): " + this.#mapCeldas.get("3_3"));
	}
  
	#inicializar(){ //funcion privada (empieza por #)
		for (let f = 0; f < this.#filas; f++){
			this.#arrayCeldas[f] = new Array(this.#columnas);
			for (let c = 0; c < this.#columnas; c++){
				let celda = new Celda(f, c);
				this.#arrayCeldas[f][c] = celda;
				this.#mapCeldas.set(celda.getDivID().toString(), celda);//FIXME porqué se guarda la celda pero al salie mapCeldas es vacio?
			}
		}
	}
	
	#getCeldaFilaCol(fila, col){
		return this.#arrayCeldas[fila][col];
	}
	
	#getCeldaPorID(idCelda){
		return this.#mapCeldas.get(idCelda);
	}
	
	marcarCelda(idCelda){
		/*console.log("contenido de mapCeldas: " + this.#mapCeldas.size);
		console.log("me piden marcar: " + idCelda);*/
		this.#mapCeldas.get(idCelda).setSuelo(Suelo.Rojo);
	}
	
	marcarBloqueCeldas(celdaInicio, celdaFin){
		let ini = this.#getCeldaPorID(celdaInicio.id);
		let fin = this.#getCeldaPorID(celdaFin.id);
		
		console.log("ini: " + ini + "  fin: " + fin);
		
		let inc_fila = 1;
		let inc_col  = 1;
		
		let numFilas = ini.fila - fin.fila;
		let numCols  = ini.col  - fin.col;
		
		if (numFilas < 0){
			inc_fila = -1;
			numFilas *= -1; //lo dejamos en positivo
		}  
		if (numCols < 0){
			inc_col = -1;
			numCols *= -1; //lo dejamos en positivo
		}  
	
		for (let f = 0; f <= numFilas; f += inc_fila){
			for (let c = 0; c <= numCols; c += inc_col){
		 		getCeldaFilaCol(f + ini.fila, c + ini.col).setSuelo(Suelo.Rojo);
			} 
		}
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
	
	if (suelo == Suelo.Vacio)
		this.#getDiv().className = "celda";
	else if (suelo == Suelo.Rojo)
		this.#getDiv().classList.add("roja");
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
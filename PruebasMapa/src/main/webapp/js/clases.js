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
	    this.#arrayCeldas = [];
	    this.#mapCeldas = [];
	    this.#inicializar();
	}
  
	#inicializar(){ //funcion privada (empieza por #)
		for (let f = 0; f < this.#filas; f++){
			this.#arrayCeldas[f] = [];
			for (let c = 0; c < this.#columnas; c++){
				let celda = new Celda(f, c);
				this.#arrayCeldas[f][c] = celda;
				this.#mapCeldas[celda.getDivID()] = celda;
			}
		}
	}
	
	getCeldaFilaCol(fila, col){
		return this.#arrayCeldas[fila][col];
	}
	
	getCeldaPorID(idCelda){
		return this.#mapCeldas[idCelda];
	}
	
	marcarBloqueCeldas(celdaInicio, celdaFin){
		let ini = getCeldaPorID(celdaInicio.id);
		let fin = getCeldaPorID(celdaFin.id);
		
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
		 		getCeldaFilaCol(f, c).setSuelo(Suelo.Rojo);
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

	
  constructor(fila, columna) {
    this.#fila = fila;
    this.#columna = columna;
    this.#divID = `(${this.#fila}_${this.#columna})`; //montamos el id a partir de la fila y col.
    this.#div = document.getElementById(this.#divID); //el div representa la celda del grid
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
  
  setSuelo(suelo){
	let ok = true;
	
	if (suelo == Suelo.Vacio)
		this.#div.className = "celda";
	else if (suelo == Suelo.Rojo)
		this.#div.classList.add("roja");
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
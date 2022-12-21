/**
 * clases Mapa y Celda
 */

 class Mapa {
	 #filas;
	 #columnas;
	 #celdas;
	 
	constructor(filas, columnas) {
	    this.#filas = filas;
	    this.#columnas = columnas;
	    this.#celdas = [];
	    this.#inicializar();
	}
  
	//funcion privada (empieza por #)
	#inicializar(){
		for (let f = 0; f < this.#filas; f++){
			this.#celdas[f] = [];
			for (let c = 0; c < this.#columnas; c++){
				this.#celdas[f][c] = new Celda(f, c);
			}
		}
	}
	
	getCelda(fila, col){
		return this.#celdas[fila][col];
	}
	
	toString() {
		for (let f = 0; f < this.#filas; f++){
			for (let c = 0; c < this.#columnas; c++){
				console.log(this.#celdas[f][c]);
			}
		}
	}
}

class Celda {
	#fila;
	#columna;
	
  constructor(fila, columna) {
    this.#fila = fila;
    this.#columna = columna;
  }
  
  getFila(){
	  return this.#fila;
  }
  
  getColumna(){
	  return this.#columna;
  }
  
  toString() {
    return `Celda (${this.#fila}, ${this.#columna})`;
  }
}
/**
 * 
 */
const CLICK_IZQUIERDO = 1;

 function clickCelda(numCelda){
	//alert("click en: " + numCelda);
	var div= document.getElementById(numCelda);
	div.classList.add("roja");
 }
 
 function entrarCelda(event){
	 //alert("click en: " + numCelda);
	 //document.getElementById(numCelda)
	 if (event.buttons == CLICK_IZQUIERDO){
	 	console.log(event.target.id);
	 }
 }
 
 
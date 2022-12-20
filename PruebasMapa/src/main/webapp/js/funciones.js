/**
 * 
 */
const CLICK_IZQUIERDO = 1;

 function clickCelda(numCelda){
	 //alert("click en: " + numCelda);
	 //document.getElementById(numCelda)
	 //var img = document.getElementById(numCelda).getElementsByClassName("imgMapa")[0];
	 //img.src="img/rojo.png";	 
	 var div= document.getElementById(numCelda);
	 div.style.back
	 img.src="img/rojo.png";	 
 }
 
 function entrarCelda(event){
	 //alert("click en: " + numCelda);
	 //document.getElementById(numCelda)
	 if (event.buttons == CLICK_IZQUIERDO){
	 	console.log(event.target.id);
	 }
 }
 
 
/**
 * 
 */

 function clickCelda(numCelda){
	 //alert("click en: " + numCelda);
	 //document.getElementById(numCelda)
	 var img = document.getElementById(numCelda).getElementsByClassName("imgMapa")[0];
	 img.src="img/rojo.png";	 
 }
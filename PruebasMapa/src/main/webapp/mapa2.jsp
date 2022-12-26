<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html>
<html>
	<title>Editor de niveles</title>
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
	<link rel="stylesheet" href="css/estilos2.css"/>
	<script type="text/javascript" src="js/clases.js"></script>
	<script type="text/javascript" src="js/funciones.js"></script>

	<!-- declaracion de variables que se usaran para estilos -->
	<c:set var="estiloBoton" scope = "page" value="w3-bar-item w3-button w3-border btnApagado"/>
	<!-- --------------------------------------------------- -->

	<body>

		<div class="w3-sidebar w3-bar-block w3-light-grey" style="width:15%">
		  <!--  a href="#" class="w3-bar-item w3-button w3-hover-green" onclick="alert('Link 3')">Link 3</a-->
			<div class="w3-bar w3-dark-grey">
				<div class="w3-bar-item">Acciones </div>
			</div>
			<div>
				<a href="#" class="<c:out value="${estiloBoton}" />" onclick="botonAnadir(event)">Añadir (a)</a>
				<a href="#" class="<c:out value="${estiloBoton}" />" onclick="botonBorrar(event)">borrar (b)</a>
			</div>			
			<div class="w3-bar w3-dark-grey">
				<div class="w3-bar-item">Seleccion</div>
			</div>
			<!-- para barra lateral usa esto: div class="w3-leftbar w3-border-red" -->
			<div>
				<a href="#" class="<c:out value="${estiloBoton}" />" onclick="botonSel(event, 'una')">Una celda (click)</a>
				<a href="#" class="<c:out value="${estiloBoton}" />" onclick="botonSel(event, 'libre')">Libre (shift)</a>
				<a href="#" class="<c:out value="${estiloBoton}" />" onclick="botonSel(event, 'bloque')">Bloque (ctrl)</a>
			</div>			
			<div class="w3-bar w3-dark-grey">
				<div class="w3-bar-item">Items</div>
			</div>
			<div>
				<a href="#" class="<c:out value="${estiloBoton}" />" onclick="botonItem(event, 'suelo')">Suelo (s)</a>
				<a href="#" class="<c:out value="${estiloBoton}" />" onclick="botonItem(event, 'enemigo')">Enemigos (e)</a>
				<a href="#" class="<c:out value="${estiloBoton}" />" onclick="botonItem(event, 'objeto')">Objetos (o)</a>
			</div>
			
			<div class="w3-bar w3-dark-grey">
				<div class="w3-bar-item">Undo/Redo</div>
			</div>
			<div>
				<a href="#" class="<c:out value="${estiloBoton}" />" onclick="botonDeshacer(event)">Deshacer (d)</a>
			</div>

			<div class="w3-bar w3-dark-grey">
				<div class="w3-bar-item">Niveles</div>
			</div>
			<div>
				<a href="#" class="<c:out value="${estiloBoton}" />" onclick="botonGuardar(event)">Guardar</a>
				<a href="#" class="<c:out value="${estiloBoton}" />" onclick="botonDescartar(event)">Descartar cambios</a>
			</div>		
			<div class="w3-bar w3-dark-grey">
				<div class="w3-bar-item">Opciones de cuadrícula</div>
			</div>
			<div>
				<a href="#" class="<c:out value="${estiloBoton}" />" onclick="botonCambiarTamCelda(event)">Cambiar tamaño de celda</a>
			</div>
		</div>
		
		<div style="margin-left:15%;height: 100%">
			<div class="w3-container w3-dark-grey"  style="height:10%">
			  <h1>Editor de niveles</h1>
			</div>
		
			<div class="w3-container container" style="height:90%">
				<!-- div class="container" -->
					<div class="grid" style="height:100%">
						<c:forEach var="numFila" begin="1" end="50">
							<c:forEach var="numColumna" begin="1" end="50">
								<div class="celda vacia" id='<c:out value="${numFila}_${numColumna}" />' 
									onmouseenter="entrarCelda(event)"
									onclick="clickCelda(event)">
								</div>
							</c:forEach>
						</c:forEach>
					</div>
				<!--/div-->
			</div>
		</div>
	</body>
</html>
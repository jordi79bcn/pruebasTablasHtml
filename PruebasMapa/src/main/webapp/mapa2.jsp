<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html>
<html>
	<title>Editor de niveles</title>
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
	<link rel="stylesheet" href="css/estilos2.css"/>
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
	
	<script type="text/javascript" src="js/clases.js"></script>
	<script type="text/javascript" src="js/funciones.js"></script>

	<!-- declaracion de variables que se usaran para estilos -->
	<c:set var="estiloBoton" scope = "page" value="w3-bar-item w3-button w3-border btnApagado"/>
	<!-- --------------------------------------------------- -->

	<body onload="prepararMenu()">

		<div class="w3-sidebar w3-bar-block w3-light-grey" style="width:12%">
		  <!--  a href="#" class="w3-bar-item w3-button w3-hover-green" onclick="alert('Link 3')">Link 3</a-->
			<div class="w3-bar w3-dark-grey">
				<div class="w3-bar-item">Acciones </div>
			</div>
			<div>
				<div id="btnAnadir" class="<c:out value="${estiloBoton}" />" onclick="botonAnadir(event)">Añadir (a)</div>
				<div id="btnBorrar" class="<c:out value="${estiloBoton}" />" onclick="botonBorrar(event)">borrar (b)</div>
			</div>			
			<div class="w3-bar w3-dark-grey">
				<div class="w3-bar-item">Seleccion</div>
			</div>
			<!-- para barra lateral usa esto: div class="w3-leftbar w3-border-red" -->
			<div>
				<div id="btnSelUna" class="<c:out value="${estiloBoton}" />" onclick="botonSel(event, 'una')">Una celda (1)</div>
				<div id="btnSelLibre" class="<c:out value="${estiloBoton}" />" onclick="botonSel(event, 'libre')">Libre (2)</div>
				<div id="btnSelBloque" class="<c:out value="${estiloBoton}" />" onclick="botonSel(event, 'bloque')">Bloque (3)</div>
			</div>
			<div class="w3-bar w3-dark-grey">
				<div class="w3-bar-item">Items</div>
			</div>
			<div>
				<!-- a href="#" id="btnItemSuelo" class="<c:out value="${estiloBoton}" />" onclick="botonItem(event, 'suelo')">Suelo (s)</a-->
				<!--div id="btnItemSuelo" class="w3-bar-item w3-button" onclick="botonItem(event, 'suelo')"-->
				<div id="btnItemSuelo" class="<c:out value="${estiloBoton}" />" onclick="botonItem(event, 'suelo', 'subMenuSuelo')">
					Suelo (s)<i class="fa fa-caret-down"></i>
				</div>
				<div id="subMenuSuelo" class="w3-hide w3-card-4">
					<!-- FIXME no estoy seguro que esto sea buena idea: sacar un objeto javascript de una variable definida en jstl???? -->
					<!--c:forEach var="fila" items="${arrayTiposSuelo}">
						//TODO el ideal sería que la funcion JS botonSuelo recibiera la imagen o el class que debe mostrar, y eliminar la clase Suelo. Asi evitaria if-elseif eternos con cada opcion posible de suelo, ademas que podria guardar en un array (o bd) los diferentes tipos de suel, o cargarlos desde una carpeta al iniciar la app.
						que esta jsp se cargue desde un servlet que le envie los tipos de suelo. se podra incluso filtrar por subsuelo, bosque...-->
						<div class="w3-bar-item w3-button" onclick="botonSuelo(event, 'verde.png')">
							<img src="img/verde.png"/>
						</div>
						<div class="w3-bar-item w3-button" onclick="botonSuelo(event, 'rojo.png')">
							<img src="img/rojo.png"/>
						</div>
					<!--/c:forEach-->
				</div>

				<div id="btnItemEnemigo" class="<c:out value="${estiloBoton}" />" onclick="botonItem(event, 'enemigo', 'subMenuEnemigo')">
					Enemigos (e)<i class="fa fa-caret-down"></i>
				</div>
				<div id="subMenuEnemigo" class="w3-hide w3-card-4">
					<div class="w3-bar-item w3-button">Link1</div>
					<div class="w3-bar-item w3-button">Link2</div>
				</div>

				<div id="btnItemObjeto" class="<c:out value="${estiloBoton}" />" onclick="botonItem(event, 'objeto', 'subMenuObjeto')">
					Objetos (o)<i class="fa fa-caret-down"></i>
				</div>
				<div id="subMenuObjeto" class="w3-hide w3-card-4">
					<div class="w3-bar-item w3-button">Link1</div>
					<div class="w3-bar-item w3-button">Link2</div>
				</div>
			</div>
			
			<div class="w3-bar w3-dark-grey">
				<div class="w3-bar-item">Undo/Redo</div>
			</div>
			<div>
				<div class="<c:out value="${estiloBoton}" />" onclick="botonDeshacer(event)">Deshacer</div>
			</div>

			<div class="w3-bar w3-dark-grey">
				<div class="w3-bar-item">Niveles</div>
			</div>
			<div>
				<div class="<c:out value="${estiloBoton}" />" onclick="botonGuardar(event)">Guardar</div>
				<div class="<c:out value="${estiloBoton}" />" onclick="botonDescartar(event)">Descartar cambios</div>
			</div>		
			<div class="w3-bar w3-dark-grey">
				<div class="w3-bar-item">Cuadrícula</div>
			</div>
			<div>
				<div class="<c:out value="${estiloBoton}" />" onclick="botonCambiarTamCelda(event)">Cambiar tamaño de celda</div>
			</div>
		</div>
		
		<!-- TODO ajustar para que se vea bien, no respeta el mismo margen que el contenido! --> 
		<div style="margin-left:12%;height: 100%">
			<div class="w3-container w3-dark-grey"  style="height:10%">
			  <h1>Editor de niveles</h1>
			</div>
		
			<div class="w3-container container" style="height:90%">
				<!-- div class="container" -->
					<div class="grid" style="height:100%">
						<c:forEach var="numFila" begin="1" end="50">
							<c:forEach var="numColumna" begin="1" end="50">
								<div class="celda" id='<c:out value="${numFila}_${numColumna}" />' 
									onmouseenter="funEntrarCelda(event)"
									onclick="funClickCelda(event)">
								</div>
							</c:forEach>
						</c:forEach>
					</div>
				<!--/div-->
			</div>
		</div>
	</body>
</html>
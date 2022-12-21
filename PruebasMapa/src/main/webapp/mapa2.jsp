<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html>
<html>
	<title>Editor de niveles</title>
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
	<link rel="stylesheet" href="css/estilos2.css"/>
	<script type="text/javascript" src="js/funciones.js"></script>

	<body>

		<div class="w3-sidebar w3-bar-block w3-light-grey" style="width:10%">
		  <a href="#" class="w3-bar-item w3-button" 			   onclick="alert('Link 1')">Link 1</a>
		  <a href="#" class="w3-bar-item w3-button w3-hover-black" onclick="alert('Link 2')">Link 2</a>
		  <a href="#" class="w3-bar-item w3-button w3-hover-green" onclick="alert('Link 3')">Link 3</a>
		  <a href="#" class="w3-bar-item w3-button w3-hover-blue"  onclick="alert('Link 4')">Link 4</a>
		  <a href="#" class="w3-bar-item w3-button w3-hover-red"   onclick="alert('Link 5')">Link 5</a>
		</div>
		
		<div style="margin-left:10%;height: 100%">
			<div class="w3-container w3-dark-grey"  style="height:10%">
			  <h1>Editor de niveles</h1>
			</div>
		
			<div class="w3-container container"  style="height:90%">
				<!-- div class="container" -->
					<div class="grid" style="height:100%">
						<c:forEach var="i" begin="1" end="2500">
							<div class="celda" id="<c:out value="${i}" />" 
								onmouseenter="entrarCelda(event)"
								onclick="clickCelda(<c:out value='${i}'/>)">
							</div>
						</c:forEach>
					</div>
				<!--/div-->
			</div>
		</div>
	</body>
</html>
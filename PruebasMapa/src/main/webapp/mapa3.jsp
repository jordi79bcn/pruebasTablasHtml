<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<TITLE>Add/Remove dynamic rows in HTML table</TITLE>
<link rel="stylesheet" href="css/estilos.css">

</HEAD>
<BODY>

	<div class="container">
		<table border="1">
			<c:forEach var="i" begin="1" end="100">
				<tr>
					<c:forEach var="j" begin="1" end="100">
						<td class="cell" id="<c:out value="${i}" />">
							<c:out value="${i}" />,<c:out value="${j}" /> 
						</td>
					</c:forEach>
				</tr>
			</c:forEach>
		</table>
	</div>				

	<INPUT type="button" value="Crear tabla"
		onclick="crearTabla('dataTable')" />

	<INPUT type="button" value="Añadir fila"
		onclick="anadirFila('dataTable')" />
	<INPUT type="button" value="Añadir columna"
		onclick="anadirColumna('dataTable')" />

	<INPUT type="button" value="Borrar Fila"
		onclick="borrarFila('dataTable')" />
	<INPUT type="button" value="Borrar Columna"
		onclick="borrarColumna('dataTable')" />

	<INPUT type="button" value="aumentar casilla"
		onclick="cambiarTamanoCasilla2('dataTable', 20)" />
	<INPUT type="button" value="reducir casilla"
		onclick="cambiarTamanoCasilla2('dataTable', -20)" />

	<TABLE id="dataTable" border="1">
	</TABLE>

</BODY>
</HTML>
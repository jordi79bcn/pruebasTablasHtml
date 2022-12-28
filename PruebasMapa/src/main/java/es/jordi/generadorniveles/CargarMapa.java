package es.jordi.generadorniveles;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class CargarMapa
 */
@WebServlet("/cargarMapa")
public class CargarMapa extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    public CargarMapa() {
        super();
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		System.out.println("hola! soy " + CargarMapa.class);
		String[] tiposSuelo = {"rojo", "verde", "blanco"};
		request.setAttribute("tiposSuelo", tiposSuelo);

        RequestDispatcher requestDispatcher = request.getRequestDispatcher("/mapa2.jsp");
        requestDispatcher.forward(request, response);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}
}
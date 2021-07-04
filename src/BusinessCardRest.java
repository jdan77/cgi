import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.json.JSONObject;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;

@WebServlet("/BusinessCards/*")

public class BusinessCardRest extends HttpServlet {

    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response)
            throws IOException, ServletException {

        response.setContentType("text/html");
        PrintWriter output = response.getWriter();

        ArrayList<BusinessCard> businessCards = BusinessCards.getInstance().getCards();
        ArrayList<String> jsonStrings = new ArrayList<String>();

        if (!businessCards.isEmpty()) {
            for (BusinessCard bc : businessCards) {

                String json = "{";
                json += "\"id\": " + JSONObject.quote(bc.getId()) + ",\n";
                json += "\"name\": " + JSONObject.quote(bc.getName()) + ",\n";
                json += "\"surName\": " + JSONObject.quote(bc.getSurName()) + ",\n";
                json += "\"telephone\": " + JSONObject.quote(bc.getTelephone()) + ",\n";
                json += "\"email\": " + JSONObject.quote(bc.getEmail()) + ",\n";
                json += "\"image\": " + JSONObject.quote(bc.getImage()) + "\n";
                json += "}\n";
                jsonStrings.add(json);
            }
            output.println("[" + String.join(",\n", jsonStrings) + "]");
        } else
            output.println("{}");

        output.close();  // Always close the output writer
    }


    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        BusinessCards.getInstance().addCard(createCard(req));
    }

    @Override
    protected void doDelete(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String id = req.getParameter("id");
        BusinessCards.getInstance().delCard(id);
    }

    @Override
    protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String id = req.getParameter("id");
        BusinessCard bc = createCard(req);

        BusinessCards.getInstance().updateCard(id, bc);
    }


    private BusinessCard createCard(HttpServletRequest req) {
        String name = req.getParameter("name");
        String surName = req.getParameter("surName");
        String telephone = req.getParameter("telephone");
        String email  = req.getParameter("email");
        String image = req.getParameter("image");

        return new BusinessCard(name, surName, telephone, email, image);
    }
}
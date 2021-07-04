import java.util.ArrayList;

public class BusinessCards {
    private ArrayList<BusinessCard> cards;

    public BusinessCards() {
        this.cards = new ArrayList<BusinessCard>();
        cards.add(new BusinessCard("Jörgen", "Danielsson", "0701111111", "joda@joda.nu", "ER3232222222222222222222222"));
    }

    public void addCard(BusinessCard businessCard){

    }

    public ArrayList<BusinessCard> getCards() {

        return cards;
    }
}

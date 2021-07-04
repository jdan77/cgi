import java.util.ArrayList;

public class BusinessCards {
    private ArrayList<BusinessCard> cards;

    private static BusinessCards instance = new BusinessCards();

    public static BusinessCards getInstance() {
        return instance;
    }

    private BusinessCards() {
        this.cards = new ArrayList<BusinessCard>();
    }

    public void addCard(BusinessCard bc){
        if (find(bc) == -1)
            cards.add(bc);
    }

    public ArrayList<BusinessCard> getCards() {
        return cards;
    }

    public void delCard(String id) {
        int index = findById(id);
        if ( index != -1)
            cards.remove(index);
    }

    public void updateCard(String id, BusinessCard bc) {
        int index = findById(id);
        if ( index != -1) {
            cards.get(index).setName(bc.getName());
            cards.get(index).setSurName(bc.getSurName());
            cards.get(index).setTelephone(bc.getTelephone());
            cards.get(index).setEmail(bc.getEmail());
            cards.get(index).setImage(bc.getImage());
        }

    }

    private int find(BusinessCard bc){
        for (int i=0; i < cards.size(); i++) {
            if (bc.getName().equals(cards.get(i).getName()) && bc.getSurName().equals(cards.get(i).getSurName()) && bc.getTelephone().equals(cards.get(i).getTelephone()) && bc.getEmail().equals(cards.get(i).getEmail()) && bc.getImage().equals(cards.get(i).getImage()))
                return i;
        }

        return -1;
    }


    private int findById(String id) {
        for (int i=0; i < cards.size(); i++) {
            if (cards.get(i).getId().equals(id))
                return i;
        }
        return -1;
    }
}

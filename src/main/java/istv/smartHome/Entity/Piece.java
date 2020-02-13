package istv.smartHome.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.io.Serializable;

@Entity
public class Piece implements Serializable {
    @Id @GeneratedValue
    private Long id_piece;

    @ManyToOne
    @JoinColumn(name = "id_Maison")
    private Maison maison;

    @JsonIgnore
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name="Id_Capteur",referencedColumnName = "Id_Capteur")
    private Capteur capteur;

    private String pseudo;
    private String typePiece;

    public Piece(Maison maison, Capteur capteur, String pseudo, String typePiece) {
        this.maison = maison;
        this.capteur = capteur;
        this.pseudo = pseudo;
        this.typePiece = typePiece;
    }

    public Piece() {
    }


    public Maison getMaison() {
        return maison;
    }

    public Capteur getCapteur() {
        return capteur;
    }

    public Number getId_piece() {
        return id_piece;
    }

    public String getPseudo() {
        return pseudo;
    }

    public String getTypePiece() {
        return typePiece;
    }

    public void setId_piece(Long id_piece) {
        this.id_piece = id_piece;
    }

    public void setMaison(Maison maison) {
        this.maison = maison;
    }

    public void setCapteur(Capteur capteur) {
        this.capteur = capteur;
    }

    public void setPseudo(String pseudo) {
        this.pseudo = pseudo;
    }

    public void setTypePiece(String typePiece) {
        this.typePiece = typePiece;
    }
}

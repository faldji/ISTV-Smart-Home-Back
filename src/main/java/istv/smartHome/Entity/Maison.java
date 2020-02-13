package istv.smartHome.Entity;

import javax.persistence.*;
import javax.validation.constraints.DecimalMax;
import javax.validation.constraints.DecimalMin;
import java.io.Serializable;
import java.util.Collection;

@Entity
public class Maison implements Serializable {

    @Id @GeneratedValue
    private Long id_Maison;
    @ManyToOne
    @JoinColumn(name = "Identifiant_Device")
    private Utilisateur utilisateur;

    @DecimalMin("1") @DecimalMax("4")
    private int nb_piece;

    @OneToMany(mappedBy = "maison",fetch = FetchType.LAZY)
    private Collection <Piece>pieces;

    public Long getId_Maison() {
        return id_Maison;
    }

    public void setId_Maison(Long id_Maison) {
        this.id_Maison = id_Maison;
    }

    public Maison(Utilisateur utilisateur, int nb_piece) {
        this.utilisateur = utilisateur;
        this.nb_piece = nb_piece;
    }

    public Utilisateur getUtilisateur() {
        return utilisateur;
    }

    public Number getNb_piece() {
        return nb_piece;
    }

    public void setUtilisateur(Utilisateur utilisateur) {
        this.utilisateur = utilisateur;
    }

    public void setNb_piece(int nb_piece) {
        this.nb_piece = nb_piece;
    }


    public Maison() {

    }

}

package istv.smartHome.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

@Entity

public class Capteur {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private  long Id_Capteur ;
    private double Temperature  ;
    private double Luminosite  ;

    @JsonIgnore
    @OneToOne(mappedBy = "capteur")
    private Piece pieces;

    public Piece getPieces() {
        return pieces;
    }

    public void setPieces(Piece pieces) {
        this.pieces = pieces;
    }

    public Capteur() {
    }

    public Capteur(double temperature, double luminosite, Piece pieces) {
        Temperature = temperature;
        Luminosite = luminosite;
        this.pieces = pieces;
    }

    public long getId_Capteur() {
        return Id_Capteur;
    }

    public double getTemperature() {
        return Temperature;
    }

    public Capteur(double temperature, double luminosite) {
        Temperature = temperature;
        Luminosite = luminosite;
    }

    public void setTemperature(double temperature) {
        Temperature = temperature;
    }

    public double getLuminosite() {
        return Luminosite;
    }

    public void setLuminosite(double luminosite) {
        Luminosite = luminosite;
    }

    public void setId_Capteur(long id_Capteur) {
        Id_Capteur = id_Capteur;
    }
}

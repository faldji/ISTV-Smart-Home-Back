package istv.smartHome.Entity;

import javax.persistence.*;

@Entity

public class Capteur {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private  long Id_Capteur ;
    private double Temperature  ;
    private double Luminosite  ;

    public Capteur() {
    }

    public long getId_Capteur() {
        return Id_Capteur;
    }

    public double getTemperature() {
        return Temperature;
    }

    public Capteur(long id_Capteur, double temperature, double luminosite) {
        Id_Capteur = id_Capteur;
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

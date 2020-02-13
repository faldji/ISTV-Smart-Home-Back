package istv.smartHome.Entity;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;

@Entity
public class Utilisateur implements Serializable {
    @Id
    @GeneratedValue
    private Long ID;
    @NotNull
    private String Identifiant_Device;
    @NotNull
    private String Identifiant_User;
    private boolean Active;
    private boolean FirstUsage;



    //proprieties

    public String getIdentifiant_Device() {
        return Identifiant_Device;
    }

    public void setIdentifiant_Device(String identifiant_Device) {
        Identifiant_Device = identifiant_Device;
    }

    public void setIdentifiant_User(String identifiant_User) {
        Identifiant_User = identifiant_User;
    }

    public String getIdentifiant_User() {
        return Identifiant_User;
    }



    public boolean isActive() {
        return Active;
    }
    public void setActive(boolean active) {
        Active = active;
    }
    public boolean isFirstUsage() {
        return FirstUsage;
    }
    public void setFirstUsage(boolean firstUsage) {
        FirstUsage = firstUsage;
    }
    public Utilisateur(String identifiant_Device, String identifiant_User,boolean active, boolean firstUsage) {
        Identifiant_Device = identifiant_Device;
        Identifiant_User = identifiant_User;
        Active = active;
        FirstUsage = firstUsage;
    }

    /**
     *
     */
    public Utilisateur() {
        super();
    }



}

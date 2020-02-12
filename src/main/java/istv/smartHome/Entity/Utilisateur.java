package istv.smartHome.Entity;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
@Entity
public class Utilisateur implements Serializable {
    @Id
    @GeneratedValue
    private Long Id_devise;
    private boolean Active;
    private boolean FirstUsage;





    //proprieties
    public Long getId_devise() {
        return Id_devise;
    }
    public void setId_devise(Long id_devise) {
        Id_devise = id_devise;
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
    /**
     * @param active
     * @param firstUsage
     */
    public Utilisateur(boolean active, boolean firstUsage) {
        super();
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

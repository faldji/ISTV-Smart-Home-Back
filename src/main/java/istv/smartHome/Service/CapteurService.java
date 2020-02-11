package istv.smartHome.Service;

import istv.smartHome.Entity.Capteur;
import istv.smartHome.Repository.CapteurRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


/**
 * Services liés aux capteurs
 */
@Service
public class CapteurService {

    private static final Logger log = LoggerFactory.getLogger(CapteurService.class);

    @Autowired
    CapteurRepository capteurRepository;

    //CREATE UPDATE

    /**
     * Sauvegarde d'un capteur
     * @param c Capteur à sauvegarder
     * @return True / False
     */
    public boolean saveCapteur(Capteur c){
        if(this.capteurRepository.findById(c.getId_Capteur())==null){
            System.out.println("[SAVE]Capteur "+c);
            Capteur res = capteurRepository.save(c);
            if(res == null)return false;
            return true;
        }else{
            return false;
        }
    }

    //GET

    /**
     * Recherche d'un capteur par son id
     * @param id Id du capteur
     * @return Capteur ou NULL
     */
    public Capteur getCapteurById(long id){
        return capteurRepository.findById(id);
    }

    /**
     * Retourne la liste de tout les capteurs
     * @return Liste de capteurs ou NULL
     */
    public List<Capteur> getAll(){
        return capteurRepository.findAll();
    }

    /**
     * Modifie un capteur
     * @param c Capteur à modifier
     * @return True / False
     */
    public Capteur update(Capteur c){
        return this.capteurRepository.save(c);
    }

    /**
     * Supprime un capteur
     * @param c Capteur a supprimer
     */
    public void delete(Capteur c){
        this.capteurRepository.delete(c);
    }
}

package istv.smartHome.Service;

import java.util.List;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import istv.smartHome.Repository.UtilisateurRepository;
import istv.smartHome.Entity.Utilisateur;

@RestController
public class UtilisateurRestService {
    @Autowired
    private UtilisateurRepository utilisateur;


    @RequestMapping(value="/AllUtlisateur",method = RequestMethod.GET)
    public List<Utilisateur> FindAllUtilisateur(){
        return utilisateur.findAll();

    }
    @RequestMapping(value="/Utlisateur/{Id_Utilisateur}",method = RequestMethod.GET)
    public Utilisateur GetUtilisateurById(@PathVariable Long Id_Utilisateur) {
        return utilisateur.findById(Id_Utilisateur).orElse(null);
    }
    @RequestMapping(value="/AddUser", method=RequestMethod.POST)
    public Utilisateur AddUtilisateur(@RequestBody Utilisateur U) {
        return utilisateur.save(U);
    }
    @RequestMapping(value="/deleteUser/{id}", method=RequestMethod.DELETE)
    public boolean DeleteUtilisateur(Long Id_user) {
        utilisateur.deleteById(Id_user);
        return true;
    }

    @RequestMapping(value="/UpdateUtlisateur/{Id_Utilisateur}", method=RequestMethod.PUT)
    public Utilisateur updateUtilisateur(@PathVariable Long Id_Utilisateur, @RequestBody Utilisateur U) {

        U.setId_devise(Id_Utilisateur);
        return utilisateur.save(U);

    }

    // liste des device active
    @RequestMapping(value="/AllUtlisateurActive",method = RequestMethod.GET)
    public List<Utilisateur> UtilisateurActive(){
        return utilisateur.utilisateurActive();
    }

    // liste des utilisateurs qui utilisent l'application pour la premiere fois
    @RequestMapping(value="/AllUtlisateurFirstUse",method = RequestMethod.GET)
    public List<Utilisateur> UtilisateursPremiereUse(){
        return utilisateur.FirstUtilisation();
    }

    /*
     * @RequestMapping(value="/UtilsateurActive/{Id_device}",method =
     * RequestMethod.GET) public Utilisateur utilisateurActiveByID(@PathVariable
     * Long Id_device) {
     *
     * return utilisateur.utilisateurActiveById(Id_device); }
     */






}

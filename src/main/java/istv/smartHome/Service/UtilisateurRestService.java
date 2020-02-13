package istv.smartHome.Service;

import java.util.List;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import istv.smartHome.Repository.UtilisateurRepository;
import istv.smartHome.Entity.Utilisateur;

import javax.validation.Valid;

@RestController
public class UtilisateurRestService {
    @Autowired
    private UtilisateurRepository utilisateur;

   // chercher tout les device dans a base de donnee
    @RequestMapping(value="/AllUtlisateur",method = RequestMethod.GET)
    public List<Utilisateur> FindAllUtilisateur(){
        return utilisateur.findAll();

    }

    // recherche d'un device par son ID
    @RequestMapping(value="/Utlisateur",method = RequestMethod.GET)
    public Utilisateur GetUtilisateurById(@RequestParam String Id_Device) {
        return utilisateur.GetDeviceParId(Id_Device);
    }
//ajouter un nouveau device
    @RequestMapping(value="/AddUser", method=RequestMethod.POST)
    public Utilisateur AddUtilisateur(@RequestBody Utilisateur U) {
        return utilisateur.save(U);
    }

    // supression d'un device
    @RequestMapping(value="/deleteUser", method=RequestMethod.DELETE)
    public boolean DeleteUtilisateur(@RequestParam String Id_Device) {
        Utilisateur U = utilisateur.GetDeviceParId(Id_Device);
        utilisateur.delete(U);
        return true;
    }

    // modifier un device
    @RequestMapping(value="/UpdateUtlisateur", method=RequestMethod.PUT)
    public String updateUtilisateur(@RequestParam String Id_Device,@RequestParam(value = "isActive",required = false) boolean isActive, @RequestParam(value = "isFirstUsage",required = false) boolean isFirstUse) {
       Utilisateur user  = utilisateur.GetDeviceParId(Id_Device);
      if(user == null)
          return"utilisateur introuvable";
      else{
          if(!isActive ){
              user.setActive(isActive);
          }
          if(!isFirstUse) {
              user.setFirstUsage(isFirstUse);
          }
      }
        utilisateur.save(user);
      return "modification termine";

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








}

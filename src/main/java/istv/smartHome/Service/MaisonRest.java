package istv.smartHome.Service;

import istv.smartHome.Entity.Maison;
import istv.smartHome.Entity.Piece;
import istv.smartHome.Repository.MaisonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class MaisonRest  {

    @Autowired
     private MaisonRepository maisonRepository;

    @RequestMapping(value = "/AllMaison",method = RequestMethod.GET)
    public List<Maison> getAllMaison(){
        return maisonRepository.findAll();
    }
    @RequestMapping(value = "/Maison",method = RequestMethod.GET)
    public Maison GetMaisonByID(@RequestParam Long Id){
        return maisonRepository.findById(Id).orElse(null);
    }
    @RequestMapping(value = "/Maison",method = RequestMethod.DELETE)
    public String DeleteMaison(Long idm){
      Maison maison= GetMaisonByID(idm);
       maisonRepository.delete(maison);
       return "Maison supprimer";
    }
    @RequestMapping(value = "/MaisonDevice",method = RequestMethod.GET)
    public Maison getMaisonParDevice(@RequestParam String Id_device){
        return maisonRepository.getMaisonParDevice(Id_device);
    }

    @RequestMapping(value = "/MaisonUser",method = RequestMethod.GET)
    public Maison getMaisonParUser(@RequestParam String Id_User){
        return maisonRepository.getMaisonParUser(Id_User);
    }






}

package istv.smartHome.Service;

import istv.smartHome.Entity.Maison;
import istv.smartHome.Repository.MaisonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
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

}

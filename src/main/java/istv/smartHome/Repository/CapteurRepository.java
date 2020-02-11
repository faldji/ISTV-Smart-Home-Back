package istv.smartHome.Repository;

import istv.smartHome.Entity.Capteur;
import org.springframework.data.repository.CrudRepository;

import java.util.List;


    public interface CapteurRepository extends CrudRepository<Capteur,Long> {
        Capteur findById(long id);
        List<Capteur> findAll();
    }

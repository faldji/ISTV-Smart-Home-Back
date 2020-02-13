package istv.smartHome.Repository;

import istv.smartHome.Entity.Capteur;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;


    public interface CapteurRepository extends CrudRepository<Capteur,Long> {
        Capteur findById(long id);
        List<Capteur> findAll();
        @Query("select C from Capteur C where C.pieces.pseudo like :x")
        public Capteur infoCapteurParPirce(@Param("x") String Pseudo);
    }

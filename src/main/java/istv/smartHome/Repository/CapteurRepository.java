package istv.smartHome.Repository;

import istv.smartHome.Entity.Capteur;
import istv.smartHome.Entity.Piece;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.Collection;
import java.util.List;


    public interface CapteurRepository extends CrudRepository<Capteur,Long> {
        Capteur findById(long id);
        List<Capteur> findAll();

        @Query("select C.Temperature from Capteur C where C.pieces.typePiece like :x ")
        public double Gettemperature(@Param("x") String  typePiece);

        Collection<Capteur> findCapteursByPieces(Piece piece);
    }

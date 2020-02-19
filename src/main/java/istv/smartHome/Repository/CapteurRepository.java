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

        @Query("select C.Temperature from Capteur C where C.pieces.typePiece like :x and C.pieces.maison.utilisateur.deviceId like :y ")
        public double Gettemperature(@Param("x") String  typePiece,@Param("y") String deviceId);

        @Query("select C.Luminosite from Capteur C where C.pieces.typePiece like :x and C.pieces.maison.utilisateur.deviceId like :y ")
        public double GetLuminosite(@Param("x") String  typePiece,@Param("y") String deviceId);

        @Query("select C from Capteur C where C.pieces.typePiece like :x and C.pieces.maison.utilisateur.deviceId like :y ")
        public Capteur GetEtatPiece(@Param("x") String  typePiece,@Param("y") String deviceId);

        Collection<Capteur> findCapteursByPieces(Piece piece);
    }

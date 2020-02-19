package istv.smartHome.Repository;

import istv.smartHome.Entity.Piece;
import istv.smartHome.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.parameters.P;

import java.util.Collection;
import java.util.List;

public interface PieceRepository extends CrudRepository<Piece,Long> {
//    @Query("select P from Piece P where P.id_piece like :x ")
//    public Piece GetPieceById(@Param("x") Long id_piece);

   // Piece getPieceById(long id);
    @Query("select P from Piece P where P.maison.id_Maison = :x")
    public Piece GetPieceByMaison(@Param("x") Long idMaison);
    @Query("select M.pieces from Maison M where M.utilisateur.deviceId like :x")
    public List<Piece> GetpieceByDevice(@Param("x") String DeviceId);
   // User getUserByDeviceId(String deviceId);
   // Collection<User> getUsersBy();


}

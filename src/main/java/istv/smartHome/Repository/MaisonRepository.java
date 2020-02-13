package istv.smartHome.Repository;

import istv.smartHome.Entity.Maison;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface MaisonRepository  extends JpaRepository<Maison,Long>{
    @Query("select M from Maison M where M.utilisateur.Identifiant_Device like :c")
    public Maison getMaisonParDevice(@Param("c") String Id_device);
    @Query("select M from Maison M where M.utilisateur.Identifiant_User like :c")
    public Maison getMaisonParUser(@Param("c") String Id_device);

}

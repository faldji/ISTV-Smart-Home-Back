package istv.smartHome.Repository;

import istv.smartHome.Entity.Maison;
import istv.smartHome.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface MaisonRepository  extends CrudRepository<Maison,Long> {
    @Query("select M from Maison M where M.utilisateur.id like :c")
    public Maison getMaisonParDevice(@Param("c") String Id_device);
    @Query("select M from Maison M where M.utilisateur.deviceId like :c")
    public Maison getMaisonParUser(@Param("c") String Id_device);
    Maison findMaisonByUtilisateur(User utilisateur);
}

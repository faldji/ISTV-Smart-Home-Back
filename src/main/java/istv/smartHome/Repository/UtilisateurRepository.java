package istv.smartHome.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import istv.smartHome.Entity.Utilisateur;
import org.springframework.data.repository.query.Param;

public interface UtilisateurRepository extends JpaRepository<Utilisateur, Long> {

    @Query("select U from Utilisateur U where U.Active = true")
    public List<Utilisateur> utilisateurActive();
    @Query("select U from Utilisateur U where U.FirstUsage = true")
    public List<Utilisateur> FirstUtilisation();
    @Query("select U from Utilisateur U where U.Identifiant_Device like :x")
    public Utilisateur GetDeviceParId(@Param("x") String Id_device);

    /*
     * @Query("select U from Utilisateur where U.Active = true AND U.Id_device = :x "
     * ) public Utilisateur utilisateurActiveById(@Param(":x") Long Id_device);
     */
}

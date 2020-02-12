package istv.smartHome;

import istv.smartHome.Repository.UtilisateurRepository;
import istv.smartHome.Entity.Utilisateur;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class SmartHomeApplication implements CommandLineRunner {
    @Autowired
    private UtilisateurRepository userRepo;
    public static void main(String[] args) {
        SpringApplication.run(SmartHomeApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        Utilisateur U1 = new Utilisateur(true,true);
        Utilisateur U2 = new Utilisateur(true,false);
        Utilisateur U3 = new Utilisateur(false,true);
        Utilisateur U4 = new Utilisateur(false,true);
        Utilisateur U5 = new Utilisateur(true,false);
        Utilisateur U6 = new Utilisateur(false,false);
        Utilisateur U7 = new Utilisateur(true,true);

        userRepo.save(U1);
        userRepo.save(U2);
        userRepo.save(U3);
        userRepo.save(U4);
        userRepo.save(U5);
        userRepo.save(U6);
        userRepo.save(U7);
    }
}

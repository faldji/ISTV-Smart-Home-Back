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
        Utilisateur U1 = new Utilisateur("x1231","user1",true,true);
        Utilisateur U2 = new Utilisateur("x1232","user2",true,false);
        Utilisateur U3 = new Utilisateur("x1233","user3",false,true);
        Utilisateur U4 = new Utilisateur("x1234","user4",false,true);
        Utilisateur U5 = new Utilisateur("x1235","user5",true,false);
        Utilisateur U6 = new Utilisateur("x1236","user6",false,false);
        Utilisateur U7 = new Utilisateur("x1237","user7",true,true);

        userRepo.save(U1);
        userRepo.save(U2);
        userRepo.save(U3);
        userRepo.save(U4);
        userRepo.save(U5);
        userRepo.save(U6);
        userRepo.save(U7);
    }
}

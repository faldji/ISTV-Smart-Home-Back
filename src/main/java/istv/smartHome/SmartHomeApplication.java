package istv.smartHome;

import istv.smartHome.Entity.Capteur;
import istv.smartHome.Entity.Maison;
import istv.smartHome.Entity.Piece;
import istv.smartHome.Repository.CapteurRepository;
import istv.smartHome.Repository.MaisonRepository;
import istv.smartHome.Repository.PieceRepository;
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

    @Autowired
    private PieceRepository pieceRepository ;

    @Autowired
    CapteurRepository capteurRepository ;

    @Autowired
    MaisonRepository maisonRepository ;
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

        Capteur c1=new Capteur(12.12, 8.00);
        Maison m1 =new Maison(U1,1);

        Capteur c2=new Capteur(11.00, 11.00);
        Maison m2 =new Maison(U2,3);

        Capteur c3=new Capteur(40.12, 8.00);
        Maison m3 =new Maison(U3,2);



        maisonRepository.save(m1);
        maisonRepository.save(m2);
        maisonRepository.save(m3);

        pieceRepository.save(new Piece(m1,c1,"opo","studio"));
        pieceRepository.save(new Piece(m2,c2,"free","salon"));
        pieceRepository.save(new Piece(m3,c3,"boot","cuisin"));







    }
}

package istv.smartHome.Service;

import istv.smartHome.Entity.Capteur;
import istv.smartHome.Entity.Maison;
import istv.smartHome.Entity.Piece;
import istv.smartHome.Entity.User;
import istv.smartHome.Repository.CapteurRepository;
import istv.smartHome.Repository.MaisonRepository;
import istv.smartHome.Repository.PieceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Random;

@Service
public class ConfigService {
    @Autowired
    MaisonRepository maisonRepository;
    @Autowired
    PieceRepository pieceRepository;
    @Autowired
    CapteurRepository capteurRepository;

    public Collection<Piece> addMaisonWithPiece(User user, int nbPiece, Collection<Piece> pieces) {
        Random random = new Random();
        Maison newMaison = new Maison();
        user.setConfiguredHouse(true);
        newMaison.setNb_piece(nbPiece);
        newMaison.setUtilisateur(user);
        Maison savedMaison  = maisonRepository.save(newMaison);
        Collection<Piece> newPieces = new ArrayList<>();
        for (Piece piece : pieces){
            double rndLum = random.nextDouble()*500;
            double rndTemp = (double) random.nextInt(100 - 10)-10;
            Capteur capteur = new Capteur();
            capteur.setLuminosite(rndLum);
            capteur.setTemperature(rndTemp);
            piece.setCapteur(capteur);
            piece.setMaison(savedMaison);
            newPieces.add(piece);
        }
        Collection<Piece> savedPieces = (Collection<Piece>)pieceRepository.saveAll(newPieces);
        if (savedPieces.size() == 0){
            maisonRepository.delete(savedMaison);
            return null;
        }

        return savedPieces;
    }
}

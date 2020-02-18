package istv.smartHome.Service;

import istv.smartHome.Repository.PieceRepository;
import istv.smartHome.Entity.Piece;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class PieceRest {

    @Autowired
    private PieceRepository pieceR;

    //lister tous les pieces
//    @RequestMapping(value = "/AllPiece",method = RequestMethod.GET)
////    public List<Piece> getAllPiece() {
////        return pieceR.findAll();
////    }

    //Rechercher avec Id
    @RequestMapping(value="/IdPiece", method=RequestMethod.GET)
    public Piece GetPieceById(@RequestParam Long id_piece) {
        return pieceR.findById(id_piece).orElse(null);
    }


    // Ajouter piece
    @RequestMapping(value="/Ajoutpiece", method=RequestMethod.POST)
    public Piece add(@RequestBody Piece p) {
        return pieceR.save(p);
    }

    //Supprimer une par Id/Piece
    @RequestMapping(value="/Supprimerpiece", method=RequestMethod.DELETE)
    public boolean SupprimerPiece(@RequestParam Long id_piece) {
        Piece p= pieceR.findById(id_piece).orElse(null);
        pieceR.delete(p);
        return true;
    }


   //Modifie une piece
    @RequestMapping(value="/Modifiepiece", method=RequestMethod.PUT)
    public Piece updatePiece(@RequestParam Long id_piece) {
        Piece p= pieceR.findById(id_piece).orElse(null);
        p.setId_piece(id_piece);
        return pieceR.save(p);

    }



}

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

    @RequestMapping(value = "/AllPiece",method = RequestMethod.GET)
    private List<Piece> getAllPiece() {
        return pieceR.findAll();
    }

    @RequestMapping(value="/piece/{id_piece}", method=RequestMethod.GET)
    private Piece getPieceByid(@PathVariable Long id_piece) {
        return pieceR.findById(id_piece).orElse(null);
    }

    @RequestMapping(value="/Ajoutpiece", method=RequestMethod.POST)
    private Piece add(@RequestBody Piece p) {
        return pieceR.save(p);
    }

    @RequestMapping(value="/Supprimerpiece/{id_piece}", method=RequestMethod.DELETE)
    private boolean supprimer(@PathVariable Long id_piece) {
        pieceR.deleteById(id_piece);
        return true;
    }

    @RequestMapping(value="/Modifiepiece/{id_piece}", method=RequestMethod.PUT)
    private Piece update(@PathVariable Long id_piece ,@RequestBody Piece p ) {
        p.setId_piece(id_piece);
        return pieceR.save(p);
    }

}

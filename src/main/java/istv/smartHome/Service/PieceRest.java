package istv.smartHome.Service;

import istv.smartHome.Entity.Piece;
import istv.smartHome.Repository.PieceRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PieceRest {


    private final PieceRepository pieceR;


    public PieceRest(PieceRepository pieceR) {
        this.pieceR = pieceR;
    }

    public Piece getPieceById(Long id){
        return pieceR.findById(id).orElse(null);

    }
    public Piece addPiece(Piece p){return pieceR.save(p);}

    public boolean deletePiece(Piece p){
        pieceR.delete(p);
        return true;
    }

    public List<Piece> getPieceByDevice(String idDevice){
        List<Piece> listePiece = pieceR.GetpieceByDevice(idDevice);
        if(listePiece==null)
            return null;
        return listePiece;
    }
}

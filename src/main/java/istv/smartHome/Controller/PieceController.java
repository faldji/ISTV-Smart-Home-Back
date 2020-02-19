package istv.smartHome.Controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import istv.smartHome.Entity.Piece;
import istv.smartHome.Entity.User;
import istv.smartHome.Repository.PieceRepository;
import istv.smartHome.Service.PieceRest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.List;

@RestController
@Api(value="ISTV-Smart-Home", description = "Gestion d'une Piece", produces = "application/json")
public class PieceController {
private final PieceRest pieceRest;
@Autowired
private PieceRepository pieceRepository;


    public PieceController(PieceRest pieceRest) {
        this.pieceRest = pieceRest;
    }

    @ApiOperation(value = "chercher une piece", response = Piece.class)
    @GetMapping("/Piece")
    @ResponseBody
    public ResponseEntity<Piece> GetPieceById(@RequestParam Long id){

        Piece p =pieceRepository.findById(id).orElse(null);
        if(p==null)
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        return new ResponseEntity<>(p,HttpStatus.OK);

    }

    @ApiOperation(value = "chercher une piece par maison ", response = Piece.class)
    @GetMapping("/Piece/maison")
    @ResponseBody
    public ResponseEntity<Piece> GetPieceByMaison(@RequestParam Long idMaison){
        Piece p =pieceRepository.GetPieceByMaison(idMaison);
        if(p==null)
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        return new ResponseEntity<>(p,HttpStatus.OK);

    }

    @ApiOperation(value = "chercher une piece par id device ", response = Piece.class)
    @GetMapping("/Piece/maison/device")
    @ResponseBody
    public ResponseEntity<Collection<Piece>> getPiecePardevice(@RequestParam String idDevice){
       List<Piece> listePiece = pieceRest.getPieceByDevice(idDevice);
        if(listePiece==null)
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        return new ResponseEntity<>(listePiece,HttpStatus.OK);

    }



    }





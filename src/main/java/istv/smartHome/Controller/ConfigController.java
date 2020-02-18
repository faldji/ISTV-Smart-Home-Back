package istv.smartHome.Controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import istv.smartHome.Entity.Maison;
import istv.smartHome.Entity.Piece;
import istv.smartHome.Entity.User;
import istv.smartHome.Service.ConfigService;
import istv.smartHome.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Collection;

/**
 * Controlleur dédié a la manipulation des Ajouts maisons et des Pieces
 */
@RestController
@Api(value="ISTV-Smart-Home", description = "Gestion des config des maisons", produces = "application/json")
public class ConfigController {
    @Autowired
    ConfigService configService;
    @Autowired
    UserService userService;
    /**
     * Ajoute une nouvelle maison et ses pieces dans la BD
     *
     * @param deviceId : id de l'utilisateur à créer
     * @param nbPiece : l'appareil est active ou pas
     * @param housesRoom : premiere utilisation
     *
     * @return ResponseEntity avec un String en fonction du déroulement de l'opération
     */
    @ApiOperation(value = "une nouvelle maison et ses pieces", response = String.class)
    @PostMapping("/config/save")
    @ResponseBody
    public ResponseEntity<String> registerHouseRoom(@RequestParam("deviceId") String deviceId,
                                                @RequestParam("nbPiece") int nbPiece,@RequestBody(required = true) Collection<Piece> housesRoom) {
        User user = userService.findUserByDeviceId(deviceId);
        if(user == null)
            return new ResponseEntity<>("pas de user avec ce id", HttpStatus.NOT_MODIFIED);
        if(user.isConfiguredHouse())
            return new ResponseEntity<>("userConfig dejà à true", HttpStatus.NOT_MODIFIED);
        if(nbPiece < 1 || nbPiece > 4)
            return new ResponseEntity<>("nbPiece non valid",HttpStatus.NOT_MODIFIED);
        if(housesRoom == null)
            return new ResponseEntity<>("pieces = null", HttpStatus.NOT_MODIFIED);
        if(housesRoom.size() != nbPiece)
            return new ResponseEntity<>("nbr pieces != nbPiece", HttpStatus.NOT_MODIFIED);
        Collection<Piece> newPiece = new ArrayList<>();

        if ( configService.addMaisonWithPiece(user,nbPiece,housesRoom) != null)
            return new ResponseEntity<>("true", HttpStatus.OK);

        return new ResponseEntity<>("false",
                HttpStatus.FORBIDDEN);
    }

}

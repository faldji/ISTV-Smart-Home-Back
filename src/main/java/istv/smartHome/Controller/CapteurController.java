package istv.smartHome.Controller;



import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import istv.smartHome.Entity.Capteur;
import istv.smartHome.Repository.CapteurRepository;
import istv.smartHome.Service.CapteurService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.persistence.Id;
import java.util.List;

    /**
     * Controlleur dédié a la manipulation des capteurs
     */
    @RestController
    @Api(value="ISTV-Smart-Home", description = "Opérations relatives à la gestion basique des capteurs", produces = "application/json")
    public class CapteurController {
        @Autowired
        CapteurService capteurService;

        @Autowired
        CapteurRepository capteurRepository;

        private static final Logger log = LoggerFactory.getLogger(CapteurController.class);

        /**
         * Récupération d'un capteur
         * @param  id du capteur
         * @return Capteur ou null
         */
        @ApiOperation(value = "Retourne un Capteur", response = Capteur.class)
        @GetMapping("/capteur")
        @ResponseBody
        public Capteur getCapteur(
                @RequestParam(value="id")long id
        ){
            System.out.println("[GET] Capteur by id : "+id);
            return capteurService.getCapteurById(id);
        }

        /**
         * Sauvegarde d'un capteur (CREATE and UPDATE)
         * @param tem Température  au capteur
         * @param lum Luminosité au capteur
         * @param id Id du capteur (Uniquement si il existe déjà)
         */
        @ApiOperation(value = "Sauvegarde un capteur", response = String.class)
        @PostMapping("/capteur")
        @ResponseBody
        public ResponseEntity<String> saveCapteur(
                @RequestParam(value="id") long id,
                @RequestParam(value="tem") double tem,
                @RequestParam(value="lum")double lum

        ){
            Capteur c = new Capteur();
            System.out.println("[SAVE] Capteur : "+c.toString());
            if(capteurService.saveCapteur(c))
                return new ResponseEntity<>("Le capteur à été enregistré",HttpStatus.ACCEPTED);
            else
                return new ResponseEntity<>("Une erreur est survenue lors de la sauvegarde du  capteur.", HttpStatus.NOT_MODIFIED);
        }

        /**
         * Retoure l'ensemble des capteurs
         * @return List de Capteurs
         */
        @ApiOperation(value = "Retourne la liste des capteurs", response = List.class)
        @GetMapping("/capteurs")
        @ResponseBody
        public List<Capteur> getAllCapteurs(){
            System.out.println("[GET] All Capteurs");
            return capteurService.getAll();
        }

        /**
         * Modification d'un capteur
         * @param id
         * @return Le capteur modifié ou null si erreur
         */
        @ApiOperation(value = "Modifie un capteur", response = Capteur.class)
        @PostMapping("/capteur/update")
        @ResponseBody
        public Capteur update(
                @RequestParam(value="id") long id,
                @RequestParam(value="datas",required = false)String datas
        ){
            Capteur c = this.capteurService.getCapteurById(id);
            if(c!=null){
                if(datas != null)c.setId_Capteur(id);
                this.capteurService.update(c);
                return c;
            }
            return null;
        }

        /**
         * Supression d'un capteur
         * @param id Id du capteur à supprimer
         */
        @ApiOperation(value = "Supprime un capteur", response = double.class)
        @DeleteMapping("capteur/delete")
        @ResponseBody
        public ResponseEntity<String> delete(
                @RequestParam(value="id")long id
        ){
            Capteur c = this.capteurService.getCapteurById(id);
            if(c != null){
                this.capteurService.delete(c);
                return new ResponseEntity<>("Capteur supprimé",HttpStatus.OK);
            }else{
                return new ResponseEntity<>("Capteur introuvable",HttpStatus.NOT_MODIFIED);
            }
        }



        @ApiOperation(value = "retourner la temperature d'une piece par user", response = double.class)
        @GetMapping("/capteur/temperature")
        @ResponseBody
        public ResponseEntity getTemperParpiece(@RequestParam String ty_piece,@RequestParam String id_device){
            Double temp
             = capteurRepository.Gettemperature(ty_piece,id_device);
            if(temp ==null)
                return new ResponseEntity<>("j'arrive pas a recuperer la temperature",
                        HttpStatus.FORBIDDEN);
            return new ResponseEntity<>(temp,HttpStatus.OK);
        }

        @ApiOperation(value = "retourner la luminosite d'une piece par user", response = double.class)
        @GetMapping("/capteur/luminosite")
        @ResponseBody
        public ResponseEntity getLuminoParpiece(@RequestParam String ty_piece,@RequestParam String id_device){
            Double temp
             = capteurRepository.GetLuminosite(ty_piece,id_device);
            if(temp ==null)
                return new ResponseEntity<>("j'arrive pas a recuperer la luminosite",
                        HttpStatus.FORBIDDEN);
            return new ResponseEntity<>(temp,HttpStatus.OK);
        }


        @ApiOperation(value = "retourner l'etat d'une piece par user", response = Capteur.class)
        @GetMapping("/capteur/Etat")
        @ResponseBody
        public ResponseEntity getEtatPiece(@RequestParam String ty_piece,@RequestParam String id_device){
        Capteur capteur
            = capteurRepository.GetEtatPiece(ty_piece,id_device);
            if(capteur ==null)
                return new ResponseEntity<>("j'arrive l'etat de la piece pas a recuperer la temperature",
                        HttpStatus.FORBIDDEN);
            return new ResponseEntity<>(capteur,HttpStatus.OK);
        }

    }



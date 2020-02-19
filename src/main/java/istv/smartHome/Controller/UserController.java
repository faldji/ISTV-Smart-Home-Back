package istv.smartHome.Controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import istv.smartHome.Entity.User;
import istv.smartHome.Repository.UserRepository;
import istv.smartHome.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;

/**
 * Controlleur dédié a la manipulation des utilisateurs
 */
@RestController
@Api(value="ISTV-Smart-Home", description = "Gestion d'un utilisateur", produces = "application/json")
public class UserController {
    final
    UserService userService;
    @Autowired
    private UserRepository userRepository;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    /**
     * Ajoute un nouvel utilisateur dans la BD
     *
     * @param deviceId : id de l'utilisateur à créer
     * @param isActive : l'appareil est active ou pas
     * @param isFirstUsage : premiere utilisation
     *
     * @return ResponseEntity avec un String en fonction du déroulement de l'opération
     */
    @ApiOperation(value = "Créé un nouvel utilisateur", response = String.class)
    @PostMapping("/user/add")
    @ResponseBody
    public ResponseEntity<String> register(@RequestParam("deviceId") String deviceId,
                                           @RequestParam(required = false) Boolean isEndConfig,
                                           @RequestParam(required = false) Boolean isActive,
                                           @RequestParam(required = false) Boolean isFirstUsage) {
        User user = userService.findUserByDeviceId(deviceId);
        if(user != null)
            return new ResponseEntity<>("Utilisateur déjà inscrit.", HttpStatus.FORBIDDEN);
        User newUser = new User();
        newUser.setDeviceId(deviceId);
        newUser.setActive(isActive != null ?  isActive :true);
        newUser.setFirstUsage(isFirstUsage != null ?  isFirstUsage :false);
        newUser.setFirstUsage(isEndConfig != null ?  isEndConfig :false);
            if(userService.addUser(newUser) != null)
                return new ResponseEntity<>("L'utilisateur a correctement été créé.", HttpStatus.OK);

            return new ResponseEntity<>("Une erreur est survenue lors de la création de votre compte.",
                    HttpStatus.NOT_ACCEPTABLE);
        }

    /**
     * retourne tous les utilisateurs
     *
     * @return ResponseEntity avec la liste des users
     */
    @ApiOperation(value = "Retourne tous utilisateurs de la BD")
    @GetMapping("/users")
    @ResponseBody
    public ResponseEntity<Collection<User>> getUsers(){
        Collection<User> users = userService.findAll();
        if (users == null)
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        return new ResponseEntity<>(users,HttpStatus.OK);
    }

    /**
     * retourne un utilisateur à partir de son device ID
     *
     * @param deviceId : id de l'utilisateur à créer
     *
     * @return ResponseEntity avec un String en fonction du déroulement de l'opération
     */
    @ApiOperation(value = "Retourne un utilisateur grâce à son ID device", response = User.class)
    @GetMapping("/user")
    @ResponseBody
    public ResponseEntity<User> getUserByIdDevice(
            @RequestParam(value="deviceId")String deviceId
    ){
        User user = userService.findUserByDeviceId(deviceId);
        if (user == null)
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        return new ResponseEntity<>(user,HttpStatus.OK);
    }

    /**
     * Modifier un ou plusieurs attributs d'un utilisateur
     *
     * @param deviceId : id de l'utilisateur à créer
     * @param isActive : l'appareil est active ou pas
     * @param isFirstUsage : premiere utilisation
     *
     * @return ResponseEntity avec un String en fonction du déroulement de l'opération
     */
    @ApiOperation(value = "Modifie un utilisateur grâce à son ID device", response = String.class)
    @PostMapping("/user/update")
    @ResponseBody
    public ResponseEntity<String> update(@RequestParam("deviceId") String deviceId,
                                         @RequestParam(value = "isActive",required = false) Boolean isActive,
                                         @RequestParam(value = "isFirstUsage",required = false) Boolean isFirstUsage) {
        User user = userService.findUserByDeviceId(deviceId);
        if (user == null)
            return new ResponseEntity<>("Une erreur est survenue lors de la modification de votre compte.",
                HttpStatus.FORBIDDEN);
            if (isActive != null){
                user.setActive(isActive);
            }
            if (isFirstUsage != null){
                user.setFirstUsage(isFirstUsage);
            }
            if(userService.addUser(user) != null)
                return new ResponseEntity<>("L'utilisateur a correctement été modifié.", HttpStatus.OK);

            return new ResponseEntity<>("Une erreur est survenue lors de la modification de votre compte.",
                    HttpStatus.FORBIDDEN);
    }
    /**
     * Supprime un utilisateur de la BD
     *
     * @param deviceId : id de l'utilisateur à créer
     *
     * @return ResponseEntity avec un String en fonction du déroulement de l'opération
     */
    @ApiOperation(value = "Supprime un utilisateur ", response = String.class)
    @DeleteMapping("/user/delete")
    @ResponseBody
    public ResponseEntity<String> delete(@RequestParam("deviceId") String deviceId) {
        User user = userService.findUserByDeviceId(deviceId);
        if (user == null)
            return new ResponseEntity<>("user not found.",
                    HttpStatus.FORBIDDEN);
            if(userService.deleteUser(user))
                return new ResponseEntity<>("L'utilisateur a correctement été supprimé.", HttpStatus.OK);

                return new ResponseEntity<>("Une erreur est survenue lors de la suppression de votre compte.",
                        HttpStatus.FORBIDDEN);
    }

    @ApiOperation(value = "les utilisateurs connecte et qui ont fini leur configuration ", response = String.class)
    @GetMapping("/user/config")
    @ResponseBody
    public ResponseEntity<String> userconnecteconfigure(@RequestParam("deviceId") String deviceId){
        User u = userService.findUserByDeviceId(deviceId);
        if(u==null)
            return new ResponseEntity<>("L'urilisateur n'est pas enregistre dans la bdd",
                    HttpStatus.FORBIDDEN);
        if(!u.isConfiguredHouse())
          return new ResponseEntity<>("L'utilisateur n'a pas fini de configurer sa maison",HttpStatus.FORBIDDEN);
        return new ResponseEntity<>("L'utilisateur est bien present dans la BDD et il a fini sa confuguration", HttpStatus.OK);
    }
}

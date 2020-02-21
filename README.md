# ISTV-Smart-Home-Back
Une Api rest des fonctionalités de l'application de gestion d'une maison connectée "ISTV Smart Home".
###Mise en place d'une instance MySQL sur RDS
Pour mettre en place la base de données,on a crée une instance 'MySql' sur 'RDS' AWS.

l'URL de connexion à mettre dans `application.properties` 

 spring.datasource.url   |spring.datasource.username| spring.datasource.password| Port 
------------ | ------------ | ------------ | ------------ 
smart-home.cuen4b7banh9.us-east-1.rds.amazonaws.com/smarthomedb    | admin | 123456789   | 3306

 ## Liens :
   ### API docs
   - http://35.233.100.128:8080/swagger-ui.html
   ### Git
   - https://github.com/faldji/ISTV-Smart-Home-Back

 #### Piece :
 1. Pour avoir une piece par Id methode Get : http://35.233.100.128:8080/IdPiece?id_piece=??
 2. Pour Ajouter une piece methode Post : http://35.233.100.128:8080/Ajoutpiece 
 3. Pour Modifier une piece methode Put : http://35.233.100.128:8080/Modifiepiece?id_piece=??
 4. pour Supprimer une piece methode DELETE : http://35.233.100.128:8080/Supprimerpiece?id_piece=??
  #### Maison :
  1. Lister toutes les maisons methode Get : http://35.233.100.128:8080/Maison?Id=??
  2. Avoir une maison par son Device methode Get : http://35.233.100.128:8080/MaisonDevice?Id_device=??
  3. Avoir une maison par son utilisateur methode Get : http://35.233.100.128:8080/MaisonUser?Id_User=?? 
  #### Capteur :
  1. Pour afficher l'etat d'une piece par l'utlisateur : http://35.233.100.128:8080/capteur/Etat?id_device=??&ty_piece=??
  2. Pour Recuperer la Luminosité par l'utlisateur :http://35.233.100.128:8080/capteur/luminosite?id_device=??&ty_piece=??
  3. Pour Recuperer la Température dans la piece par l'utlisateur : http://35.233.100.128:8080/capteur/temperature?id_device=??&ty_piece=??
  4. Lister tous les Capteurs enregistrer sur la base de données : http://35.233.100.128:8080/capteurs
  #### Configurations utiles pour l'Adaptation avec Alexa :
  1. Pour enregistrer une nouvelle maison avec le nombre du piece : http://35.233.100.128:8080/config/house/save?deviceId=??&nbPiece=??
  2. Pour ajouter des nouvelles pieces dans une maison : http://35.233.100.128:8080/config/rooms/save?deviceId=??
  
  ### Guides Skill Smart Home
  La liste des commandes vocales possible pour interagir avec la skill SMART-HOME :
  * Nom d'invocation =`` Smart Home`` reveille le skill
  * Intent ConfigIntent =`` "configure ma maison",
                                        "configure {nbPieces} pièces",
                                        "démarre la configuration",
                                        "commence la configuration",
                                        "configure {nbPieces} {firstRoomType}",
                                        "initialise ma maison avec {nbPieces} pièces.",
                                        "configure {nbPieces} de type {firstRoomType} ",
                                        "configure {nbPieces} pièces.",
                                        "débute la configuration",
                                        "initialise ma maison",
                                        "commence ma configuration",
                                        "configure  ma maison"`` lance une nouvelle configuration si l'utilisateur n'a 
                                        encore configurer de maison
  - Intent DemandeEtatIntent = ``"affiche la {TempOuLum} de la {piece}",
                                                         "affiche la {TempOuLum} du {piece}",
                                                         "affiche l'état du {piece}",
                                                         "affiche l'état de la {piece}",
                                                         "je veux savoir la {TempOuLum} du {piece}",
                                                         "Quelle est la {TempOuLum} du {piece}",
                                                         "affiche l'etat de ma maison ",
                                                         "je veux savoir l'etat de ma maison "``
                                                       affiche les informations de températures ou de luminosité dans une pièce 
  - Intent AMAZON.HelpIntent = `Que puis-je dire` pour demander de l'aide
  - Intent AMAZON.StopIntent AMAZON.CancelIntent = `Stop, annuler` ferme la séssion
  
  ## Lien 

  ## Installation (Dev): un projet Java Spring
  * Run Maven Goal 'clean' 'package' <code>mvn clean  package</code>
  
  * Build and Run une image docker à l'aide du <code>.dockerFile</code> (Image, Container) : 
  <code> 
  docker build -f smart-home .dockerFile -t smart-home .
  && docker run
  -p 8080:8080
  --name smart-home
  smart-home </code>
  * spring Exposed at [localhost:8080/](http://localhost:9192/)
  ### Reference Documentation
  Pour en savoir plus:
  * [Doc Officielle de Alexa Skill Kit](https://developer.amazon.com/en-US/docs/alexa/smapi/ask-cli-intro.html)
  * [Apache Maven documentation Officielle](https://maven.apache.org/guides/index.html)
  * [Spring Boot Maven Plugin Reference Guide](https://docs.spring.io/spring-boot/docs/2.2.1.BUILD-SNAPSHOT/maven-plugin/)
  * [Spring Security](https://docs.spring.io/spring-boot/docs/2.2.0.RELEASE/reference/htmlsingle/#boot-features-security)
  * [Spring Web](https://docs.spring.io/spring-boot/docs/2.2.0.RELEASE/reference/htmlsingle/#boot-features-developing-web-applications)
  * [Spring Data JPA](https://docs.spring.io/spring-boot/docs/2.2.0.RELEASE/reference/htmlsingle/#boot-features-jpa-and-spring-data)

  
   

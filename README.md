# ISTV-Smart-Home-Back
Une Api rest des fonctionalités de l'application de gestion d'une maison connectée "ISTV Smart Home".
##Lien 
###API docs
- http://35.233.100.128:8080/swagger-ui.html
###Git
- https://github.com/faldji/JavaSpring_istvbnb
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


### Guides Skill Smart Home
The following guides illustrate how to use some features concretely:
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
### Reference Documentation
Pour en savoir plus:
* [Doc Officielle de Alexa Skill Kit](https://developer.amazon.com/en-US/docs/alexa/smapi/ask-cli-intro.html)
* [Apache Maven documentation Officielle](https://maven.apache.org/guides/index.html)
* [Spring Boot Maven Plugin Reference Guide](https://docs.spring.io/spring-boot/docs/2.2.1.BUILD-SNAPSHOT/maven-plugin/)
* [Spring Security](https://docs.spring.io/spring-boot/docs/2.2.0.RELEASE/reference/htmlsingle/#boot-features-security)
* [Spring Web](https://docs.spring.io/spring-boot/docs/2.2.0.RELEASE/reference/htmlsingle/#boot-features-developing-web-applications)
* [Spring Data JPA](https://docs.spring.io/spring-boot/docs/2.2.0.RELEASE/reference/htmlsingle/#boot-features-jpa-and-spring-data)

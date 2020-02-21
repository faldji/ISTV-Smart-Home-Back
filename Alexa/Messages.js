const SKILL_NAME = "Smart Home";
const WELCOME_MESSAGE = "Bienvenue sur Smart-Home  I S T V ! ";
const ERROR_NOT_UNDERSTAND_MESSAGE = 'Désolé, je ne connais pas cette commande! dites que puis-je dire pour avoir de l\'aide.';
const FIRST_CONFIG_DIFF_PIECES_MESSAGE = "On continue. Au tours des différentes pièces de la maison. ";
const NEW_CONFIG_MESSAGE = "Pour commençer configurons votre maison. Dites : configure ma maison. ";
const CONNECTED_USER_INTRO_MESSAGE = "Je peux vous aider à faire un état de lieu des différentes pièces de la maison, vérifiér les lampes, la température etc... " +
    "Vous pouvez dire par exemple, smart home quelle est la température du salon ?";
const CONNECTED_USER_INTRO_REPROMPT = "Je peux aussi vous montrer toutes les commandes possible. " +
    "Si vous avez bésoin d'aides, dites Smart Home, Que puis-je dire ?";
const NEW_ACCOUNT_MESSAGE = "Je constate que c'est votre prémières utilisation. Pas de panique je suis là pour vous guider. ";
const NEW_ACCOUNT_MESSAGE_REPROMPT= 'Pour commencer la configuration, dites commence la configuration ou configure ma maison.';
const HELP_MESSAGE = 'Voici quelles que commandes vocales possibles: \n' +
    'Dites réinitialise ma maison, commence la configuration ou configure ma maison pour lancer la configuration de votre maison. ' +
    'Dites affiche l\'état de ma maison pour avoir des infos sur une pièce de la maison. ' +
    'Vous pouver quitter Smart Home en disant des mots commes annuler, quiter, stop etc...';
const HELP_REPROMPT = 'En quoi d\'autres puis-je vous aider ?';
const STOP_MESSAGE = 'Très bien. A bientôt !';
const MORE_MESSAGE = 'Voulez-vous plus ?';
const MISSING_DETAILS = 'Nope';
const CONNECTED_USER_INTRO_RESUME_CONFIG_MESSAGE = "Je constate que vous n'avez pas finis la configuration de votre maison." +
    "\n Dites configure ma maison pour reprendre une nouvelle configuration";
const CONNECTED_USER_INTRO_RESUME_CONFIG_MESSAGE_REPROMPT = "Vous dévez configurer une maison pour pouvoir utilisé Smart Home.\n" +
    " Dites simplement : configure ma maison.";
const SUCCESS_CREATE_HOUSE = "Votre maison a été configurée avec succès.";
const ERROR_CREATE_HOUSE = "Je ne peut pas enrégistrer cette maison pour le moment.\n Merci de réessayer plus tard.";
const DENIED_CONFIG_HOUSE_MESSAGE = "Vous devez confirmer toutes les étapes de la configuration. On reprend.";
const INTERNAL_ERROR_CREATE_HOUSE = "une erreur interne m'empèche de configurer cette maison.\n Réessayer plus tard.";
const WAITING_CREATE_HOUSE = "Veuillez patienter le temps que j'enregistre votre configuration.";
const UN_HANDLE_UPDATE_HOUSE = "La réinitialisation de la maison ou la modification d'une pièce sera gérer lors du sprint trois.";
const CANCEL_CREATE_HOUSE_DB = "Très bien.\n Ces données de configuration seront ignorées.";
const MESSAGE_TEMPERATURE = 'Comme reponse a votre demande la temperature dans la piece  ';
const MESSAGE_Lumiere = 'La luminosité dans votre ';
module.exports = {
    SKILL_NAME,
    MESSAGE_TEMPERATURE,
    MESSAGE_Lumiere,
    WELCOME_MESSAGE,
    ERROR_NOT_UNDERSTAND_MESSAGE,
    FIRST_CONFIG_DIFF_PIECES_MESSAGE,
    NEW_ACCOUNT_MESSAGE,
    NEW_ACCOUNT_MESSAGE_REPROMPT,
    NEW_CONFIG_MESSAGE,
    CONNECTED_USER_INTRO_MESSAGE,
    CONNECTED_USER_INTRO_REPROMPT,
    HELP_MESSAGE,
    HELP_REPROMPT,
    STOP_MESSAGE,
    MORE_MESSAGE,
    MISSING_DETAILS,
    CONNECTED_USER_INTRO_RESUME_CONFIG_MESSAGE,
    CONNECTED_USER_INTRO_RESUME_CONFIG_MESSAGE_REPROMPT,
    SUCCESS_CREATE_HOUSE,
    ERROR_CREATE_HOUSE,
    DENIED_CONFIG_HOUSE_MESSAGE,
    INTERNAL_ERROR_CREATE_HOUSE,
    WAITING_CREATE_HOUSE,
    UN_HANDLE_UPDATE_HOUSE,
    CANCEL_CREATE_HOUSE_DB
};

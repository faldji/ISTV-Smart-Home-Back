const Alexa = require('ask-sdk-core');
const Api = require('ApiServices');
const Messages = require('Messages');
const axios = require('axios');
// const express = require('express');
// const app = express();
// app.get('/',function (req,res) {
//     checkAddUser(1).then(r => console.log(r));
// res.send("ok")
// });
// app.listen(3000, function () {
//     console.log('Example app listening on port 3000!')
// });

const LaunchRequestHandler = {
    async canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest' && await Api.isConfigEnded(handlerInput.requestEnvelope.session.user.userId);
    },
    handle(handlerInput) {
        return handlerInput.responseBuilder
            .speak(Messages.WELCOME_MESSAGE + Messages.CONNECTED_USER_INTRO_MESSAGE)
            .withSimpleCard(Messages.SKILL_NAME, Messages.WELCOME_MESSAGE + Messages.CONNECTED_USER_INTRO_MESSAGE)
            .reprompt(Messages.CONNECTED_USER_INTRO_REPROMPT)
            .getResponse();
    }
};
const NewUserLaunchRequestHandler = {
    async canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest' && await Api.checkAndAddNewUser(handlerInput.requestEnvelope.session.user.userId);
    },
    handle(handlerInput) {
        return handlerInput.responseBuilder
            .speak(Messages.WELCOME_MESSAGE + Messages.NEW_ACCOUNT_MESSAGE + Messages.NEW_CONFIG_MESSAGE)
            .withSimpleCard('Smart home', Messages.WELCOME_MESSAGE + Messages.NEW_ACCOUNT_MESSAGE + Messages.NEW_CONFIG_MESSAGE)
            .reprompt(Messages.NEW_ACCOUNT_MESSAGE_REPROMPT)
            .getResponse();
    }
};

const UserResumeConfigLaunchRequestHandler = {
    async canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest' && !await Api.isConfigEnded(handlerInput.requestEnvelope.session.user.userId);
    },
    handle(handlerInput) {
        return handlerInput.responseBuilder
            .speak(Messages.WELCOME_MESSAGE + Messages.CONNECTED_USER_INTRO_RESUME_CONFIG_MESSAGE)
            .withSimpleCard(Messages.SKILL_NAME, Messages.WELCOME_MESSAGE + Messages.CONNECTED_USER_INTRO_RESUME_CONFIG_MESSAGE)
            .reprompt(Messages.CONNECTED_USER_INTRO_RESUME_CONFIG_MESSAGE_REPROMPT)
            .getResponse();
    }
};

/*
-----------------------------------------------------------------------------------------
 */
const FirstConfigIntentHandlerInProgress = {
    async canHandle(handlerInput) {
        const uid = handlerInput.requestEnvelope.session.user.userId;
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'ConfigIntent'
            && handlerInput.requestEnvelope.request.dialogState !== 'COMPLETED' &&
            !await Api.addUserOrCheckConfigEnded(uid);

    },
    handle(handlerInput) {
        const filledSlots = handlerInput.requestEnvelope.request.intent.slots;
        let currentIntent = handlerInput.requestEnvelope.request.intent;
        if (filledSlots.nbPieces.confirmationStatus === "CONFIRMED" && filledSlots.secondRoomType.confirmationStatus === "CONFIRMED" && parseInt(filledSlots.nbPieces.value) > 1){
            let currentSlotValue = filledSlots.secondRoomType.value;
            if (currentSlotValue   !== 'chambre' &&
                currentSlotValue !== 'cuisine' &&
                currentSlotValue !== 'salon' &&
                currentSlotValue !== 'toilette' &&  currentSlotValue !== 'salle de bain'){
                currentIntent.slots.secondRoomType.confirmationStatus="NONE";
                currentIntent.slots.secondRoomType.value=null;
                currentIntent.slots.secondRoomType.resolutions=null;
                return handlerInput.responseBuilder
                    .speak("Smart Home ne prend pas en charge une pièce de type: "+currentSlotValue+". Essayer plutôt chambre, cuisine, salon ou toilette")
                    .withSimpleCard(Messages.SKILL_NAME,"Je n'ai pas bien compris. Essayer chambre, cuisine, salon ou toilette")
                    .addDelegateDirective(currentIntent)
                    .getResponse();

            }
            if (filledSlots.nbPieces.value === "2"){

                const toSay = "Désolé. vous avez déjà choisis une pièce de type "+filledSlots.secondRoomType.value;
                let res =  Api.getSlotResolved(filledSlots.firstRoomType) === currentSlotValue;
                if (res){
                    currentIntent.slots.secondRoomType.confirmationStatus="NONE";
                    currentIntent.slots.secondRoomType.value=null;
                    currentIntent.slots.secondRoomType.resolutions=null;
                    return handlerInput.responseBuilder
                        .speak(toSay)
                        .withSimpleCard(Messages.SKILL_NAME,toSay)
                        .addDelegateDirective(currentIntent)
                        .getResponse();
                }
            }

        }
        if (filledSlots.nbPieces.confirmationStatus === "CONFIRMED" && filledSlots.thirdRoomType.confirmationStatus === "CONFIRMED" && parseInt(filledSlots.nbPieces.value) > 2){
            let currentSlotValue = filledSlots.thirdRoomType.value;
            if (currentSlotValue   !== 'chambre' &&
                currentSlotValue !== 'cuisine' &&
                currentSlotValue !== 'salon' &&
                currentSlotValue !== 'toilette' &&  currentSlotValue !== 'salle de bain'){
                currentIntent.slots.thirdRoomType.confirmationStatus="NONE";
                currentIntent.slots.thirdRoomType.value=null;
                currentIntent.slots.thirdRoomType.resolutions=null;
                return handlerInput.responseBuilder
                    .speak("Smart Home ne prend pas en charge une pièce de type: "+currentIntent+". Essayer plutôt chambre, cuisine, salon ou toilette")
                    .withSimpleCard(Messages.SKILL_NAME,"Je n'ai pas bien compris. Essayer chambre, cuisine, salon ou toilette")
                    .addDelegateDirective(currentIntent)
                    .getResponse();

            }
            if (filledSlots.nbPieces.value === "3"){

                const toSay = "Désolé. vous avez déjà choisis une pièce de type "+filledSlots.thirdRoomType.value;
                const valueBoard = [Api.getSlotResolved(filledSlots.firstRoomType),
                    Api.getSlotResolved(filledSlots.secondRoomType)];
                let res = false;
                valueBoard.forEach(value => {if (value === currentSlotValue)res = true});
                if (res){
                    currentIntent.slots.thirdRoomType.confirmationStatus="NONE";
                    currentIntent.slots.thirdRoomType.value=null;
                    currentIntent.slots.thirdRoomType.resolutions=null;
                    return handlerInput.responseBuilder
                        .speak(toSay)
                        .withSimpleCard(Messages.SKILL_NAME,toSay)
                        .addDelegateDirective(currentIntent)
                        .getResponse();
                }
            }

        }
        if (filledSlots.nbPieces.confirmationStatus === "CONFIRMED" && filledSlots.fourthRoomType.confirmationStatus === "CONFIRMED" && parseInt(filledSlots.nbPieces.value) > 3){
            let currentSlotValue = filledSlots.fourthRoomType.value;
            if (currentSlotValue   !== 'chambre' &&
                currentSlotValue !== 'cuisine' &&
                currentSlotValue !== 'salon' &&
                currentSlotValue !== 'toilette' &&  currentSlotValue !== 'salle de bain'){
                currentIntent.slots.fourthRoomType.confirmationStatus="NONE";
                currentIntent.slots.fourthRoomType.value=null;
                currentIntent.slots.fourthRoomType.resolutions=null;
                return handlerInput.responseBuilder
                    .speak("Smart Home ne prend pas en charge une pièce de type: "+currentSlotValue+". Essayer plutôt chambre, cuisine, salon ou toilette")
                    .withSimpleCard(Messages.SKILL_NAME,"Je n'ai pas bien compris. Essayer chambre, cuisine, salon ou toilette")
                    .addDelegateDirective(currentIntent)
                    .getResponse();

            }
            if (filledSlots.nbPieces.value === "4"){

                const toSay = "Désolé. vous avez déjà choisis une pièce de type "+filledSlots.fourthRoomType.value;
                const valueBoard = [Api.getSlotResolved(filledSlots.firstRoomType),
                    Api.getSlotResolved(filledSlots.secondRoomType), Api.getSlotResolved(filledSlots.thirdRoomType)];
                let res = false;
                valueBoard.forEach(value => {if (value === currentSlotValue)res = true});
                if (res){
                    currentIntent.slots.fourthRoomType.confirmationStatus="NONE";
                    currentIntent.slots.fourthRoomType.value=null;
                    currentIntent.slots.fourthRoomType.resolutions=null;
                    return handlerInput.responseBuilder
                        .speak(toSay)
                        .withSimpleCard(Messages.SKILL_NAME,toSay)
                        .addDelegateDirective(currentIntent)
                        .getResponse();
                }
            }

        }
        if (filledSlots.nbPieces.value === "1" && filledSlots.nbPieces.confirmationStatus === "CONFIRMED"
            && filledSlots.firstRoomType.value && filledSlots.firstRoomType.confirmationStatus === "CONFIRMED") {
            currentIntent.slots.secondRoomType.confirmationStatus="CONFIRMED";
            currentIntent.slots.secondRoomType.value=filledSlots.firstRoomType.value;
            currentIntent.slots.secondRoomType.resolutions = filledSlots.firstRoomType.resolutions;
            currentIntent.slots.thirdRoomType.confirmationStatus="CONFIRMED";
            currentIntent.slots.thirdRoomType.value="-";
            currentIntent.slots.fourthRoomType.confirmationStatus="CONFIRMED";
            currentIntent.slots.fourthRoomType.value="-";
            return handlerInput.responseBuilder
                .addDelegateDirective(currentIntent)
                .getResponse();
        }
        if (filledSlots.nbPieces.value === "2" && filledSlots.nbPieces.confirmationStatus === "CONFIRMED" &&
            filledSlots.firstRoomType.value && filledSlots.firstRoomType.confirmationStatus === "CONFIRMED" &&
            filledSlots.secondRoomType.value && filledSlots.secondRoomType.confirmationStatus === "CONFIRMED") {
            currentIntent.slots.thirdRoomType.confirmationStatus="CONFIRMED";
            currentIntent.slots.thirdRoomType.value="-";
            currentIntent.slots.fourthRoomType.confirmationStatus="CONFIRMED";
            currentIntent.slots.fourthRoomType.value="-";
            return handlerInput.responseBuilder
                .addDelegateDirective(currentIntent)
                .getResponse();
        }
        if (filledSlots.nbPieces.value === "3" && filledSlots.nbPieces.confirmationStatus === "CONFIRMED" &&
            filledSlots.firstRoomType.value && filledSlots.firstRoomType.confirmationStatus === "CONFIRMED" &&
            filledSlots.secondRoomType.value && filledSlots.secondRoomType.confirmationStatus === "CONFIRMED" &&
            filledSlots.thirdRoomType.value && filledSlots.thirdRoomType.confirmationStatus === "CONFIRMED") {
            currentIntent.slots.fourthRoomType.confirmationStatus="CONFIRMED";
            currentIntent.slots.fourthRoomType.value="-";
            return handlerInput.responseBuilder
                .addDelegateDirective(currentIntent)
                .getResponse();
        }
        if (filledSlots.nbPieces.value === "4" && filledSlots.nbPieces.confirmationStatus === "CONFIRMED" &&
            filledSlots.firstRoomType.value && filledSlots.firstRoomType.confirmationStatus === "CONFIRMED" &&
            filledSlots.secondRoomType.value && filledSlots.secondRoomType.confirmationStatus === "CONFIRMED" &&
            filledSlots.thirdRoomType.value && filledSlots.thirdRoomType.confirmationStatus === "CONFIRMED" &&
            filledSlots.fourthRoomType.value && filledSlots.fourthRoomType.confirmationStatus === "CONFIRMED") {
            return handlerInput.responseBuilder
                .speak(Messages.WAITING_CREATE_HOUSE)
                .addDelegateDirective(currentIntent)
                .getResponse();
        }
        if (filledSlots.nbPieces.confirmationStatus === "DENIED"){
            currentIntent.slots.nbPieces.confirmationStatus="NONE";
            currentIntent.slots.nbPieces.value=null;
            currentIntent.slots.nbPieces.resolutions=null;
            return handlerInput.responseBuilder
                .speak(Messages.DENIED_CONFIG_HOUSE_MESSAGE)
                .withSimpleCard(Messages.SKILL_NAME,Messages.DENIED_CONFIG_HOUSE_MESSAGE)
                .addDelegateDirective(currentIntent)
                .getResponse();
        }
        if (filledSlots.firstRoomType.confirmationStatus === "DENIED"){
            currentIntent.slots.firstRoomType.confirmationStatus="NONE";
            currentIntent.slots.firstRoomType.value=null;
            currentIntent.slots.firstRoomType.resolutions=null;
            return handlerInput.responseBuilder
                .speak(Messages.DENIED_CONFIG_HOUSE_MESSAGE)
                .withSimpleCard(Messages.SKILL_NAME,Messages.DENIED_CONFIG_HOUSE_MESSAGE)
                .addDelegateDirective(currentIntent)
                .getResponse();
        }
        if (filledSlots.secondRoomType.confirmationStatus === "DENIED"){
            currentIntent.slots.secondRoomType.confirmationStatus="NONE";
            currentIntent.slots.secondRoomType.resolutions=null;
            currentIntent.slots.secondRoomType.value=null;
            return handlerInput.responseBuilder
                .speak(Messages.DENIED_CONFIG_HOUSE_MESSAGE)
                .withSimpleCard(Messages.SKILL_NAME,Messages.DENIED_CONFIG_HOUSE_MESSAGE)
                .addDelegateDirective(currentIntent)
                .getResponse();
        }
        if (filledSlots.thirdRoomType.confirmationStatus === "DENIED"){
            currentIntent.slots.thirdRoomType.confirmationStatus="NONE";
            currentIntent.slots.thirdRoomType.value=null;
            currentIntent.slots.thirdRoomType.resolutions=null;
            return handlerInput.responseBuilder
                .speak(Messages.DENIED_CONFIG_HOUSE_MESSAGE)
                .withSimpleCard(Messages.SKILL_NAME,Messages.DENIED_CONFIG_HOUSE_MESSAGE)
                .addDelegateDirective(currentIntent)
                .getResponse();
        }
        if (filledSlots.fourthRoomType.confirmationStatus === "DENIED"){
            currentIntent.slots.fourthRoomType.confirmationStatus="NONE";
            currentIntent.slots.fourthRoomType.value=null;
            currentIntent.slots.fourthRoomType.resolutions=null;
            return handlerInput.responseBuilder
                .speak(Messages.DENIED_CONFIG_HOUSE_MESSAGE)
                .withSimpleCard(Messages.SKILL_NAME,Messages.DENIED_CONFIG_HOUSE_MESSAGE)
                .addDelegateDirective(currentIntent)
                .getResponse();
        }

        return handlerInput.responseBuilder
            .addDelegateDirective()
            .getResponse();
    }
};

const FirstConfigIntentHandlerCompleted = {
    async canHandle(handlerInput) {
        const uid = handlerInput.requestEnvelope.session.user.userId;
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'ConfigIntent'
            && handlerInput.requestEnvelope.request.dialogState === 'COMPLETED' &&
            !await Api.addUserOrCheckConfigEnded(uid);

    },
    async handle(handlerInput) {
        const uid = handlerInput.requestEnvelope.session.user.userId;
        const filledSlots = handlerInput.requestEnvelope.request.intent.slots;
        let currentIntent = handlerInput.requestEnvelope.request.intent;
        if (currentIntent.confirmationStatus === "DENIED")
            return handlerInput.responseBuilder.speak(Messages.CANCEL_CREATE_HOUSE_DB)
                .withSimpleCard(Messages.SKILL_NAME,Messages.CANCEL_CREATE_HOUSE_DB)
                .withShouldEndSession(true)
                .getResponse();
        if (filledSlots.nbPieces.value === "1") {
            let res = await Api.saveNewHouseWithRooms(uid,1,
                [{"pseudo": Api.getSlotResolved(filledSlots.firstRoomType), "typePiece":  Api.getSlotResolved(filledSlots.firstRoomType)}]);
            if (res)
                return handlerInput.responseBuilder
                    .speak(Messages.SUCCESS_CREATE_HOUSE +
                        " Il sagit d'une maison avec une seule pièce de type " + filledSlots.firstRoomType.value + ".")
                    .withSimpleCard(Messages.SKILL_NAME, Messages.SUCCESS_CREATE_HOUSE)
                    .getResponse();
            else
                return handlerInput.responseBuilder
                    .speak(Messages.ERROR_CREATE_HOUSE)
                    .withSimpleCard(Messages.SKILL_NAME, Messages.ERROR_CREATE_HOUSE)
                    .getResponse();
        }
        if (filledSlots.nbPieces.value === "2" ) {
            let res = await Api.saveNewHouseWithRooms(uid,2,
                [{"pseudo":  Api.getSlotResolved(filledSlots.firstRoomType), "typePiece":  Api.getSlotResolved(filledSlots.firstRoomType)},
                    {"pseudo":  Api.getSlotResolved(filledSlots.secondRoomType), "typePiece":  Api.getSlotResolved(filledSlots.secondRoomType)}]);
            if (res)
                return handlerInput.responseBuilder
                    .speak(Messages.SUCCESS_CREATE_HOUSE +
                        " Il sagit d'une maison avec deux pièces de type " + filledSlots.firstRoomType.value + " et " +
                        filledSlots.secondRoomType.value + ".")
                    .withSimpleCard(Messages.SKILL_NAME, Messages.SUCCESS_CREATE_HOUSE)
                    .getResponse();
            else
                return handlerInput.responseBuilder
                    .speak(Messages.ERROR_CREATE_HOUSE)
                    .withSimpleCard(Messages.SKILL_NAME, Messages.ERROR_CREATE_HOUSE)
                    .getResponse();

        }
        if (filledSlots.nbPieces.value === "3") {
            let res = await Api.saveNewHouseWithRooms(uid,3,
                [
                    {"pseudo":  Api.getSlotResolved(filledSlots.firstRoomType), "typePiece":  Api.getSlotResolved(filledSlots.firstRoomType)},
                    {"pseudo":  Api.getSlotResolved(filledSlots.secondRoomType), "typePiece":  Api.getSlotResolved(filledSlots.secondRoomType)},
                    {"pseudo":  Api.getSlotResolved(filledSlots.thirdRoomType), "typePiece":  Api.getSlotResolved(filledSlots.thirdRoomType)}
                ]);
            if (res)
                return handlerInput.responseBuilder
                    .speak(Messages.SUCCESS_CREATE_HOUSE +
                        " Il sagit d'une maison avec trois pièces de type " + filledSlots.firstRoomType.value + ", " +
                        filledSlots.secondRoomType.value +" et "+ filledSlots.thirdRoomType.value+".")
                    .withSimpleCard(Messages.SKILL_NAME, Messages.SUCCESS_CREATE_HOUSE)
                    .getResponse();
            else
                return handlerInput.responseBuilder
                    .speak(Messages.ERROR_CREATE_HOUSE)
                    .withSimpleCard(Messages.SKILL_NAME, Messages.ERROR_CREATE_HOUSE)
                    .getResponse();
        }
        if (filledSlots.nbPieces.value === "4") {
            let res = await Api.saveNewHouseWithRooms(uid,4,
                [
                    {"pseudo":  Api.getSlotResolved(filledSlots.firstRoomType), "typePiece":  Api.getSlotResolved(filledSlots.firstRoomType)},
                    {"pseudo":  Api.getSlotResolved(filledSlots.secondRoomType), "typePiece":  Api.getSlotResolved(filledSlots.secondRoomType)},
                    {"pseudo":  Api.getSlotResolved(filledSlots.thirdRoomType), "typePiece":  Api.getSlotResolved(filledSlots.thirdRoomType)},
                    {"pseudo":  Api.getSlotResolved(filledSlots.fourthRoomType), "typePiece":  Api.getSlotResolved(filledSlots.fourthRoomType)}
                ]);
            if (res)
                return handlerInput.responseBuilder
                    .speak(Messages.SUCCESS_CREATE_HOUSE +
                        " Il sagit d'une maison avec quatres pièces de type " + filledSlots.firstRoomType.value + ", " +
                        filledSlots.secondRoomType.value + ", " + filledSlots.thirdRoomType.value +" et "+
                        filledSlots.fourthRoomType.value+".")
                    .withSimpleCard(Messages.SKILL_NAME, Messages.SUCCESS_CREATE_HOUSE)
                    .getResponse();
            else
                return handlerInput.responseBuilder
                    .speak(Messages.ERROR_CREATE_HOUSE)
                    .withSimpleCard(Messages.SKILL_NAME, Messages.ERROR_CREATE_HOUSE)
                    .getResponse();
        }

        return handlerInput.responseBuilder
            .speak(Messages.INTERNAL_ERROR_CREATE_HOUSE)
            .withSimpleCard(Messages.SKILL_NAME, Messages.INTERNAL_ERROR_CREATE_HOUSE)
            .withShouldEndSession(true)
            .getResponse();
    }
};
/**
 * TODO sprint 3 - mettre à jour une pièce
 * @type {{canHandle(*): Promise<*>, handle(*): *}}
 */
const UpdateConfigIntentHandlerCompleted = {
    async canHandle(handlerInput) {
        const uid = handlerInput.requestEnvelope.session.user.userId;
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'ConfigIntent'
            && await Api.isConfigEnded(uid);
    },
    handle(handlerInput) {
        return handlerInput.responseBuilder
            .speak(Messages.UN_HANDLE_UPDATE_HOUSE)
            .withSimpleCard(Messages.SKILL_NAME, Messages.UN_HANDLE_UPDATE_HOUSE)
            .getResponse();
    }
};
/*
-----------------------------------------------------------------------------------------
 */

/*
-----------------------------------------------------------------------------------------
 */
const HelpIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        return handlerInput.responseBuilder
            .speak(Messages.HELP_MESSAGE)
            .reprompt(Messages.HELP_REPROMPT)
            .withSimpleCard(Messages.SKILL_NAME, Messages.HELP_MESSAGE)
            .getResponse();
    }
};
const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
                || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speechText = Messages.STOP_MESSAGE;

        return handlerInput.responseBuilder
            .speak(speechText)
            .withSimpleCard(Messages.SKILL_NAME, speechText)
            .withShouldEndSession(true)
            .getResponse();
    }
};
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        //any cleanup logic goes here
        return handlerInput.responseBuilder.getResponse();
    }
};

const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`Error handled: ${error.message}`);

        return handlerInput.responseBuilder
            .speak(Messages.ERROR_NOT_UNDERSTAND_MESSAGE)
            .reprompt(Messages.ERROR_NOT_UNDERSTAND_MESSAGE)
            .getResponse();
    },
};
const GetLuminosite = async(id,type) => {
    return await axios.get('http://35.233.100.128:8080/capteur/luminosite?id_device='+id+'&ty_piece='+type)
        .then(response => {
            if( response.status ===200){
                return response.data;
            }
            return false;
        })
        .catch(error => {
            return false;
        })

};

const GetTemperature = async(id,type) => {
    return await axios.get('http://35.233.100.128:8080/capteur/temperature?id_device='+id+'&ty_piece='+type)
        .then(response => {
            if( response.status ===200){
                return response.data;
            }
            return false;
        })
        .catch(error => {
            return false;
        })

};

const GetEtat = async(id,type) => {
    return await axios.get('http://35.233.100.128:8080/capteur/Etat?id_device='+id+'&ty_piece='+type)
        .then(response => {
            if( response.status ===200){
                return response.data;
            }
            return false;
        })
        .catch(error => {
            return false;
        })

};
// cette fonction verifie si l'utilisateur a deja fini de configurer sa maison
const VerifConfig = async(id) => {
    return await axios.get('http://35.233.100.128:8080/user/config?deviceid='+id)
        .then(response => {
            return response.status ===200;
        })
        .catch(error => {
            return false
        })
};

const EtatNoHouseIntentHandler = {
    async canHandle(handlerInput) {
        const uid = handlerInput.requestEnvelope.session.user.userId;
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'DemandeEtatIntent'
            && ! await Api.isConfigEnded(uid);
    },
    handle(handlerInput) {
        return handlerInput.responseBuilder.speak("Vous n'avez pas encore configurer votre maison. " +
            "\nDites: configure ma maison pour commencer la configuration.")
            .withSimpleCard(Messages.SKILL_NAME,"Vous n'avez pas encore configurer votre maison. " +
                "\nDites: configure ma maison pour commencer la configuration.")
            .reprompt("Dites: configure ma maison pour commencer la configuration.")
            .getResponse();
    }
};
const EtatIntentHandler = {
    async canHandle(handlerInput) {
        const uid = handlerInput.requestEnvelope.session.user.userId;
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'DemandeEtatIntent'
            &&  await Api.isConfigEnded(uid);

    },
    async handle(handlerInput) {

        const uid = handlerInput.requestEnvelope.session.user.userId;
        const type = handlerInput.requestEnvelope.request.intent.slots.piece.value;
        const demande = Api.getSlotResolved(handlerInput.requestEnvelope.request.intent.slots.TempOuLum);
        if(type){
            console.log('test '+demande);
            // demande de la temperature
            if(demande && demande === 'température'){
                console.log("rentre");
                let Temp = await GetTemperature(uid,type);
                console.log('demande temperature ok'+Temp);
                if(Temp === false){
                    return handlerInput.responseBuilder.speak("Désolé, je n'arrive pas à récupérer la température. " +
                        "Dites que puis-je dire pour avoir de l'aide. ")
                        .withSimpleCard(Messages.SKILL_NAME,"Désolé, je n'arrive pas à récupérer la température."+
                            " Dites que puis-je dire pour avoir de l'aide.")
                        .reprompt(Messages.HELP_REPROMPT)
                        .getResponse();
                }
                return handlerInput.responseBuilder.speak('Il fait actuellement  '+ Temp.toFixed(0) +'dégré celsuis dans votre '+ type +'.')
                    .withSimpleCard(Messages.SKILL_NAME,'Il fait actuellement  '+ Temp.toFixed(0) +'dégré celsuis dans votre '+ type +'.')
                    .reprompt(Messages.HELP_REPROMPT)
                    .getResponse();
            }

            // demande de la luminosite
            if(demande && demande === 'luminosité'){
                let Lumiere = await GetLuminosite(uid,type);
                if(Lumiere === false){
                    return handlerInput.responseBuilder.speak("Désolé, je n'arrive pas à récupérer la luminosité."+
                        " Dites que puis-je dire pour avoir de l'aide.")
                        .withSimpleCard(Messages.SKILL_NAME,"Désolé, je n'arrive pas à récupérer la luminosité."+
                            " Dites que puis-je dire pour avoir de l'aide.")
                        .reprompt(Messages.HELP_REPROMPT)
                        .getResponse();
                }
                return handlerInput.responseBuilder.speak(Messages.MESSAGE_Lumiere+type+ ' est de ' + Lumiere.toFixed(2) )
                    .withSimpleCard(Messages.SKILL_NAME,Messages.MESSAGE_Lumiere + type + ' est de '+  Lumiere.toFixed(2))
                    .reprompt(Messages.HELP_REPROMPT)
                    .getResponse();
            }

            // demande de l'etat d'une piece
            if(demande && demande === 'les deux'){
                let etat = await GetEtat(uid,type);
                console.log('test'+etat);
                if(etat === false){
                    return handlerInput.responseBuilder.speak("Désolé, je n'arrive pas à récupérer l'état de votre maison."+
                        " Dites que puis-je dire pour avoir de l'aide.")
                        .withSimpleCard(Messages.SKILL_NAME,"Désolé, je n'arrive pas à récupérer l'état de votre maison."+
                            " Dites que puis-je dire pour avoir de l'aide.")
                        .reprompt(Messages.HELP_REPROMPT)
                        .getResponse();
                }
                return handlerInput.responseBuilder.speak('Il fait actuellement  '+ etat.temperature.toFixed(0) +'dégré celsuis dans votre '+ type + ' et  ' +etat.luminosite.toFixed(2) + ' de luminosité.')
                    .withSimpleCard(Messages.SKILL_NAME,'Il fait actuellement  '+ etat.temperature.toFixed(0) +'dégré celsuis dans votre '+ type + ' et  ' +etat.luminosite.toFixed(2) + ' de luminosité.')
                    .reprompt(Messages.HELP_REPROMPT)
                    .getResponse();
            }

            return handlerInput.responseBuilder.speak('Désolé, je n\'arrive pas à traiter votre demande. Dites que puis-je dire pour avoir de l\'aide.'  )
                .withSimpleCard(Messages.SKILL_NAME,'Désolé, je n\'arrive pas à traiter votre demande. Dites que puis-je dire pour avoir de l\'aide.' )
                .reprompt(Messages.HELP_REPROMPT)
                .getResponse();






        }
        return handlerInput.responseBuilder.speak('vous devriez choisir un type de piece par exemple salon, chambre, toilette ou cuisine. de quelle pièce s\'agit-il?'  )
            .withSimpleCard(Messages.SKILL_NAME,'vous devriez choisir un type de piece par exemple salon, chambre, toilette ou cuisine. de quelle pièce s\'agit-il?'  )
            .getResponse();
    }

};













/**
 *
 * @type {LambdaHandler}
 */
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        NewUserLaunchRequestHandler,
        UserResumeConfigLaunchRequestHandler,
        FirstConfigIntentHandlerInProgress,
        FirstConfigIntentHandlerCompleted,
        UpdateConfigIntentHandlerCompleted,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler,
        EtatIntentHandler,
        EtatNoHouseIntentHandler
    )
    .addErrorHandlers(ErrorHandler)
    .lambda();
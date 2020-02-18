const Alexa = require('ask-sdk-core');
const axios = require('axios');
const SKILL_NAME = 'smart home';
const WELCOME_MESSAGE = "Bienvenue sur Smart-Home  I S T V! ";
const ERROR_NOT_UNDERSTAND_MESSAGE = 'Désolé, je ne connais pas cette commande! dites que puis-je dire pour avoir de l\'aide.';
const FIRST_CONFIG_DIFF_PIECES_MESSAGE = "On continue. Au tours des différentes pièces de la maison. ";
const NEW_CONFIG_MESSAGE = "Pour commençer configurons votre maison. ";
const CONNECTED_USER_INTRO_MESSAGE = "Je peux vous aider à faire un état de lieu des différentes pièces de la maison, vérifiér les lampes, la température etc... " +
    "Vous pouvez dire par exemple, smart home quelle est la température du salon ?";
const CONNECTED_USER_INTRO_REPROMPT = "Je peux aussi vous montrer toutes les commandes possible. " +
    "Si vous avez bésoin d'aides, dites Smart Home, Que puis-je dire ?";
const NEW_ACCOUNT_MESSAGE = "Je constate que c'est votre prémières utilisation, mais pas de panique je suis là pour vous guider. ";
const HELP_MESSAGE = 'Pour des raisons de développement, cette liste n\'est pas exhaustive. ' +
    'Dites réinitialise ma maison pour la réconfigurer à partir de zéro. ' +
    'Dites configure une pièce pour lancer la configuration d\'une pièce. ' +
    'Vous pouver quitter Smart Home en disant des mots commes annuler, quiter, stop etc...';
const HELP_REPROMPT = 'En quoi d\'autres puis-je vous aider ?';
const STOP_MESSAGE = 'Très bien. A bientôt !';
const MORE_MESSAGE = 'Voulez-vous plus ?';
const MISSING_DETAILS = 'Nope';
// const express = require('express');
// const app = express();
// app.get('/',function (req,res) {
//     checkAddUser(1).then(r => console.log(r));
// res.send("ok")
// });
// app.listen(3000, function () {
//     console.log('Example app listening on port 3000!')
// });
const isNewUser =  async (id) => {
    return await axios.get('http://35.233.100.128:8080/user?deviceId=' + id)
        .then(response => {
            return response.status !== 200;
        })
        .catch(error => {
            return true;
        })
};
const addNewUser =  async (id) => {
    return await axios.post('http://35.233.100.128:8080/user/add?deviceId=' + id,{deviceId: id})
        .then(response => {
            return response.status === 200;
        })
        .catch(error => {
            return false;
        })
};
const checkNewUser = async (id) => {

    return await isNewUser(id).then(r => {
        if(r)
            return addNewUser(id)
                .then(re =>{
                    return re || false;
                }).catch(error => {return false});
        return false;
    }).catch(error => {return false});
};
const LaunchRequestHandler = {
    async canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest' && ! await isNewUser(handlerInput.requestEnvelope.session.user.userId);
    },
    handle(handlerInput) {
        return handlerInput.responseBuilder
            .speak(WELCOME_MESSAGE + CONNECTED_USER_INTRO_MESSAGE)
            .withSimpleCard('Smart home', WELCOME_MESSAGE + CONNECTED_USER_INTRO_MESSAGE)
            .reprompt(CONNECTED_USER_INTRO_REPROMPT)
            .getResponse();
    }
};
const NewUserLaunchRequestHandler = {
    async canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest' && await checkNewUser(handlerInput.requestEnvelope.session.user.userId);
    },
    handle(handlerInput) {
        return handlerInput.responseBuilder
            .speak(WELCOME_MESSAGE + NEW_ACCOUNT_MESSAGE + NEW_CONFIG_MESSAGE)
            .withSimpleCard('Smart home', WELCOME_MESSAGE + NEW_ACCOUNT_MESSAGE + NEW_CONFIG_MESSAGE)
            .reprompt('Pour commencer la configuration, dites commence la configuration')
            .getResponse();
    }
};

const FirstConfigIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'firstUsageConfig'
            && handlerInput.requestEnvelope.request.dialogState === 'COMPLETED';
    },
    handle(handlerInput) {
        const speechText = FIRST_CONFIG_DIFF_PIECES_MESSAGE;

        return handlerInput.responseBuilder
            .speak(speechText)
            .withSimpleCard(SKILL_NAME, speechText)
            .addDelegateDirective({
                name: 'PieceConfigIntent',
                confirmationStatus: 'NONE',
                slots: {}
            })
            .getResponse();
    }
};
const PieceConfigIntentHandler = {
    async canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'PieceConfigIntent' && ! await isNewUser(handlerInput.requestEnvelope.session.user.userId)
            && handlerInput.requestEnvelope.request.dialogState === 'COMPLETED';
    },
    handle(handlerInput) {
        const speechText = "Entendu. Pour le test je m'arrête là.";

        return handlerInput.responseBuilder
            .speak(speechText)
            .withSimpleCard(SKILL_NAME, speechText)
            .getResponse();
    }
};
const HelpIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        return handlerInput.responseBuilder
            .speak(HELP_MESSAGE)
            .reprompt(HELP_REPROMPT)
            .withSimpleCard(SKILL_NAME, HELP_MESSAGE)
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
        const speechText = STOP_MESSAGE;

        return handlerInput.responseBuilder
            .speak(speechText)
            .withSimpleCard(SKILL_NAME, speechText)
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
            .speak(ERROR_NOT_UNDERSTAND_MESSAGE)
            .reprompt(ERROR_NOT_UNDERSTAND_MESSAGE)
            .getResponse();
    },
};
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        NewUserLaunchRequestHandler,
        FirstConfigIntentHandler,
        HelpIntentHandler,
        PieceConfigIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler)
    .addErrorHandlers(ErrorHandler)
    .lambda();
const Alexa = require('ask-sdk-core');
const Api = require('ApiServices');
const Messages = require('Messages');
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
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest' &&  await Api.isConfigEnded(handlerInput.requestEnvelope.session.user.userId);
    },
    handle(handlerInput) {
        return handlerInput.responseBuilder
            .speak(Messages.WELCOME_MESSAGE + Messages.CONNECTED_USER_INTRO_MESSAGE)
            .withSimpleCard('Smart home', Messages.WELCOME_MESSAGE + Messages.CONNECTED_USER_INTRO_MESSAGE)
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
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest' && ! await Api.isConfigEnded(handlerInput.requestEnvelope.session.user.userId);
    },
    handle(handlerInput) {
        return handlerInput.responseBuilder
            .speak(Messages.WELCOME_MESSAGE + Messages.CONNECTED_USER_INTRO_RESUME_CONFIG_MESSAGE)
            .withSimpleCard('Smart home', Messages.WELCOME_MESSAGE + Messages.CONNECTED_USER_INTRO_RESUME_CONFIG_MESSAGE)
            .reprompt(Messages.CONNECTED_USER_INTRO_RESUME_CONFIG_MESSAGE_REPROMPT)
            .getResponse();
    }
};

/*
-----------------------------------------------------------------------------------------
 */
const FirstConfigIntentHandlerStarted = {
     async canHandle(handlerInput) {
         const uid = handlerInput.requestEnvelope.session.user.userId;
         return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'ConfigIntent'
            && handlerInput.requestEnvelope.request.dialogState === 'STARTED' &&
             ! await Api.addUserOrCheckConfigEnded(uid);

    },
     handle(handlerInput) {

        let currentIntent = handlerInput.requestEnvelope.request.intent;
        const speechText = Messages.FIRST_CONFIG_DIFF_PIECES_MESSAGE;
        const filledSlots = handlerInput.requestEnvelope.request.intent.slots;
        const slotValues = Api.getSlotValues(filledSlots);
         console.log(slotValues);
        if (slotValues['nbPieces'].isValidated && filledSlots.nbPieces.value === "1"){
            console.log('ok nb');
            if (slotValues.firstRoomType){
                console.log('ok f');
                return handlerInput.responseBuilder.speak('ok').getResponse();
            }

        }
        console.log("no fill");
        return handlerInput.responseBuilder
            .speak(speechText)
            .withSimpleCard(Messages.SKILL_NAME, speechText)
            .addDelegateDirective()
            .getResponse();
    }
};
const PieceConfigIntentHandler = {
    async canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'PieceConfigIntent' && ! await Api.isNewUser(handlerInput.requestEnvelope.session.user.userId)
            && handlerInput.requestEnvelope.request.dialogState === 'COMPLETED';
    },
    handle(handlerInput) {
        const speechText = "Entendu. Pour le test je m'arrête là.";

        return handlerInput.responseBuilder
            .speak(speechText)
            .withSimpleCard(Messages.SKILL_NAME, speechText)
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

/**
 *
 * @type {LambdaHandler}
 */
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        NewUserLaunchRequestHandler,
        UserResumeConfigLaunchRequestHandler,
        FirstConfigIntentHandlerStarted,
        PieceConfigIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler)
    .addErrorHandlers(ErrorHandler)
    .lambda();
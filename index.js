"use strict";
var Alexa = require('alexa-sdk');

var STOP_MESSAGE = 'さようなら';
var HELP_MESSAGE = '次！とつぶやいてください';
var states = {
    PLAYING_MODE: '_PLAYING_MODE'
};
var strokes = [
    "カットが来ました",
    "スマッシュが来ました。",
    "クリアが来ました。"
];
var commands = [
    '次へ',
    '次',
    'ゴー',
    'つぎ'
];
var nextStroke = function () {
    return strokes[Math.floor(Math.random() * strokes.length)];
};

var startHandlers = {
    'LaunchRequest': function () {
        this.handler.state = states.PLAYING_MODE;
        this.emit(':ask', nextStroke());
    },
    'AMAZON.HelpIntent': function () {
        this.emit(':tell', HELP_MESSAGE);
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', STOP_MESSAGE);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', STOP_MESSAGE);
    }
};

var goNextHandler = Alexa.CreateStateHandler(states.PLAYING_MODE,  {
    'GoNextIntent': function () {
        const command = this.event.request.intent.slots.command.value;
        if (commands.indexOf(command) > -1) {
            this.emit(':ask', nextStroke());
        } else {
            this.handler.state = '';
            this.emit(':tell', STOP_MESSAGE);
        }
    },
    'AMAZON.HelpIntent': function () {
        this.emit(':tell', HELP_MESSAGE);
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', STOP_MESSAGE);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', STOP_MESSAGE);
    }
});

exports.handler = function (event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.appId = process.env.APP_ID;
    alexa.registerHandlers(startHandlers, goNextHandler);
    alexa.execute();
};
"use strict";
var Alexa = require('alexa-sdk'); // Alexa SDKの読み込み

var strokes = [
    "カットが来ました",
    "スマッシュが来ました。",
    "クリアが来ました。"
];

var handlers = {
        'LaunchRequest': function() {
            this.emit('GoNextStroke');
        },
        'GoNextStroke': function() {
            var strokeIndex = Math.floor(Math.random() * strokes.length);
            this.emit(':tell', strokes[strokeIndex]);
        },
        'AMAZON.HelpIntent': function() {
            this.emit(':tell', '次のストローク！とつぶやいてください。');
        },
        'AMAZON.StopIntent': function() {
            this.emit(':tell', 'さようなら');
        },
        'AMAZON.CancelIntent': function() {
            this.emit(':tell', 'さようなら');
        }
};

exports.handler = function(event, context, callback) {

    var alexa = Alexa.handler(event, context);

    // Alexa SDKの処理
    alexa.appId = process.env.APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();

};
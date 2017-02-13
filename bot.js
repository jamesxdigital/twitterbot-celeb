console.log('The bot is starting');

var Twit = require('twit');

var config = require('./config');

console.log(config);
var T = new Twit(config);

var fs = require('fs');
var questions = fs.readFileSync('./questions.txt').toString().split("\r");
var accounts = fs.readFileSync('./accounts.txt').toString().split("\n");
var thoughts = fs.readFileSync('./thoughts.txt').toString().split("\r");




function doSomething() {
	randomNumberTweet = Math.floor((Math.random() * 10) + 0);

	randomNumberQuestions = Math.floor((Math.random() * questions.length) + 0);
	randomNumberAccounts = Math.floor((Math.random() * accounts.length) + 0);
	randomNumberThoughts = Math.floor((Math.random() * thoughts.length) + 0);

	randomQuestion = questions[randomNumberQuestions].toLowerCase();
	randomAccount = accounts[randomNumberAccounts];
	randomThought = thoughts[randomNumberThoughts].toLowerCase();


	randomQuestionTweet = '@' + randomAccount + " " + randomQuestion;
	randomThoughtTweet = randomThought;

	if (randomNumberTweet < 6){
		randomTweet = randomThoughtTweet;
	}else{
		randomTweet = randomQuestionTweet;
	}


	T.post('statuses/update', { status: randomTweet}, function(err, data, response) {
	  console.log("------------------------------------------------------------------------");
	  console.log(randomTweet);
	  console.log(data);
	});
}


(function loop() {
    var rand = randomNumberTweet = Math.floor((Math.random() * 1800000) + 300000);
    setTimeout(function() {
            doSomething();
            loop();  
    }, rand);
}());





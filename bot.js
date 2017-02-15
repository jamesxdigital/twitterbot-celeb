console.log('The bot is starting');

var Twit = require('twit');

var config = require('./config');

console.log(config);
var T = new Twit(config);

var fs = require('fs');
var questions = fs.readFileSync('./questions.txt').toString().split("\r");
var accounts = fs.readFileSync('./accounts.txt').toString().split("\n");
var thoughts = fs.readFileSync('./thoughts.txt').toString().split("\r");
var hashtags = []





function doSomething() {
	T.get('search/tweets', { q: 'question', count: 100 }, function(err, data, response) {
		randomNormalAccount = data.statuses[0].user.screen_name;
		T.get('trends/place', {id:1 }, function(err, data, response) {
			for (i = 0; i < data[0].trends.length; i++) { 
		    	hashtags.push(data[0].trends[i].name);
			}
			hashtags = hashtags.filter(Boolean)
			randomHashtag=hashtags[Math.floor((Math.random() * hashtags.length) + 0)]
			console.log(randomHashtag)

			randomNumberTweet = Math.floor((Math.random() * 10) + 0);

			randomNumberQuestions = Math.floor((Math.random() * questions.length) + 0);
			randomNumberAccounts = Math.floor((Math.random() * accounts.length) + 0);
			randomNumberThoughts = Math.floor((Math.random() * thoughts.length) + 0);

			randomQuestion = questions[randomNumberQuestions].toLowerCase();
			randomCelebAccount = accounts[randomNumberAccounts];
			randomThought = thoughts[randomNumberThoughts].toLowerCase();


			if (randomNumberTweet < 6){
				randomThoughtTweet = randomThought + " " + randomHashtag;
				randomTweet = randomThoughtTweet;
			}else{
				if (randomNumberTweet < 8){
					randomAccount = randomNormalAccount
				}
				else{
					randomAccount = randomCelebAccount
				}
				randomQuestionTweet = '@' + randomAccount + " " + randomQuestion;
				randomTweet = randomQuestionTweet;
			}

			T.post('statuses/update', { status: randomTweet}, function(err, data, response) {
				console.log("------------------------------------------------------------------------");
				console.log(randomTweet);
				console.log(data);
			});
		});
	})
}




(function loop() {
    var rand = randomNumberTweet = Math.floor((Math.random() * 3600000) + 1800000);
    setTimeout(function() {
            doSomething();
            loop();  
    }, rand);
}());

// 1800000) + 300000)
// 70000) + 60000)





// Your apiRoutes.js file should contain two routes:
// 	A GET route with the url /api/friends. This will be used to display a JSON of all possible friends.
// 	A POST routes /api/friends. This will be used to handle incoming survey results. This route will also be used to handle the compatibility logic.

var friends = require("../data/friends.js");

module.exports = function (app) {

	app.get("/api/friends", function (req, res) {
		res.json(friends);
		console.log("Number of entries: ",friends.length);
	});

	app.post("/api/friends", function (req, res) {

		var bff = {
			name: "nil",
			pic: "nil",
			friendDifference: 1000
		};

		var userProfile = req.body;
		var usersScores = userProfile.surveyResults;
		var totalDiff = 0;

		for (var i = 0; i < friends.length; i++) {
			totalDiff = 0;

			for (var j = 0; j < friends[i].surveyResults.length; j++) {
				
				totalDiff += Math.abs(parseInt(usersScores[j]) - parseInt(friends[i].surveyResults[j]));

				if (totalDiff <= bff.friendDifference) {
					bff.name = friends[i].name;
					bff.pic = friends[i].pic;
					bff.friendDifference = totalDiff;
				}
			}
		}

		friends.push(userProfile);

		res.json(bff); 

	});
}




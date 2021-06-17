var express = require('express');
var teamRouter = express.Router()

const links=[
	{
		linkName: "Home",
		linkURL: "/"
	},
	{
		linkName: "Coaches",
		linkURL: "coachAdmin.html"
	},
	{
		linkName: "Login",
		linkURL: "login.html"
	},
	{
		linkName: "Teams",
		linkURL: "teams.html"
	},
	{
		linkName: "Club Admin",
		linkURL: "/clubAdmin"
	},
	{
		linkName: "Article Management",
		linkURL: "/clubAdmin/articles/admin"
	}
]


teamRouter.get('/:name', (req, res) => {
	const { name } = req.params;
	const team = {
		name: `${name}`,
		news: [
			{
				title: 'Team meeting scheduled for Tuesday',
				details: 'Bring your playbooks',
			},
			{
				title: 'Practice Wed',
				details: 'Rain or shine',
			},
		],
		players: [
			{
				name: 'Phil Taylor',
				age: '12'
			},
			{
				name: 'JJ Baley',
				age: '13'
			},
		],
	};

	res.render('team', { pageName: name, info: team.news,  links: links });
});





module.exports = teamRouter;
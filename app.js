/* eslint-disable linebreak-style */
const express = require('express');
const path = require('path');


const app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 4040;

const links=[
	{
		linkName: "Home",
		linkURL: "home.html"
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
		}
]

app.get('/', (req, res) => {
	const news = [
		{ title: 'Club news - Red Team', desc: "Welcome to today's news.  Team Red takes lead" },
		{ title: 'Boys 15-16 Rep Team', desc: 'Rep team off to Windsor for weekend.' },
		{ title: 'Girls 15-16 Rep Team', desc: 'Big win on the weekend against Sarnia.  Takes 2nd place in the Tourney.' },
		{ title: 'Club news - Green Team', desc: 'Game vs. Blue team - canceled.' },
	];

	res.render('home', { pageName: 'Home', news: news, links: links });
});

app.get('/team/:name', (req, res) => {
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

app.listen(PORT, () => console.log(`App started on port ${PORT}`));

module.exports = app;

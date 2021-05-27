/* eslint-disable linebreak-style */
const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 4040;

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
	}
]

app.get('/', (req, res) => {
	const news = [
		{ title: 'Club news - Red Team', tagLine:"Red Moves Up",  desc: "Welcome to today's news.  Team Red takes lead" },
		{ title: 'Boys 15-16 Rep Team', tagLine:"Boys rep team travelling", desc: 'Rep team off to Windsor for weekend.' },
		{ title: 'Girls 15-16 Rep Team', tagLine: "Girls rep team on the road", desc: 'Big win on the weekend against Sarnia.  Takes 2nd place in the Tourney.' },
		{ title: 'Club news - Green Team', tagLine: "Green vs. Blue cancellation: ", desc: 'Green vs. Blue team - canceled.' },
	];

	res.render('home', { pageName: 'Home', news: news, links: links });
});

app.get('/teams', (req,res)=>{
	const teams =[{
		name: "Red",
		coach: "Tim Burton",
		homePage: "red"
	},
	{
		name:"Blue",
		coach: "Jon Bill",
		homePage: "blue"
	}]
	res.render("teams", {pageName: "Club Teams", teams})

})

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


app.get('/clubAdmin',(req,res)=>{
	res.render('admin', { pageName: "Club Administration",links: links });
})

app.post('/clubAdmin', (req,res)=>{

	console.log(req.body)
	res.send('done')
})

app.listen(PORT, () => console.log(`App started on port ${PORT}`));

module.exports = app;

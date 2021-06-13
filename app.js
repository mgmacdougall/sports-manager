/* eslint-disable linebreak-style */
require('dotenv').config()
const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const clubPost = require('./models/news');
const DB = require('./utils/connections');
const app = express();
const _db = DB.getConnection();

app.use(methodOverride('_method'));

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

app.get('/', async(req, res) => {
	const results = await clubPost.find({});
	res.render('home', { pageName: 'Home', results: results, links: links });
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

app.post('/clubAdmin', async (req,res)=>{
	let {title, tagLine, desc} = req.body;
	const Item = new clubPost({
		title: title,
		desc: desc,
		tag: tagLine
	})
	await Item.save();
	res.redirect('/')
})

// For editing an existing news item.
app.get('/clubAdmin/edit/:articleId',async (req, res)=>{
	const {articleId} = req.params;
	const results = await clubPost.findOne({_id:articleId});
	res.render('admin-edit', {pageName: "Club Administration", links: links, newsItem:results})
}) 

// PUT functionality to replace the entire entry in the news items
app.put('/clubAdmin/edit/:articleId', async(req,res)=>{
	const {articleId} = req.params;
	const details = req.body;
	await clubPost.findOneAndUpdate({_id:articleId},details, {useFindAndModify: false})
	res.redirect('/'); // return the user back to the main news screen.
})

app.listen(PORT, () => console.log(`App started on port ${PORT}`));

module.exports = app;

/* eslint-disable linebreak-style */
require('dotenv').config()
const express = require('express');
const teamsRouter = require('./routes/teamsRouter.js')
const teamRouter = require('./routes/teamRouter.js')
const clubAdminRouter = require('./routes/clubAdminRouter.js')

const fs = require('fs');
const path = require('path');
const methodOverride = require('method-override');
const clubPost = require('./models/news');
const DB = require('./utils/connections');
const morgan = require('morgan');


const app = express();
const _db = DB.getConnection();

const accessStreamLog = fs.createWriteStream(path.join(__dirname, 'access.log'));
app.use(morgan('combined', { stream: accessStreamLog }))


app.use(methodOverride('_method'));

app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views')); 
app.set('view engine', 'ejs');

app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use('/clubAdmin', clubAdminRouter); // Cllub Admin router
app.use('/teams', teamsRouter) // teams Page router
app.use('/team', teamRouter) // teams Page router

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
	},
	{
		linkName: "Article Management",
		linkURL: "/clubAdmin/articles/admin"
	}
]
app.get('/', async(req, res) => {
	const results = await clubPost.find({});
	res.render('home', { pageName: 'Home', results: results, links: links });
});



app.listen(PORT, () => console.log(`App started on port ${PORT}`));

module.exports = app;

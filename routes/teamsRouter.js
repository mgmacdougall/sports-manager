var express = require('express');
var teamsRouter = express.Router()


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

teamsRouter.get('/', (req,res)=>{
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

module.exports = teamsRouter;


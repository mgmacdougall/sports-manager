var express = require('express');
var clubAdminRouter = express.Router()

const clubAdminService = require('../services/clubAdminService.js')
const ClubAdminController = require('../controllers/ClubAdminController');
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


clubAdminRouter.get('/',(req,res)=>{
	res.render('admin', { pageName: "Club Administration",links: links });
})


clubAdminRouter.post('/', async (req,res)=>{
	await ClubAdminController.apiV1CreateArticle(req,res)
	res.redirect('/')
})

clubAdminRouter.get('/edit/:articleId',async (req, res)=>{
	const results = await ClubAdminController.apiV1GetSingleArticleById(req,res);
	res.render('admin-edit', {pageName: "Club Administration", links: links, newsItem:results})
}) 

// PUT functionality to replace the entire entry in the news items
clubAdminRouter.put('/edit/:articleId', async(req,res)=>{
	await ClubAdminController.apiV1PuUpdateSingleArticleById(req,res);
	res.redirect('/'); // return the user back to the main news screen.
})

// Finds one an deletes the article
clubAdminRouter.delete('/edit/:articleId', async(req,res)=>{
	await ClubAdminController.apiV1DeleteArticleById(req,res);
	res.redirect('/')
})


clubAdminRouter.get('/articles/admin', async(req, res)=>{
		const results = await ClubAdminController.apiV1GetAllArticles()
		res.render('article-list', { pageName: 'Home', results: results, links: links });
})

clubAdminRouter.delete('/articles/admin', async(req,res)=>{
	await ClubAdminController.apiV1DeleteMultipleArticles(req, res);
	return res.redirect('/')
})

module.exports = clubAdminRouter;
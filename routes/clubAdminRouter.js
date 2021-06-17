var express = require('express');
var clubAdminRouter = express.Router()
// const clubPost = require('../models/news');

const clubAdminService = require('../services/clubAdminService.js')
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
	let {title, tagLine, desc} = req.body;
	await clubAdminService.createArticle(title, tagLine, desc);
	res.redirect('/')
})

clubAdminRouter.get('/edit/:articleId',async (req, res)=>{
	const {articleId} = req.params;
	const results = await clubAdminService.getArticleById(articleId);
	res.render('admin-edit', {pageName: "Club Administration", links: links, newsItem:results})
}) 

// PUT functionality to replace the entire entry in the news items
clubAdminRouter.put('/edit/:articleId', async(req,res)=>{
	const {articleId} = req.params;
	const details = req.body;
	await clubAdminService.updateById(articleId, details);
	res.redirect('/'); // return the user back to the main news screen.
})

// Finds one an deletes the article
clubAdminRouter.delete('/edit/:articleId', async(req,res)=>{
	const {articleId} = req.params;
	await clubAdminService.deleteArticleById(articleId);
	res.redirect('/')
})


clubAdminRouter.get('/articles/admin', async(req, res)=>{
		const results = await clubAdminService.getAllArticles();
		res.render('article-list', { pageName: 'Home', results: results, links: links });
})

clubAdminRouter.delete('/articles/admin', async(req,res)=>{
	const {selection} = req.body;
	await clubAdminService.deleteMultipleById(selection);
	return res.redirect('/')
})

module.exports = clubAdminRouter;
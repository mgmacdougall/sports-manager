var express = require('express');
var clubAdminRouter = express.Router()
const clubPost = require('../models/news');

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
	const Item = new clubPost({
		title: title,
		desc: desc,
		tag: tagLine
	})
	await Item.save();
	res.redirect('/')
})

clubAdminRouter.get('/edit/:articleId',async (req, res)=>{
	const {articleId} = req.params;
	const results = await clubPost.findOne({_id:articleId});
	res.render('admin-edit', {pageName: "Club Administration", links: links, newsItem:results})
}) 

// PUT functionality to replace the entire entry in the news items
clubAdminRouter.put('/edit/:articleId', async(req,res)=>{
	const {articleId} = req.params;
	const details = req.body;
	await clubPost.findOneAndUpdate({_id:articleId},details, {useFindAndModify: false})
	res.redirect('/'); // return the user back to the main news screen.
})

// Finds one an deletes the article
clubAdminRouter.delete('/edit/:articleId', async(req,res)=>{
	const {asticleId} = req.params;
	await clubPost.findOneAndDelete({_id: articleId});
	res.redirect('/')
})


clubAdminRouter.get('/articles/admin', async(req, res)=>{
	// First get all the articles in the db
		const results = await clubPost.find({});
		res.render('article-list', { pageName: 'Home', results: results, links: links });
})


clubAdminRouter.delete('/articles/admin', async(req,res)=>{
	const {selection} = req.body;
	if(Array.isArray(selection) || selection){
			if(Array.isArray(selection)){
				for(let i=0; i<selection.length; i++){
					await clubPost.deleteOne({_id:`${selection[i]}`})
				}
			}else{
				await clubPost.deleteOne({_id:`${selection}`})
			}
		}else{
			console.log('error')
		}
		return res.redirect('/')
})

module.exports = clubAdminRouter;
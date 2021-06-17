const ClubAdminService = require('../services/clubAdminService');



class ClubAdminController {


    async apiV1GetAllArticles(req, res, next){
      const articles = await ClubAdminService.getAllArticles();

      return articles;
    }

    async apiV1GetSingleArticleById(req, res, next){
      const {articleId} = req.params;
      const article = await ClubAdminService.getArticleById(articleId);
      return article;
    }

    async apiV1PuUpdateSingleArticleById(req, res){
      const {articleId} = req.params;
      const details = req.body;

      await ClubAdminService.updateById(articleId, details)

    }

    async apiV1DeleteArticleById(req, res){
      const {articleId} = req.params;
      return ClubAdminService.deleteArticleById(articleId);
    }

    async apiV1CreateArticle(req, res){
      let {title, tagLine, desc} = req.body;
	    return ClubAdminService.createArticle(title, tagLine, desc);
    }

    async apiV1DeleteMultipleArticles(req, res){
      const {selection} = req.body;
      await ClubAdminService.deleteMultipleById(selection);
    }

}

module.exports = new ClubAdminController;
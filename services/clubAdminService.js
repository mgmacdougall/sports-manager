/**
 * Club Administration Controller 
 */
const clubPost = require('../models/news');

class ClubAdminService{

  getAllArticles = async ()=>{
    const results = await clubPost.find({});
    if(results){
      return results;
    }
  }

  getArticleById = async(id)=>{
    const results = await clubPost.findOne({_id:id});
    
    if(results){
      return results;
    }
  }

  updateById = async(id, details)=>{
    return await clubPost.findOneAndUpdate({_id:id},details, {useFindAndModify: false})
  }

  createArticle = async(title, desc, tag)=>{
    const Item = new clubPost({
      title: title,
      desc: desc,
      tag: tag
    })
    return  Item.save();
  }

  deleteArticleById = async(id) =>{
    return clubPost.findOneAndDelete({_id: id});
  }

  deleteMultipleById = async(selection)=>{

    if(Array.isArray(selection) || selection){
			if(Array.isArray(selection)){
				for(let i=0; i<selection.length; i++){
					await clubPost.deleteOne({_id:`${selection[i]}`})
				}
			}else{
				await clubPost.deleteOne({_id:`${selection}`})
			}
		}else{
			return console.log('error')
		}
  }
}

module.exports = new ClubAdminService();
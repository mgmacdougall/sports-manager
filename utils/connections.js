const mongoose = require('mongoose');

/**
 * MongoDB connection file
 */
class DB{

  async getConnection(){
    const connectionString = process.env.DB_CONNECTION+":"+process.env.DB_PORT+"/"+process.env.DB_NAME;
    
      try{
        return await mongoose.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true});
      }catch(e){
        console.log('Error', e)
      }
  }

}

module.exports = new DB();

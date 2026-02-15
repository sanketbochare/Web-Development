const mongoose=require('mongoose');
const colors=require("colors");

// functions mongodb database connection
const connectDb= async ()=>{
    try{
      await mongoose.connect(process.env.MONGO_URL);
      console.log(`connected to databse ${mongoose.connection.host}`);
    }catch(err){
       console.log("DB Error", console.err);
    }
};
module.exports=connectDb;
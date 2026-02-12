var mongoose=require('mongoose');

//genre Schema
var genreSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    create_date:{
       type:Date,
       default:Date.now
    }
});

Genre =mongoose.model('genre',genreSchema);

//Get genres
module.exports={Genre,
    getGenres:async()=>{
    return await Genre.find();
},
updateGenre: async(id,data)=>{
  return await Genre.findByIdAndUpdate(id,data,{new:true});
},
deleteGenre:async (id)=>{
    return await Genre.findByIdAndDelete(id);
}
};



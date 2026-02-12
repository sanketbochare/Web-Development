var express=require(`express`);
var app=express();
var mongoose=require(`mongoose`);

const { Books, getBooks, getBookById, addBook, updateBook, deleteBook} = require('./models/books');
const { Genre,getGenres, updateGenre, deleteGenre} = require('./models/genre');
app.use(express.json());
//connect ti mongoose
mongoose.connect(`mongodb://127.0.0.1:27017/bookstore`);
var db=mongoose.connection;

app.get('/',(req,res)=>{
    res.send(`Please use /api/books or /api/geners`);
});

app.get('/api/books',async(req,res)=>{
    try{
        const books=await getBooks();
        res.json(books);
    }catch(err){
        res.status(500).json({err:err.message});
    }
})
    app.get('/api/books/:id',async(req,res)=>{
        try{
            const book=await getBookById(req.params.id);
            res.json(book);
        }catch(err){
            res.status(500).json({err:err.message});
        }
    })

   app.put('/api/books/:id',async(req,res)=>{
    try{
      var id=req.params.id;
      const book=await updateBook(id,req.body);
      res.json(book);
    }catch(err){
      res.status(400).json({error:err.message});
    }
   });   

app.get('/api/genres',async (req,res)=>{
   try{
    const genres=await getGenres();
    res.json(genres);
   }catch(err){
    res.status(500).json({err:err.message});
   }
});
app.post('/api/genres', async (req, res) => {
  try {
    const genre = new Genre(req.body);
    const savedGenre = await genre.save();
    res.status(201).json(savedGenre);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
app.put('/api/genres/:id', async (req, res) => {
  try {
    var id=req.params.id;
    const genre=await updateGenre(id,req.body);
    res.json(genre);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.post('/api/books', async (req,res)=>{
  try{
   const book=await addBook(req.body);
    res.json(book);
  }catch(err){
    res.status(400).json(
        {error:err.message}
    );
  }
});

app.delete('/api/books/:id',async (req,res)=>{
  try{
    const id=req.params.id;
    const deletedBook=await deleteBook(id);
    if(!deletedBook){
      return res.status(404).json({error:"Book not found"});
    }

    res.json({
      message:"Book deleted successfully",
      deletedBook
    });
  }catch(err){
    res.status(400).json({error:err.message});
  }
});
app.delete('/api/genres/:id', async (req,res)=>{
   try{
    const id=req.params.id;
    const deletedGenre=await deleteGenre(id);
    if(!deletedGenre){
      return res.status(404).json({error:"Genre not found"});
    }

    res.json({
      message:"Genre delted sucessfully",
      deletedGenre
    });
   }catch(err){
     res.status(400).json({error:err.message});
   }
});
app.listen(3000);
console.log("Running on port 3000....");
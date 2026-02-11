/*Express :
  Express is a Node.js web application framework that helps us to make web application.

  -It is used for server side programming 

  what it does :
  1. Listen for incoming request 
  2. Parse the request
  3. Match the response with routes
  4. Sending response

  How to install ?
   use "npm install express"
*/

const express=require("express");
const app =express();//Returns application object

let port=8080; // Server listens on port 8080

app.listen(port,()=>{
    // listen function(starts the server)
    console.log(`app listening on port ${port}`);
});

/* app.use((req, res)=>{
   // adds a middleware
   console.log("request received");
   res.send(`<h1>This is a basic html response </h1>`);
}) */

app.get('/',(req,res)=>{
       res.send(`<h1>This is response for route path`);
});
app.get('/home',(req,res)=>{
       res.send(`<h1>This is response for home page</h1>`);
});

app.get('/about',(req,res)=>{
       res.send(`<h1>My name is sanket</h1>`);
});

app.get('/:username',(req,res)=>{
    console.log(req.params)
    let {q}=req.query;
       res.send(`
        Hello ${req.params.username}
        <ul><li>Mo : 8308490603</li>
        <li>email : sanketbochare90@gmail.com</li><ul><br>
        Query : ${q}`);
});
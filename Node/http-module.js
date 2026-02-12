const http=require('http')
const server=http.createServer((req,res)=>{
    if(req.url==='/'){
res.write("Welcome to oour homepage")
}
if(req.url==='/about'){
    res.write(
   ` <h1>My name is sanket bochare
    </h1> 
    <h3>Softare engineer</h3>`)
}
res.end()
})
server.listen(5005)
const {readFile,writeFile, write}= require('fs')
let first ,second 
readFile('./content/first.txt','utf8',(err,result)=>{
    if(err){
        console.log(err)
        return
    }
    first=result
    readFile(`./content/second.txt`,`utf8`,(err,result)=>{
        if(err){
            console.log(err)
            return
        }
        second=result
    })
    writeFile(`./content/result-async.txt`,`Here is the result : ${first},${second}`,`utf8`,(err,result)=>{
        if(err){
            console.log(err)
            return
        }
    })
})
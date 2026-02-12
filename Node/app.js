console.log("start operation");

await function sleep(mil){
    let startTime=new Date().getTime();
    console.log(`Operation is running : ${startTime}`);
    while(new Date().getTime()<startTime+mil){
     console.log("in progress") ;  
    }
}
sleep(1000);
console.log("do something else...");
console.log("star operation");

async function sleep(mil){
    let startTime=new Date().getTime();

    while(new Date().getTime()<startTime+mil){
     console.log("in progress") ;  
    }
}
sleep(1000);
console.log("done");
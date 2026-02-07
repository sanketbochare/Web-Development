const yrs=document.getElementById("years");
const mnth=document.getElementById("months");
const ds=document.getElementById("days");
const hrs=document.getElementById("hours");
const min=document.getElementById("minutes");
const sec=document.getElementById("seconds");
let timer;
function showTime(){
   
  if(timer){
    clearInterval(timer)
  }
  timer=setInterval(()=>{
  const dobinput=document.getElementById("dbinput").value;
  if (!dobinput) return;
  const dob=new Date(dobinput);
  const now=new Date();
  const diffInMs=now-dob;
  if(diffInMs<0){
    yrs.innerHTML="Date of birth cannot be from future";
    return;
  }
  document.getElementById("container").classList.add("Result"); 
  document.getElementById("result").classList.add("content");
 
  let totalYears=now.getFullYear()-dob.getFullYear();

  if(now.getMonth()<dob.getMonth()){
    totalYears-=1;
  }
  else if(now.getMonth()==dob.getMonth() && now.getDate()<dob.getDate()){
     totalYears-=1;
  }

let adjustedDate=new Date(dob);
adjustedDate.setFullYear(adjustedDate.getFullYear()+totalYears);

let months=now.getMonth()-adjustedDate.getMonth();
if(now.getDate()<adjustedDate.getDate()){
  months-=1;
}
if(months<0){
  months+=12;
}
adjustedDate.setMonth(adjustedDate.getMonth()+months)

let millSecDay=1000*60*60*24;
let resDays=Math.floor((now-adjustedDate)/millSecDay);

 yrs.innerHTML=totalYears;
 mnth.innerHTML=months;
 ds.innerHTML=resDays;
 hrs.innerHTML=now.getHours(); 
 min.innerHTML=now.getMinutes();
 sec.innerHTML=now.getSeconds();
  },1000);   
}
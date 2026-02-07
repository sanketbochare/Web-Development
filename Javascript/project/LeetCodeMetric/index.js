document.addEventListener("DOMContentLoaded", function(){
    const btn=document.getElementById("btn");
    const userInput=document.getElementById("name");
    const statsContianer=document.querySelector(".stats-container");
    const easyProgressCircle=document.querySelector(".easy-progress");
    const mediumProgressCircle=document.querySelector(".medium-progress");
    const hardProgressCircle=document.querySelector(".hard-progress");
    const easyLabel=document.getElementById("easy-label");
    const mediumLabel=document.getElementById("medium-label");
    const hardLabel=document.getElementById("hard-label");
    const cardSatsContainer=document.querySelector(".stats-cards"); 

    async function fetchUserDetails(username) {
  btn.textContent = "Searching...";
  btn.disabled = true;

  const proxyUrl = "https://cors-anywhere.herokuapp.com/";
  const targetUrl = "https://leetcode.com/graphql/";

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  try {
    const graphql = JSON.stringify({
      query: `
        query userSessionProgress($username: String!) {
          allQuestionsCount {
            difficulty
            count
          }
          matchedUser(username: $username) {
            submitStats {
              acSubmissionNum {
                difficulty
                count
                submissions
              }
              totalSubmissionNum {
                difficulty
                count
                submissions
              }
            }
          }
        }
      `,
      variables: { username }
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: graphql
    };

    const response = await fetch(proxyUrl + targetUrl, requestOptions);

    if (!response.ok) {
      throw new Error("Unable to fetch user details");
    }

    const parsedData = await response.json();
    console.log("Logging data:", parsedData);
   displayUserData(parsedData);
  } catch (error) {
    statsContianer.innerHTML = "<p>No data found</p>";
    console.log(`Error:${error}`);
  } finally {
    btn.textContent = "Search";
    btn.disabled = false;
  }
}
    function UpdateProgress(solved,total,label,circle){
      const progressDegree=(solved/total)*100;
      circle.style.setProperty("--progress-degree",`${progressDegree}%`);
      label.textContent=`${solved}/${total}`;
    }
   
    function validateUsername(username){
        if(username.trim()===""){
            alert("username should not be empty")
        }
        const regex=/^[a-zA-Z_][a-zA-Z0-9_]{2,29}$/;
        const isMatching=regex.test(username);
        if(!isMatching){
            alert("Invalid Username");
        }
        return isMatching;
    }

    btn.addEventListener("click", function(){
        const username=userInput.value;
        console.log(username);
        if(validateUsername(username)){
            fetchUserDetails(username);
        }
    })

    function displayUserData(parsedData){
        const totalQues=parsedData.data.allQuestionsCount[0].count;
        const totalEasy=parsedData.data.allQuestionsCount[1].count;
        const totalMedium=parsedData.data.allQuestionsCount[2].count;
        const totalHard=parsedData.data.allQuestionsCount[3].count;

        const mysolvedQues=parsedData.data.matchedUser.submitStats.acSubmissionNum[0].count;
        const mySolvedEasy=parsedData.data.matchedUser.submitStats.acSubmissionNum[1].count;
        const mySolvedMedium=parsedData.data.matchedUser.submitStats.acSubmissionNum[2].count;
        const mySolvedHard=parsedData.data.matchedUser.submitStats.acSubmissionNum[3].count;
         
        UpdateProgress(mySolvedEasy,totalEasy,easyLabel,easyProgressCircle);
        UpdateProgress(mySolvedMedium,totalMedium,mediumLabel,mediumProgressCircle);
        UpdateProgress(mySolvedHard,totalHard,hardLabel,hardProgressCircle);

        const cardData=
          {label:"Overall Submissions", value:parsedData.data.matchedUser.submitStats.totalSubmissionNum[0].submissions}
        
    }
})
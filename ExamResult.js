var users = JSON.parse(localStorage.getItem ("users")) || []

var user = users.find(u => u.exam && u.exam.logedIn)   


  if (!user || !user.exam.submited) {      
    window.location.href = "login.html";
  }
  else{
    var score = user.exam.score || 0;
    var percentageNum = (score / 10) * 100;
    var percentage = percentageNum + "%";


    var gradecolor = document.getElementById("grade");
    var gradetext = ""

    gradecolor.classList.remove(
        "text-green-600",
        "text-green-500",
        "text-yellow-500",
        "text-orange-500",
        "text-red-600"
    )

    if (percentageNum >= 90){
      gradetext = "A";
      gradecolor.className = "text-2xl font-bold text-green-600";
    }
       
    else if (percentageNum >= 80)
      {
        gradetext = "B";
        gradecolor.className = "text-2xl font-bold text-green-500";
      } 
    else if (percentageNum >= 70){
      gradetext = "C";
      gradecolor.className = "text-2xl font-bold text-yellow-500";
    } 
    else if (percentageNum >= 60){
      gradetext = "D";
      gradecolor.className = "text-2xl font-bold text-orange-500";
    } 
    else{
      gradetext = "F";
      gradecolor.className = "text-2xl font-bold text-red-600";
    }

    // var spentSeconds = exam.spentTime || 0;
    var minutes = Math.floor(user.exam.spentTime / 60);
    var seconds = user.exam.spentTime - minutes * 60;

    var messageDiv = document.getElementById("completion-message");
    if (user.exam.completionMessage) {
      messageDiv.textContent = user.exam.completionMessage;
      if (user.exam.completionMessage === "Time's up!") {
        messageDiv.classList.add("text-red-500");
      } else {
        messageDiv.classList.add("text-green-500");
      }
    }

    document.getElementById("score").textContent = `${score}/${10}`;
    document.getElementById("grade").textContent = gradetext;
    document.getElementById("percentage").textContent = percentage;
    document.getElementById("time").textContent = `Completed in ${minutes}m ${seconds}s`;

  }

  document.getElementById("homebtn").addEventListener("click", function () {
    // Get users from localStorage
    var users = JSON.parse(localStorage.getItem("users")) || [];
    
    // Find the logged-in user
    var user = users.find(u => u.exam && u.exam.logedIn);

    if (user) {
        user.exam.logedIn = false; // log them out
        localStorage.setItem("users", JSON.stringify(users));
    }

    // Redirect to login page
    window.location.href = "login.html";
});
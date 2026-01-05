


var users = JSON.parse(localStorage.getItem("users")) || [];
var user = users.find(u => u.exam.logedIn);
if (!user) {
  window.location.href = "login.html";
}

if(user.exam.submited){
  window.location.replace("ExamResult.html");

}

if (!user.exam.startTime) {
  user.exam.startTime = Date.now();
  localStorage.setItem("users", JSON.stringify(users));
}



history.pushState(null, null, location.href);
window.addEventListener('popstate', function () {
    history.pushState(null, null, location.href);
});

//check 3la el submit

// var isflagged = false;

var exam = {
  title: "JavaScript Basics",
  duration: 10 * 60, // 10 minutes
  questions: [
    {
      id: 1,
      question: "What does JS stand for?",
      options: ["Java Source", "JavaScript", "Just Script", "Json Script"],
      correctAnswer: 1,
      isflagged: false
    },
    {
      id: 2,
      question: "Which keyword is used to declare a variable?",
      options: ["var", "let", "var", "All of the above"],
      correctAnswer: 3,
      isflagged: false
    },
    {
      id: 3,
      question: "Which method converts JSON to object?",
      options: ["parse()", "stringify()", "convert()", "toObject()"],
      correctAnswer: 0,
      isflagged: false
    },
    {
      id: 4,
      question: "Which symbol is used for comments in JavaScript?",
      options: ["--", "//", "#", "**"],
      correctAnswer: 1,
      isflagged: false
    },
    {
      id: 5,
      question: "Which data type is NOT primitive?",
      options: ["String", "Number", "Object", "Boolean"],
      correctAnswer: 2,
      isflagged: false
    },
    {
      id: 6,
      question: "How do you write an array in JavaScript?",
      options: [
        "var arr = {}",
        "var arr = []",
        "var arr = ()",
        "var arr = <>"
      ],
      correctAnswer: 1,
      isflagged: false
    },
    {
      id: 7,
      question: "Which method adds an element to the end of an array?",
      options: ["push()", "pop()", "shift()", "unshift()"],
      correctAnswer: 0,
      isflagged: false
    },
    {
      id: 8,
      question: "Which operator is used to compare value AND type?",
      options: ["==", "=", "===", "!="],
      correctAnswer: 2,
      isflagged: false
    },
    {
      id: 9,
      question: "What is the result of typeof [] ?",
      options: ["array", "object", "list", "undefined"],
      correctAnswer: 1,
      isflagged: false
    },
    {
      id: 10,
      question: "Which function is used to print something in console?",
      options: ["print()", "log()", "console.log()", "write()"],
      correctAnswer: 2,
      isflagged: false
    }
  ]
};


if (!user.exam.answers || user.exam.answers.length === 0) {
  user.exam.answers = new Array(exam.questions.length).fill(-1);

}
if (!user.exam.visited || user.exam.visited.length === 0) {
  user.exam.visited = new Array(exam.questions.length).fill(false);

}
if (!user.exam.flagged || user.exam.flagged.length === 0) {
  user.exam.flagged = new Array(exam.questions.length).fill(false);
}
countansweredquestions()

if (!user.exam.questionOrder || user.exam.questionOrder.length === 0) {
  user.exam.questionOrder = exam.questions
    .map((_, i) => i)
    .sort(() => Math.random() - 0.5);

  localStorage.setItem("users", JSON.stringify(users));
}




var timerdiv = document.querySelector(".timer")
// console.log(timerdiv)

var totalSeconds = exam.duration;
var seconds = totalSeconds - user.exam.spentTime;
console.log(seconds)
// var timePassed = 0;// 26:06

// user.exam.spentTime = 0;


timerInterval = setInterval(() => {
  if (seconds < 0) {
    //auto submit w n7sb l result w timeout
    seconds = 0; // Prevent negative values
  }

  var min = Math.floor(seconds / 60);
  var sec = seconds % 60;



  document.getElementById("timer").textContent =
    `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
if (seconds <= 0) {
  clearInterval(timerInterval);
  user.exam.completionMessage = "Time's up!";
  finalSubmit();
}

  if ((seconds / totalSeconds) * 100 <= 20) {
    timerdiv.classList.add("late");
  } else {
    timerdiv.classList.remove("late");
  }
  // console.log(user.exam.spentTime)
  user.exam.spentTime++;
  localStorage.setItem("users", JSON.stringify(users));

  var tprogress = document.querySelector(".tprogress");

  var progressPercent = Math.min((user.exam.spentTime / totalSeconds) * 100, 100);
  if (tprogress) {
    tprogress.style.width = `${progressPercent}%`;
  }


  seconds--;
}, 1000);




//flag
var flag = document.querySelector(".flag")
console.log(flag)

var containercontent = document.getElementById("flaggedquestionlist")
var hflag = document.getElementById("flagicon")

function syncflag() {
  realIndex = user.exam.questionOrder[user.exam.currentQuestion];
  var f = exam.questions[ realIndex ]
  // isflagged = f.isflagged;

  if (user.exam.flagged[realIndex]) {
    flag.classList.add('fa-solid', 'text-orange-500');
    flag.classList.remove('fa-regular');;
  } else {
    flag.classList.remove('fa-solid', 'text-orange-500');
    flag.classList.add('fa-regular');
  }
}



function countflaggedquestions() {
  var counter = 0;

  for (var i = 0; i < exam.questions.length; i++) {
    if (user.exam.flagged[i]) {
      counter++;
    }
  }

  var flagcounter = document.getElementById("flagcounter");
  if (flagcounter)
    flagcounter.textContent = counter;

}






flag.addEventListener("click", function (e) {
  realIndex = user.exam.questionOrder[user.exam.currentQuestion];
  var f = exam.questions[ realIndex ]




  // f.isflagged = false;

  if (user.exam.flagged[realIndex]) {
    flag.classList.remove('fa-solid', 'text-orange-500')
    flag.classList.add('fa-regular')
    // hflag.classList.remove('fa-solid','text-orange-500')
    // hflag.classList.add('fa-regular')
    // isflagged = false
    user.exam.flagged[realIndex] = false;


  } else {

    flag.classList.remove('fa-regular')
    flag.classList.add('fa-solid', 'text-orange-500')
    // hflag.classList.remove('fa-regular')
    // hflag.classList.add('fa-solid','text-orange-500')
    // isflagged = true
    user.exam.flagged[realIndex] = true
  }
  renderPagination()
  localStorage.setItem("users", JSON.stringify(users));
  syncflag();
  updateflagcontainer();
  countflaggedquestions();
})


// var flagcontainer = document.getElementById("flagcontainer");

function updateflagcontainer() {
  containercontent.innerHTML = "";

  var flaggedquestion = [];
  for (var i = 0; i < exam.questions.length; i++) {
    var q = exam.questions[i];
    if (user.exam.flagged[i]) {
      flaggedquestion.push({
        question: q,
        index: i
      });
    }
  }

  if (flaggedquestion.length === 0) {
    containercontent.innerHTML = `<p class="text-gray-800 flex flex-col mb-15 font-normal">
            No flagged questions yet. Click the bookmark icon to flag questions for review.
        </p>`;
  }
  else {
    flaggedquestion.forEach((q , i) => {
      var displayNumber = user.exam.questionOrder.indexOf(q.index) + 1;
      var div = document.createElement("div")
      div.className = "col-span-3 py-3 flex items-center gap-2 bg-violet-200 duration-300 rounded-lg text-center justify-between px-3 mb-3 cursor-pointer hover:border-violet-500 transition border border-transparent";
      div.innerHTML = `
                <div class="flex items-center gap-3">
                    <span class="w-8 h-8 rounded-full text-orange-500 flex items-center justify-center bg-white font-bold text-sm shadow-sm">${i + 1}</span>
                    <span class="text-gray-800 font-semibold">Question: ${displayNumber}</span>
                </div>
                <div>
                    <i  class="fa-regular fa-flag text-orange-500 p-2 rounded-lg transition-colors duration-200 hover:bg-[#b24bf3]"></i>
                </div>
            `;
      containercontent.appendChild(div);

      var index = q.index;
      var icon = div.querySelector("i");


      if (user.exam.flagged[index]) {
        icon.classList.remove('fa-regular');
        icon.classList.add('fa-solid', 'text-orange-500');
      }
    //   icon.addEventListener("click", function () {

    //     user.exam.flagged[index] = false;

    //     if (index === user.exam.currentQuestion) {
    //       // flag.classList.add('fa-solid','text-orange-500')
    //       // isflagged = false;
    //       syncflag();
    //     }
    //     updateflagcontainer();
    //     countflaggedquestions();
    //   }
    //   )
      div.addEventListener("click", function (e) {
        e.stopPropagation();
        //     user.exam.flagged[index] = false;
        user.exam.currentQuestion = user.exam.questionOrder.indexOf(q.index);
        renderQuestion();
        renderPagination();
      })


      icon.addEventListener("click", function (e) {
    e.stopPropagation(); // Stop the click event from going up to the parent div

    user.exam.flagged[index] = false;

    if (index === user.exam.questionOrder[user.exam.currentQuestion]) {
        syncflag();
    }
    renderPagination()

    updateflagcontainer();
    countflaggedquestions();
});

    });

  }

  // if (flaggedquestion.length > 2) {
  //   containercontent.classList.add("overflow-y-auto", "max-h-72");
  // } else {
  //   containercontent.classList.remove("overflow-y-auto", "max-h-72");
  // }

//   var flagcontainercontent = document.getElementById("flaggedquestionlist")
//   var flaggedQuestions = containercontent.children;
//   var visibleItems = 3;

// if (flaggedQuestions.length > visibleItems) {
//   var itemHeight = flaggedQuestions[0].offsetHeight; // height of first item
//   containercontent.style.maxHeight = `${itemHeight * visibleItems}px`;
//   containercontent.style.overflowY = "auto";
// } else {
//   containercontent.style.maxHeight = "none";
//   containercontent.style.overflowY = "visible";
// }



}



function countansweredquestions() {
    var answered = user.exam.answers.filter(a => a !== -1).length;
    var answeredcontainer = document.getElementById("answeredCount")
    if (answeredcontainer) {
        answeredcontainer.textContent = answered;
    }
}













var totalQuestions = exam.questions.length;
// let currentQuestion = 1;
user.exam.currentQuestion = 0
// let answered = new Array(totalQuestions).fill(false); /////////////

var pagination = document.getElementById("pagination");
var prevBtn = document.getElementById("prevBtn");
var nextBtn = document.getElementById("nextBtn");
// var answeredCount = document.getElementById("answeredCount"); ///
// var totalCount = document.getElementById("totalCount"); ////

// totalCount.textContent = totalQuestions;
function updateNextButton() {
  if (user.exam.currentQuestion === totalQuestions - 1) {
    nextBtn.textContent = "Submit";
    // nextBtn.classList.add("bg-green-600", "text-white");
  } else {
    // nextBtn.classList.remove("bg-green-600", "text-white");
    nextBtn.textContent = "Next >";
  }
}

function renderPagination() {
  realIndex = user.exam.questionOrder[user.exam.currentQuestion];
  pagination.innerHTML = "";
  console.log(user.exam.currentQuestion)
  renderQuestion();
  updateflagcontainer();
  countflaggedquestions();


  // user.exam.flagged[realIndex] = true;
  localStorage.setItem("users", JSON.stringify(users));
  // console.log(user.exam.visited)



  for (let i = 0; i < totalQuestions; i++) {
    let realIndex = user.exam.questionOrder[i];
    var btn = document.createElement("button");
    //     var answered = user.exam.answers[i] !== -1;
    // var isCurrent = i === user.exam.currentQuestion;
    // var answered = user.exam.answers[i] !== -1;
    // var isCurrent = i === user.exam.currentQuestion;
    btn.textContent = i + 1;





    btn.className = `
 relative
  w-10 h-10 rounded-full flex items-center justify-center font-bold
  transition-all duration-200 ease-in-out
  ${i === user.exam.currentQuestion
        ? "bg-violet-600 text-white scale-110 shadow-md hover:scale-105"
        : user.exam.visited[realIndex] && user.exam.answers[realIndex] !== -1
          ? "bg-green-500 text-white hover:bg-green-400"
          : user.exam.visited[realIndex]
            ? "bg-red-500 text-white hover:bg-red-400 "
            : "bg-gray-200 text-gray-600 hover:bg-gray-300  hover:border-1"

      }
`;

    if (user.exam.flagged[realIndex]) {
      var dot = document.createElement("span");
      dot.className = `
    absolute -top-1 -right-1
    w-3 h-3 rounded-full
    bg-orange-400 border-2 border-white
  `;
      btn.appendChild(dot);
    }




    btn.addEventListener("click", () => {
      user.exam.currentQuestion = i;

      renderPagination();


    });

    pagination.appendChild(btn);
  }

  prevBtn.disabled = user.exam.currentQuestion === 0;
  // nextBtn.disabled = user.exam.currentQuestion === totalQuestions -1;
  updateNextButton();


  // if (answeredCount) answeredCount.textContent = user.exam.answers.filter(a => a !== -1).length;
}

prevBtn.addEventListener("click", () => {
  if (user.exam.currentQuestion > 0) {
    user.exam.currentQuestion--;
    renderPagination();
  }
});

nextBtn.addEventListener("click", () => {
  if (user.exam.currentQuestion === totalQuestions - 1) {
    submitExam();
    return;
  }
  if (user.exam.currentQuestion < totalQuestions - 1) {
    user.exam.currentQuestion++;
    renderPagination();

  }
});

// مثال: لما الطالب يجاوب سؤال
// function answerQuestion() {
//   answered[currentQuestion - 1] = true;
//   renderPagination();
// }

renderPagination();


//////////////////////////////

function renderQuestion() {
  realIndex = user.exam.questionOrder[user.exam.currentQuestion];
  user.exam.visited[realIndex] = true;
  var q = exam.questions[ realIndex ]
  var optionsContainer = document.getElementById("options-container");
  var questionNumber = document.getElementById("question-number");
  var progress = document.getElementById("progress");
  console.log(user.exam.answers)
  if (!q) {
    console.error("Invalid question index:", user.exam.currentQuestion);
    return;
  }

  document.querySelector("#question-text").textContent = q.question;
  if (questionNumber) questionNumber.textContent = `Question ${user.exam.currentQuestion + 1}`;
  if (progress) progress.textContent = `Question ${user.exam.currentQuestion + 1} of ${totalQuestions}`;

  optionsContainer.innerHTML = "";

  q.options.forEach((opt, i) => {
    var isSelected = user.exam.answers[realIndex] === i;
    var optionDiv = document.createElement("div");

optionDiv.className = `
  option flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer transition
  ${isSelected
    ? 'border-violet-500 bg-violet-200'
    : 'border-gray-300 bg-white hover:border-violet-500'}
`;

optionDiv.innerHTML = `
  <div class="letter w-9 h-9 shrink-0 mt-1 rounded-full flex items-center justify-center font-bold ${
    isSelected ? 'bg-violet-500 text-white' : 'bg-gray-200 text-gray-400'
  }">
    ${String.fromCharCode(65 + i)}
  </div>

  <span class="text-gray-800 break-words whitespace-normal leading-snug">
    ${opt}
  </span>
`;


    optionDiv.addEventListener("click", function () {
      user.exam.answers[realIndex] = i;
      localStorage.setItem("users", JSON.stringify(users));
      countansweredquestions();
      renderQuestion();
      renderPagination();
    });

    optionsContainer.appendChild(optionDiv);
  });
  syncflag();
}

//   var correct = questions[currentQuestion].correctAnswer;

//   if (selectedIndex === correct) {
//     console.log("✔ Correct");
//   } else {
//     console.log("❌ Wrong");
//   }
// }




function submitExam() {


  var unanswered = user.exam.answers
    .map((a, i) => a === -1 ? i + 1 : null)
    .filter(Boolean);

  var modalBox = document.getElementById("modalBox");
  var title = modalBox.querySelector("h3");
  var msg = modalBox.querySelector("p");
  var submitBtn = modalBox.querySelector("button[onclick='finalSubmit()']");

  if (unanswered.length > 0) {
    title.textContent = "Unanswered Questions";
    msg.innerHTML = `You still have <span id="unansweredCount" class="font-semibold text-red-500">${unanswered.length}</span> unanswered questions.`;
    submitBtn.textContent = "Submit Anyway";
  } else {
    title.textContent = "Submit Exam";
    msg.textContent = "Are you sure you want to submit?";
    submitBtn.textContent = "Yes, Submit";
  }

  openModal();
}

function finalSubmit() {
  clearInterval(timerInterval);

  var modal = document.getElementById("submitModal");
  var box = document.getElementById("modalBox");

  if (modal.classList.contains("hidden")) {
    openModal();
  }

  box.innerHTML = `
    <div class="flex flex-col items-center justify-center py-8">
        <div class="animate-spin rounded-full h-12 w-12 border-4 border-violet-200 border-t-violet-600"></div>
        <p class="mt-4 text-gray-600 font-semibold text-lg">Submitting Exam...</p>
    </div>
  `;

  setTimeout(() => {

    let score = 0;
    exam.questions.forEach((q, i) => {
      if (user.exam.answers[i] === q.correctAnswer) {
        score++;
      }
    });

  
    user.exam.submited = true;
    user.exam.score = score;
    user.exam.endTime = Date.now();

    if (!user.exam.completionMessage) {
      user.exam.completionMessage = "Submitted Successfully";
    }

    localStorage.setItem("users", JSON.stringify(users));

 
    window.location.replace("ExamResult.html");
  }, 2000);
}





function openModal() {
  var modal = document.getElementById("submitModal");
  var box = document.getElementById("modalBox");

  modal.classList.remove("hidden");
  modal.classList.add("flex");

  setTimeout(() => {
    box.classList.remove("scale-95", "opacity-0");
    box.classList.add("scale-100", "opacity-100");
  }, 10);
}

function closeModal() {
  var modal = document.getElementById("submitModal");
  var box = document.getElementById("modalBox");

  box.classList.add("scale-95", "opacity-0");
  box.classList.remove("scale-100", "opacity-100");

  setTimeout(() => {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
  }, 300);
}

window.addEventListener("scroll", function () {
  var header = document.querySelector(".header");
  if (window.scrollY > 20) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});
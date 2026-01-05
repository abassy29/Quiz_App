var users = JSON.parse(localStorage.getItem("users")) || [];
var user = users.find(u => u.exam.logedIn);
if (user) {
    window.location.replace("ExamPage.html");
}



var emailinput = document.getElementById("email");         // Email input field
var passwordinput = document.getElementById("pass");       // Password input field
var form = document.getElementById("myform");             // Form element
var emailError = document.getElementById("emailerror");
var passwordError = document.getElementById("passworderror");
var loginError = document.getElementById("loginError");



// function validateEmailNotEmpty() {
//     var email = emailinput.value.trim();
//     var isvalid = true;
//     if (email === "") {
//         showMailError("email is required");
//         isvalid = false;
//         return isvalid
//     }

//     // Clear any previous error if user typed something
//     // emailError.textContent = "";
//     // emailinput.classList.remove("error");
//     return isvalid;
// }


function validateEmail() {
    
    var email = emailinput.value.trim();
    var isvalid = true;
    var emailpattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

    emailError.textContent = "";
    emailinput.classList.remove("error", "success");


    if (email === "") {
        showMailError("email is required");
        isvalid = false;
        return isvalid
    }
    if (!emailpattern.test(email)) {
        showMailError("Invalid email format");
        isvalid = false;
        return isvalid
    }

    // emailinput.classList.add("success");
    // // Clear format error if email is valid
    // if(emailpattern.test(email)) {
    //     emailError.textContent = "";
    //     emailinput.classList.remove("error");
    // }
    return isvalid;
}


function validatePasswordNotEmpty() {
    var password = passwordinput.value.trim();
    passwordError.textContent = "";
    passwordinput.classList.remove("error", "success");

    var isvalid = true;


    if (password === "") {
        showPasswordError("Password is required");
        isvalid = false;
    }

    return isvalid;
}


// emailinput.addEventListener("input", () => {

// });


emailinput.addEventListener('input', () => {

    emailError.textContent = "";
    loginError.textContent = "";
    emailinput.classList.remove("error");

    // Clear any error while typing
    // if (emailError.textContent === "Invalid email or password") {
    //     emailError.textContent = "";
    //     emailinput.classList.remove("error");
    // }
});

emailinput.addEventListener('blur', () => {
    validateEmail();
})

passwordinput.addEventListener('input', () => {
    // validatePasswordNotEmpty()
    // Clear error while typing
    // if (passwordError.textContent === "Invalid email or password") {
    //     passwordError.textContent = "";
    //     passwordinput.classList.remove("error");
    // }

    passwordError.textContent = "";
    loginError.textContent = "";
    passwordError.classList.remove("error");
});


// Form submission handling
form.addEventListener("submit", function (e) {
    e.preventDefault();

    var emailValid = validateEmail();
    var passwordValid = validatePasswordNotEmpty();

    if (!emailValid || !passwordValid) {
        return;
    }


    var email = emailinput.value.trim();
    var password = passwordinput.value;

    var users = JSON.parse(localStorage.getItem("users")) || []

    var user = users.find(u => u.email === email);

    if (!user || user.password !== password) {
        e.preventDefault();

            loginError.textContent = "Invalid email or password";
            return;
        
    }

    emailinput.classList.remove("error");
    passwordinput.classList.remove("error");
    emailinput.classList.add("success");
    passwordinput.classList.add("success");
    emailError.textContent = "";
    passwordError.textContent = "";
    loginError.textContent = "";

    users.forEach(u => {
        if (u.exam)
            u.exam.logedIn = false;
    });
    if (user.exam) {
        user.exam.logedIn = true;
    }

    localStorage.setItem("users", JSON.stringify(users));
    showToast("Login successful", "success");
    setTimeout(function () {
        window.location.href = "ExamPage.html";
    }, 2000);
});




function showToast(message, type) {
    var toast = document.createElement("div");
    toast.innerHTML = message;
    toast.style.position = "fixed";
    toast.style.top = "20px";
    toast.style.right = "20px";
    if (type === "success") {
        toast.style.backgroundColor = "#2ecc71"; // Green for success
    } else {
        toast.style.backgroundColor = "#e74c3c"; // Red for error
    }
    toast.style.color = "white";
    toast.style.padding = "15px 20px";
    toast.style.borderRadius = "8px";
    toast.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)";
    toast.style.zIndex = "9999";
    toast.style.fontFamily = "'Inter', sans-serif";
    toast.style.fontSize = "14px";

    document.body.appendChild(toast);

    setTimeout(function () {
        toast.style.transition = "opacity 0.5s ease";
        toast.style.opacity = "0";
        setTimeout(function () { document.body.removeChild(toast); }, 500);
    }, 5000);
}



function showPasswordError(message) {
    passwordinput.classList.add("error");
    passwordinput.classList.remove("success");
    passwordError.textContent = message;
}

function showMailError(message) {
    emailError.textContent = message;
    emailinput.classList.remove("success");
    emailinput.classList.add("error");
}

document.querySelectorAll('.toggle-password').forEach(icon => {
    icon.addEventListener('click', function () {
        const input = this.previousElementSibling;
        const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
        input.setAttribute('type', type);
        this.classList.toggle('bx-show');
        this.classList.toggle('bx-hide');
    });
});
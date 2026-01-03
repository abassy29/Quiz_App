function signup(name, email, password) {
    var users = JSON.parse(localStorage.getItem("users")) || [];

    var user = {
        id: Date.now(),
        name,
        email,
        password,
        exam: {
            answers: [],
            visited:[],
            flagged:[],
            currentQuestion: 0,
            score: 0,
            // duration: 10 * 60, 
            spentTime: 0,
            startTime: null,
            endTime: null,
            completionMessage: "",

            submited: false,
            logedIn: false,


        }
    };

    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
}


nameInput = document.getElementById("name")
console.log(nameInput)
emailInput = document.getElementById("email")
console.log(emailInput)
passInput = document.getElementById("pass")
console.log(passInput)
cpassInput = document.getElementById("cpass")
console.log(cpassInput)

var submitbtn = document.getElementById("submit");

var nameSpan = document.getElementById("name-error");
var emailSpan = document.getElementById("email-error");
var passSpan = document.getElementById("pass-error");
var cpassSpan = document.getElementById("cpass-error");
console.log(nameSpan, emailSpan, cpassSpan, passSpan)


var nameRegex = /^[A-Za-z\u0600-\u06FF]+(?: [A-Za-z\u0600-\u06FF]+)*$/;
var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
var passwordRegex = /^\S{8,}$/;

// submitbtn.disabled = true;



var valid_name = false
var valid_email = false
var valid_pass = false
var valid_cpass = false


// nameInput.addEventListener("input", function () {
//     // e.preventDefault();

//     var nameValue = nameInput.value.trim();

//     if (nameInput.value === "") {
//         showError("Name is required");
//         valid_name = false

//     } else if (nameValue.length < 3) {
//         showError("Name must be at least 3 characters");
//         valid_name = false

//     } else if (!nameRegex.test(nameValue)) {
//         showError("Name must contain letters only");
//         valid_name = false

//     } else {

//         valid_name = true
//         nameInput.classList.add("success");
//         nameSpan.textContent = ""
//     }

//     // alert("Form submitted successfully 🎉");
//     // toggleSubmit();

// })

function validateName() {
    var nameValue = nameInput.value.trim();

    if (nameValue === "") {
        showError("Name is required");
        valid_name = false;
    } else if (nameValue.length < 3) {
        showError("Name must be at least 3 characters");
        valid_name = false;
    } else if (!nameRegex.test(nameValue)) {
        showError("Name must contain letters only");
        valid_name = false;
    } else {
        valid_name = true;
        nameInput.classList.remove("error");
        nameInput.classList.add("success");
        nameSpan.textContent = "";
    }
}


function validateEmail() {
    var emailValue = emailInput.value.trim();

    if (emailValue === "") {
        showMailError("Email is required");
        valid_email = false;
    } else if (!emailRegex.test(emailValue)) {
        showMailError("Please enter a valid email address");
        valid_email = false;
    } else {
        valid_email = true;
        emailInput.classList.remove("error");
        emailInput.classList.add("success");
        emailSpan.textContent = "";
    }
}


function validatePassword() {
    var passwordValue = passInput.value.trim();

    if (passwordValue === "") {
        showPasswordError("Password is required");
        valid_pass = false;
    } else if (!passwordRegex.test(passwordValue)) {
        showPasswordError("Password must be at least 8 characters with no spaces");
        valid_pass = false;
    } else {
        valid_pass = true;
        passInput.classList.remove("error");
        passInput.classList.add("success");
        passSpan.textContent = "";
    }
}


function validateConfirmPassword() {
    var passwordValue = passInput.value.trim();
    var confirmValue = cpassInput.value.trim();

    if (confirmValue === "") {
        showConfirmPasswordError("Please confirm your password");
        valid_cpass = false;
    } else if (confirmValue !== passwordValue) {
        showConfirmPasswordError("Passwords do not match");
        valid_cpass = false;
    } else {
        valid_cpass = true;
        cpassInput.classList.remove("error");
        cpassInput.classList.add("success");
        cpassSpan.textContent = "";
    }
}


nameInput.addEventListener("input", validateName);
emailInput.addEventListener("input", validateEmail);
passInput.addEventListener("input", () => {
    validatePassword();
    validateConfirmPassword();
});
cpassInput.addEventListener("input", validateConfirmPassword);



var form = document.getElementById("myform");

form.addEventListener("submit", function (e) {

    validateName();
    validateEmail();
    validatePassword();
    validateConfirmPassword();

    if (!(valid_cpass && valid_email && valid_name && valid_pass)) {

        e.preventDefault();
    }

    else {
        var existingUsers = JSON.parse(localStorage.getItem("users")) || [];
        if (existingUsers.some(u => u.email === emailInput.value)) {
            e.preventDefault();
            showToast("Email already exists! Please <a href='login.html' style='color: #fff; text-decoration: underline; font-weight: bold;'>login</a>.");
            return;
        }

        signup(nameInput.value, emailInput.value, passInput.value)
        //change logedIn to true
        var users = JSON.parse(localStorage.getItem("users")) || [];

        // Reset logedIn for all users to ensure only the new one is logged in
        users.forEach(u => { if (u.exam) u.exam.logedIn = false; });

        // Log in the newly created user (last one in the list)
        var newUser = users[users.length - 1];
        if (newUser) newUser.exam.logedIn = true;

        localStorage.setItem("users", JSON.stringify(users));
        //color light green
        showToast("Account created successfully 🎉", "success");
        setTimeout(function () {
            form.submit();
        }, 5000);
    }
});




// emailInput.addEventListener("input", function () {


//     const emailValue = emailInput.value.trim();

//     if (emailValue === "") {
//         showMailError("email is required");
//         valid_email = false
//     } else if (!emailRegex.test(emailValue)) {
//         showMailError("Please enter a valid email address");
//         valid_email = false

//     } else {

//         valid_email = true
//         emailInput.classList.add("success");
//         emailSpan.textContent = ""
//     }

//     // alert("Form submitted successfully 🎉");

//     // toggleSubmit();

// })


// passInput.addEventListener("input", function () {
//     var passwordValue = passInput.value.trim();

//     if (passwordValue === "") {
//         showPasswordError("Password is required");
//         valid_pass = false
//     } else if (!passwordRegex.test(passwordValue)) {
//         valid_pass = false
//         showPasswordError("Password must be at least 8 characters with no spaces");
//     } else {
//         valid_pass = true
//         passInput.classList.remove("error");
//         passInput.classList.add("success");
//         passSpan.textContent = "";
//     }

//     if (cpass_conf) {

//         validateConfirmPassword();
//     }
//     // toggleSubmit();
// });


// var cpass_conf = false

// cpassInput.addEventListener("input", function () {
//     validateConfirmPassword();
// });

// function validateConfirmPassword() {
//     cpass_conf = true
//     var passwordValue = passInput.value.trim();
//     var confirmValue = cpassInput.value.trim();

//     if (confirmValue === "") {
//         showConfirmPasswordError("Please confirm your password");
//         valid_cpass = false
//     } else if (confirmValue !== passwordValue) {
//         showConfirmPasswordError("Passwords do not match");
//         valid_cpass = false
//     } else {
//         valid_cpass = true
//         cpassInput.classList.remove("error");
//         cpassInput.classList.add("success");
//         cpassSpan.textContent = "";
//     }
//     // toggleSubmit();
// }





function showMailError(message) {
    emailSpan.textContent = message;
    emailInput.classList.remove("success");
    emailInput.classList.add("error");
}
function showError(message) {
    nameSpan.textContent = message;
    nameInput.classList.remove("success");
    nameInput.classList.add("error");
}

function showPasswordError(message) {
    passInput.classList.add("error");
    passInput.classList.remove("success");
    passSpan.textContent = message;
}

function showConfirmPasswordError(message) {
    cpassInput.classList.add("error");
    cpassInput.classList.remove("success");
    cpassSpan.textContent = message;
}
// function toggleSubmit() {
//     submitbtn.disabled = !(valid_name && valid_email && valid_pass && valid_cpass);
// }




// form.addEventListener("submit", function (e) {
//     validateConfirmPassword()
//     if (!valid_cpass && valid_email && valid_name && valid_pass) {

//         e.preventDefault();
//     }
//     else {

//         alert("Account created successfully 🎉");
//         form.submit()

//     }
// })








// window.addEventListener("pageshow", function () {
//     resetFormState();
// });



// function resetFormState() {
//     valid_name = false;
//     valid_email = false;
//     valid_pass = false;
//     valid_cpass = false;

//     form.reset();

//     toggleSubmit();

//     document.querySelectorAll(".error").forEach(el => el.classList.remove("error"));
//     document.querySelectorAll(".success").forEach(el => el.classList.remove("success"));

//     nameSpan.textContent = "";
//     emailSpan.textContent = "";
//     passSpan.textContent = "";
//     cpassSpan.textContent = "";
// }

// Ensure no user is logged in when visiting the signup page (e.g. via Back button)
window.addEventListener("pageshow", function () {
    var users = JSON.parse(localStorage.getItem("users")) || [];
    users.forEach(u => { if (u.exam) u.exam.logedIn = false; });
    localStorage.setItem("users", JSON.stringify(users));
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
    }, 3000);
}

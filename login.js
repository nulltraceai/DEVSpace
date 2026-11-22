
// SELECT ELEMENTS

const signupTab = document.getElementById("signupTab");
const loginTab = document.getElementById("loginTab");

const nameRow = document.getElementById("nameRow");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

const loginForm = document.getElementById("loginForm");
const submitBtn = document.getElementById("submitBtn");
const message = document.getElementById("message");

let currentMode = "signup";


// LOAD REGISTERED USERS

function getUsers() {
    return JSON.parse(localStorage.getItem("devspaceUsers")) || {};
}


// SWITCH BETWEEN SIGNUP AND LOGIN

function changeMode(mode) {

    currentMode = mode;

    loginForm.reset();
    message.textContent = "";

    if (mode === "signup") {

        nameRow.style.display = "table-row";
        nameInput.required = true;

        submitBtn.textContent = "Create Account";

        signupTab.classList.add("active");
        loginTab.classList.remove("active");

    } else {

        nameRow.style.display = "none";
        nameInput.required = false;

        submitBtn.textContent = "Login";

        loginTab.classList.add("active");
        signupTab.classList.remove("active");

    }
}

signupTab.addEventListener("click", () => {
    changeMode("signup");
});

loginTab.addEventListener("click", () => {
    changeMode("login");
});


// FORM SUBMISSION

loginForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const name = nameInput.value.trim();
    const email = emailInput.value.trim().toLowerCase();
    const password = passwordInput.value;

    if (currentMode === "signup" && !name) {
        message.textContent = "Please enter your name.";
        return;
    }

    if (password.length < 8) {
        message.textContent = "Password must be at least 8 characters.";
        return;
    }

    const users = getUsers();


    // SIGN UP

    if (currentMode === "signup") {

        if (users[email]) {
            message.textContent = "Account already exists. Please login.";
            return;
        }

        users[email] = {
            name: name,
            email: email
        };

        localStorage.setItem("devspaceUsers", JSON.stringify(users));

        message.textContent = "Account created successfully!";

    }


    // LOGIN

    else {

        if (!users[email]) {
            message.textContent = "Account not found. Please sign up first.";
            return;
        }

        // Demo only: password is not verified.
        // Real authentication needs a secure backend.

        message.textContent = "Welcome back!";

    }


    // SET CURRENT USER

    sessionStorage.setItem("devspaceActiveUser", email);

    // OPEN DASHBOARD

    setTimeout(function() {
        window.location.replace("dashboard.html");
    }, 700);

});

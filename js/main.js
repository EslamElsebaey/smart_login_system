// selecting letiables

let nameInput = document.getElementById("nameInput");
let emailInput = document.getElementById("emailInput");
let passwordInput = document.getElementById("passwordInput");
let signUpBtn = document.getElementById("signUpBtn");
let logInBtn = document.getElementById("logInBtn");
let exist = document.querySelector(".exist");
let signInEmail = document.getElementById("signInEmail");
let signInPassword = document.getElementById("signInPassword");

// local storage

let usersArray;

if (localStorage.getItem("users") == null) {
  usersArray = [];
} else {
  usersArray = JSON.parse(localStorage.getItem("users"));
}

//  are inputs empty ?

function isEmpty() {
  if (
    nameInput.value == "" ||
    emailInput.value == "" ||
    passwordInput.value == ""
  ) {
    return false;
  }
}

//  is email existed ?

function isEmailExisted() {
  for (let i = 0; i < usersArray.length; i++) {
    if (usersArray[i].email == emailInput.value) {
      return false;
    }
  }
}

//  sign up function

function signUp() {
  if (isEmpty() == false) {
    exist.innerHTML = `<h3 class="text-danger mb-3 mt-3">All inputs are required</h3>`;
  } else if (emailValidation() == true) {
    let userObj = {
      name: nameInput.value,
      email: emailInput.value,
      password: passwordInput.value,
    };
    if (isEmailExisted() == false) {
      exist.innerHTML = `<h3 class="text-danger mb-3 mt-3">This Email is Existed</h3>`;
    } else {
      usersArray.push(userObj);
      localStorage.setItem("users", JSON.stringify(usersArray));
      exist.innerHTML = `<h3 class="text-success mb-3 mt-3">Registeration Success</h3>`;
      clearInputs();
      emailInput.classList.remove("is-valid");
    }
  } else {
    exist.innerHTML = `<h3 class="text-danger mb-3 mt-3"> Invalid Email or Name</h3>`;
    nameInput.classList.remove("is-valid");
    clearInputs();
  }
}

//  clear inputs

function clearInputs() {
  nameInput.value = "";
  emailInput.value = "";
  passwordInput.value = "";
}

// ----------------------------------------------------------------------------------

//  is login inputs empy

function isLoginEmpty() {
  if (signInEmail.value == "" || signInPassword.value == "") {
    return false;
  } else {
    return true;
  }
}

// login function

function logIn() {
  if (isLoginEmpty() == false) {
    exist.innerHTML = `<h3 class="text-danger mb-3 mt-3"> All Inputs Are Required</h3>`;
  } else {
    for (let i = 0; i < usersArray.length; i++) {
      if (
        usersArray[i].email == signInEmail.value &&
        usersArray[i].password == signInPassword.value
      ) {
        localStorage.setItem("sessionuser", usersArray[i].name);
        logInBtn.setAttribute("href", "profile.html");
      } else if (
        usersArray[i].email != signInEmail.value ||
        usersArray[i].password != signInPassword.value
      ) {
        exist.innerHTML = `<h3 class="text-danger mb-3 mt-3"> Incorrect Email or Password</h3>`;
      }
    }
  }
}

//  logout function

function logOut() {
  localStorage.removeItem("sessionuser");
}

// email validation

function emailValidation() {
  let emailRegex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;
  if (emailRegex.test(emailInput.value)) {
    emailInput.classList.add("is-valid");
    emailInput.classList.remove("is-invalid");
    return true;
  } else {
    emailInput.classList.add("is-invalid");
    emailInput.classList.remove("is-valid");
  }
  if (emailInput.value == "") {
    emailInput.classList.remove("is-invalid");
    exist.innerHTML = "";
    return false;
  }
}

// say welcome to user

function sayWelcome() {
  if (location.pathname == "/profile.html") {
    let welcome = document.querySelector(".welcome");
    welcome.innerHTML = `<h1>welcome ${localStorage.getItem(
      "sessionuser"
    )}</h1>`;
  }
}
sayWelcome();

let userName = document.getElementById("rUsername");
let pw = document.getElementById("rPassword");
let rPw = document.getElementById("rRepeatPassword");
let rSubmit = document.getElementById("rSubmit");
let loggedIn = 0;

let list = [];
let newUser = {};

rSubmit.addEventListener("click", (e) => {
  createItem(userName, pw, rPw);
  save();
  location.reload();
});

const createItem = (userName, pw, rPw) => {
  if (userName.value.length == 0) {
    alert("Please complete the user field");
  } else if (pw.value.length == 0) {
    alert("Please complete the password field");
  } else if (userName.value.length == 0 && pw.value.length == 0) {
    alert("Please complete the username and password fields");
  } else if (pw.value.length > 8) {
    alert("Maximum number of digits = 8");
  } else if (pw.value == rPw.value) {
    newUser = {
      usuario: userName.value,
      password: pw.value,
    };
    list.push(newUser);
    alert("User created successfully");
    return newUser;
  } else {
    alert("Passwords do not match");
  }
};

const save = () => {
  localStorage.setItem("users", JSON.stringify(list));
  reFlow();
};

const reFlow = () => {
  list = JSON.parse(localStorage.getItem("users"));
  if (list === null) {
    list = [];
  } else {
    list.forEach((element) => {
      if (element.status) {
      } else {
      }
    });
  }
};

document.addEventListener("DOMContentLoaded", reFlow);

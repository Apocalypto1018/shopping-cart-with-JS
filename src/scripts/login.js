let submit = document.getElementById("submit");
let loggedIn = 0;

submit.addEventListener("click", (e) => {
  logIn();
  location.reload();
});

const logIn = () => {
  let storeList = localStorage.getItem("users");
  list = JSON.parse(storeList);
  if (list === null) {
    list = [];
  }

  let userName = document.getElementById("username");
  let userPw = document.getElementById("password");

  for (let i = 0; i < list.length; i++) {
    if (userName.value == list[i].usuario && userPw.value == list[i].password) {
      loggedIn = 1;
      alert("Welcome, now you are logged in");
      return;
    } else {
      loggedIn = 0;
    }
  }
  if (loggedIn == 0) {
    alert("Username or password not found");
  }
};

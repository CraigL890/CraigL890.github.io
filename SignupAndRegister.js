
const signupForm = document.getElementById("signup-form");
if (signupForm) {
signupForm.addEventListener("submit", function(event) {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;
    if (password !== confirmPassword) {
        alert("The given password does not match");
        return;
    }
    const users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.some(user => user.username === username)){
        alert("this username is taken");
        return;
    }


    users.push ({
    username: username,
    password: password
    });

    localStorage.setItem("users", JSON.stringify(users));
    alert("You have successfully signed up")
    window.location.href  = "login.html"
});
}

const loginForm = document.getElementById("login-form");
if (loginForm) {
loginForm.addEventListener("submit",function(event) {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(user => user.username === username);


    if(!user){
        alert("user has not been found");
        return;
    }
    if (user.password !== password) {
        alert("The given password does not match");
        return;
    }
    alert("login successfull")
    sessionStorage.setItem("currentUser" , JSON.stringify(user));
    window.location.href = "index.html";
    


});
}
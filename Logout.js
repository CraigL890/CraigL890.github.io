 const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
 if (currentUser) {
        document.getElementById("profile-username").textContent = `Welcome, ${currentUser.username}`;
    } else {
        window.location.href = "login.html";
    }
    document.getElementById("logout-btn").addEventListener("click", () => {
        sessionStorage.removeItem("currentUser");
        window.location.href = "login.html";
    });
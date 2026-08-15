function showLogin() {
    document.getElementById("loginModal").style.display = "flex";
}

function closeLogin() {
    document.getElementById("loginModal").style.display = "none";
}

function startCareer() {
    showLogin();
}

function loginUser() {

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const message = document.getElementById("loginMessage");

    if (email === "" || password === "") {
        message.style.color = "red";
        message.innerText = "Please enter email and password.";
        return;
    }

    localStorage.setItem("careerOneUser", email);

    message.style.color = "green";
    message.innerText = "Login successful!";

    setTimeout(() => {
        window.location.href = "profile.html";
    }, 800);
}

window.onclick = function(event) {

    const modal = document.getElementById("loginModal");

    if (event.target === modal) {
        closeLogin();
    }
};
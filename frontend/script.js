// ================= LOGIN MODAL =================

function showLogin() {
    document.getElementById("loginModal").style.display = "flex";
}

function closeLogin() {
    document.getElementById("loginModal").style.display = "none";
}


// ================= START CAREER =================

function startCareer() {
    showLogin();
}


// ================= LOGIN =================

function loginUser() {

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const message = document.getElementById("loginMessage");

    // Check empty fields
    if (!email || !password) {

        message.style.color = "red";
        message.innerText = "Email and password are required.";

        return;
    }

    // Basic email validation
    if (!email.includes("@")) {

        message.style.color = "red";
        message.innerText = "Please enter a valid email.";

        return;
    }

    // Any email + any password accepted
    message.style.color = "#635bff";
    message.innerText = "Logging in...";

    // Save logged-in user
    localStorage.setItem("careerOneUser", email);

    setTimeout(() => {

        message.style.color = "green";
        message.innerText = "✅ Login successful!";

        setTimeout(() => {

            // Go to profile page
            window.location.href = "profile.html";

        }, 500);

    }, 500);
}


// ================= LOGOUT =================

function logout() {

    localStorage.removeItem("careerOneUser");
    localStorage.removeItem("careerAnalysis");

    window.location.href = "index.html";
}


// ================= CLOSE MODAL ON OUTSIDE CLICK =================

window.addEventListener("click", function(event) {

    const modal = document.getElementById("loginModal");

    if (event.target === modal) {
        closeLogin();
    }

});
// ================= LOGIN MODAL =================

function showLogin() {

    document.getElementById("loginModal").style.display = "flex";

}


function closeLogin() {

    document.getElementById("loginModal").style.display = "none";

}


function startCareer() {

    showLogin();

}


// ================= LOGIN =================

async function loginUser() {

    const email =
        document.getElementById("email").value.trim();

    const password =
        document.getElementById("password").value.trim();

    const message =
        document.getElementById("loginMessage");


    // Check empty fields

    if (!email || !password) {

        message.style.color = "red";

        message.innerText =
            "Please enter email and password.";

        return;

    }


    message.style.color = "#635bff";

    message.innerText =
        "Connecting to CareerOne...";


    try {

        const response = await fetch(
            "http://localhost:5000/api/login",
            {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({

                    email: email,

                    password: password

                })

            }
        );


        const data =
            await response.json();


        console.log(
            "Backend Response:",
            data
        );


        // LOGIN SUCCESS

        if (data.success === true) {

            localStorage.setItem(
                "careerOneUser",
                email
            );


            message.style.color = "green";

            message.innerText =
                "✅ Login successful!";


            setTimeout(function () {

                window.location.href =
                    "profile.html";

            }, 1000);


        }


        // LOGIN FAILED

        else {

            message.style.color = "red";

            message.innerText =
                data.message ||
                "Invalid email or password.";

        }


    }


    catch (error) {

        console.error(
            "Login Error:",
            error
        );


        message.style.color = "red";

        message.innerText =
            "❌ Backend connection failed.";

    }

}


// ================= CLOSE MODAL =================

window.onclick = function(event) {

    const modal =
        document.getElementById("loginModal");


    if (event.target === modal) {

        closeLogin();

    }

};
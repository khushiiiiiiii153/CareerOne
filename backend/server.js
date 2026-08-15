const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());


// ================= HOME / TEST =================

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "CareerOne Backend is Working 🚀"
    });
});


// ================= LOGIN API =================

app.post("/api/login", (req, res) => {

    console.log("LOGIN API CALLED");
    console.log(req.body);

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "Email and password are required"
        });
    }

    // Demo login credentials
    if (email === "admin@gmail.com" && password === "123456") {

        console.log("LOGIN SUCCESS");

        return res.status(200).json({
            success: true,
            message: "Login successful!",
            user: {
                email: email
            }
        });
    }

    console.log("LOGIN FAILED");

    return res.status(401).json({
        success: false,
        message: "Invalid email or password"
    });
});


// ================= CAREER ANALYSIS API =================

app.post("/api/analyze", (req, res) => {

    console.log("ANALYZE API CALLED");
    console.log(req.body);

    const {
        name,
        branch,
        year,
        skills,
        careerGoal
    } = req.body;


    if (
        !name ||
        !branch ||
        !year ||
        !skills ||
        !careerGoal
    ) {

        return res.status(400).json({
            success: false,
            message: "Please fill all fields."
        });

    }


    let recommendations = [];


    if (careerGoal === "Software Developer") {

        recommendations = [
            "JavaScript",
            "React",
            "Node.js",
            "Data Structures & Algorithms"
        ];

    }


    else if (careerGoal === "Data Scientist") {

        recommendations = [
            "Python",
            "Pandas",
            "NumPy",
            "Machine Learning"
        ];

    }


    else if (careerGoal === "AI/ML Engineer") {

        recommendations = [
            "Python",
            "Machine Learning",
            "Deep Learning",
            "TensorFlow"
        ];

    }


    else if (careerGoal === "Web Developer") {

        recommendations = [
            "HTML",
            "CSS",
            "JavaScript",
            "React"
        ];

    }


    return res.status(200).json({

        success: true,

        message: "Career analysis completed!",

        profile: {
            name: name,
            branch: branch,
            year: year,
            skills: skills,
            careerGoal: careerGoal
        },

        recommendations: recommendations

    });

});


// ================= SERVER =================

const PORT = 5000;

app.listen(PORT, () => {

    console.log(
        `CareerOne Backend running on http://localhost:${PORT}`
    );

});
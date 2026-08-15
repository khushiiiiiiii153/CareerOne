const express = require("express");
const cors = require("cors");
const multer = require("multer");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());


// ===============================
// FILE UPLOAD SETUP
// ===============================

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024
    },
    fileFilter: (req, file, cb) => {

        if (file.mimetype === "application/pdf") {
            cb(null, true);
        } else {
            cb(new Error("Only PDF files are allowed."));
        }

    }
});


// ===============================
// HOME API
// ===============================

app.get("/", (req, res) => {

    res.json({
        message: "CareerOne Backend is Working 🚀"
    });

});


// ===============================
// CAREER ANALYSIS API
// ===============================

app.post("/api/analyze", (req, res) => {

    console.log(
        "API request received:",
        req.body
    );

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

            message:
                "Please provide all student details."

        });

    }


    const skillList =
        skills
            .split(",")
            .map(skill => skill.trim())
            .filter(
                skill => skill.length > 0
            );


    const skillGaps = [
        "React.js",
        "Node.js",
        "REST API",
        "Git & GitHub"
    ];


    const recommendations = [

        {
            type: "Internship",

            title:
                "Web Development Internship",

            reason:
                "Improve JavaScript and web development skills."
        },

        {
            type: "Course",

            title:
                "Full Stack Web Development",

            reason:
                "Recommended for your software development career goal."
        },

        {
            type: "Hackathon",

            title:
                "AI & Web Innovation Hackathon",

            reason:
                "Build practical projects and strengthen your portfolio."
        }

    ];


    res.json({

        success: true,

        student: {

            name: name,

            branch: branch,

            year: year,

            skills: skillList,

            careerGoal: careerGoal

        },

        analysis: {

            careerMatch: 85,

            readiness: 72,

            skillGaps: skillGaps,

            recommendations:
                recommendations

        }

    });

});

// ===============================
// AI CAREER ASSISTANT API
// ===============================

app.post("/api/assistant", (req, res) => {

    const { message, profile } = req.body;

    if (!message) {
        return res.status(400).json({
            success: false,
            message: "Please enter a question."
        });
    }

    const question = message.toLowerCase();

    let reply =
        "I can help you with careers, skills, internships, resumes and learning paths. 🚀";


    if (question.includes("internship")) {

        reply =
            "For internships, focus on 2–3 strong projects, GitHub, resume quality and interview preparation. Choose projects related to your target career.";

    }

    else if (
        question.includes("resume") ||
        question.includes("cv")
    ) {

        reply =
            "Keep your resume ATS-friendly. Highlight your technical skills, projects, internships and measurable achievements. Avoid unnecessary graphics and complex formatting.";

    }

    else if (
        question.includes("react") ||
        question.includes("web")
    ) {

        reply =
            "For Web Development, learn HTML, CSS and JavaScript first, then React, REST APIs, Git/GitHub and basic backend development.";

    }

    else if (
        question.includes("python")
    ) {

        reply =
            "For Python, start with fundamentals and OOP, then learn data structures, APIs and practical projects. You can later move toward AI/ML, data science or backend development.";

    }

    else if (
        question.includes("career") ||
        question.includes("job")
    ) {

        if (profile && profile.careerGoal) {

            reply =
                `Your current career goal is ${profile.careerGoal}. Focus on building the skills required for this role, creating relevant projects and gaining internship experience.`;

        } else {

            reply =
                "CareerOne can help you choose a career based on your skills, interests and goals. Complete your profile first for a more personalized recommendation.";

        }

    }

    else if (
        question.includes("skill") ||
        question.includes("learn")
    ) {

        reply =
            "Start with the skills required for your target role. Learn one skill at a time, practice through projects and maintain your work on GitHub.";

    }


    res.json({

        success: true,

        reply: reply

    });

});

// ===============================
// RESUME / ATS ANALYSIS API
// ===============================

app.post(
    "/api/resume",
    upload.single("resume"),
    async (req, res) => {

        try {

            if (!req.file) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Please upload a PDF resume."

                });

            }


            console.log(
                "Resume received:",
                req.file.originalname
            );


            // --------------------------------
            // Basic ATS Analysis
            // --------------------------------

            const fileName =
                req.file.originalname;


            const fileSize =
                req.file.size;


            // Demo ATS score based on
            // uploaded resume properties

            let score = 70;


            if (fileName.length > 5) {
                score += 3;
            }


            if (fileSize > 10000) {
                score += 5;
            }


            score = Math.min(
                score,
                95
            );


            const strengths = [

                "Resume uploaded successfully",

                "PDF format is ATS compatible",

                "Resume is ready for further analysis",

                "Candidate profile can be matched with career goals"

            ];


            const improvements = [

                "Add job-specific keywords",

                "Use measurable achievements",

                "Improve project descriptions",

                "Keep formatting simple and consistent",

                "Add relevant technical skills"

            ];


            res.json({

                success: true,

                message:
                    "Resume analyzed successfully.",

                resume: {

                    fileName: fileName,

                    fileSize: fileSize

                },

                ats: {

                    score: score,

                    strengths: strengths,

                    improvements: improvements

                }

            });


        } catch (error) {

            console.error(
                "Resume Error:",
                error
            );


            res.status(500).json({

                success: false,

                message:
                    "Resume analysis failed."

            });

        }

    }
);


// ===============================
// ERROR HANDLER
// ===============================

app.use(
    (error, req, res, next) => {

        console.error(error);


        if (
            error.message ===
            "Only PDF files are allowed."
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "Only PDF files are allowed."

            });

        }


        if (
            error.code ===
            "LIMIT_FILE_SIZE"
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "File size must be less than 5 MB."

            });

        }


        res.status(500).json({

            success: false,

            message:
                "Something went wrong."

        });

    }
);


// ===============================
// START SERVER
// ===============================

app.listen(
    PORT,
    () => {

        console.log(
            `CareerOne Backend running at http://localhost:${PORT}`
        );

    }
);
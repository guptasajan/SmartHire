const express = require("express");
require("dotenv").config();

const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt")

const connectDB = require("./config/db.js");

connectDB();

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server Started on Port ${PORT}`);
});


const User = require("./models/User.js");
const { use } = require("react");


app.post("/signup", async (req, res) => {

    try {


        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        // const existingUser = await User.findOne({
        //     email: email
        // });
        const existingUser = await User.findOne({ email });


        if (existingUser) {
            return res.status(409)
                .json({
                    message: "User already exist"
                });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        // password = hashedPassword
        const user = new User({
            name, email, password: hashedPassword
        });

        await user.save();

        return res.status(201).json({
            message: "User Registered Successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    }
    catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
});

app.post("/login", async (req, res) => {
    try {




        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Please enter email and password"
            });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid email or password"
            })
        }

        const token = jwt.sign({
            id: user._id,
            email: user.email,
            role: user.role
        },
            process.env.JWT_SECRET, {
            expiresIn: "7d"
        }
        );

        return res.status(200).json({
            message: "Login Successful",
            token: token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
});




const auth = require("./middleware/auth");

app.get("/profile", auth, (req, res) => {

    const { id, email } = req.user;

    return res.status(200).json({
        message: "Welcome to your profile",
        user: { id, email }
    })
});






const authRoutes = require("./routes/authRoutes.js");

app.use("/api/auth", auth);




















// require("dotenv").config();

// const express = require("express");
// const { version } = require("react");

// const app = express()

// app.use(express.json());

// app.post("/signup", (req, res) => {
//     // console.log(req.body);

//     const { name, email, password } = req.body;

//     if (!name || !email || !password) {
//         return res
//             .status(400)
//             .json({
//                 message: "All fields are required"
//             });

//     }
//     else {
//         return res.status(201)
//             .json({
//                 message: "User Registered Successfully",
//                 user: {
//                     "name": name,
//                     "email": email,
//                 }

//             });
//     }

//     // res.json({
//     //     message: "User Register Successfully"
//     // });
// });


// // app.use((req, res, next) => {
// //     console.log("Request coming");
// //     next();
// // });

// app.use((req, res, next) => {
//     console.log("Method", req.method);
//     console.log("URL", req.url);
//     next();
// });



// app.get("/", (req, res) => {
//     res.send("Welcome to SmartHire Backend");
// });

// app.get("/about", (req, res) => {
//     // res.send("About SmartHire");
//     res.json({
//         company: "SmartHire",
//         version: "1.0",
//         developer: "Sajan"
//     })
// });
// app.get("/search", (req, res) => {

//     res.json(req.query);

// });
// app.get("/company/:id", (req, res) => {
//     res.send(req.params.id);
// })

// app.get("/contact", (req, res) => {
//     res.send("Contect Page")
// })

// app.listen(3000, () => {
//     console.log("Server Started on Port 3000");
// });
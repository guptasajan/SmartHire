const User = require("../models/User.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


//SIGNUP Controller
const signup = async (req, res) => {


    try {


        const { name, email, password } = req.body;
        //Validation
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        //find User
        const existingUser = await User.findOne({ email });


        if (existingUser) {
            return res.status(409)
                .json({
                    message: "User already exist"
                });
        }
        //hashed Password
        const hashedPassword = await bcrypt.hash(password, 10);
        // password = hashedPassword
        const user = new User({
            name, email, password: hashedPassword
        });

        //save

        await user.save();
        //response
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


};

const login = async (req, res) => {
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
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }

};

module.exports = {
    signup,
    login,
}
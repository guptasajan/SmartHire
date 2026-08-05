const User = require("../models/User.js");


const getProfile = async (req, res) => {
    try {


        const id = req.user.id;
        const user = await User.findById(id).select("-password");

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            })
        }
        return res.status(200).json({
            user
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

const updateProfile = async (req, res) => {

};

module.exports = { getProfile, updateProfile };
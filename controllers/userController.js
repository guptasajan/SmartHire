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
    try {
        const id = req.user.id;
        const { name, email } = req.body;

        const updates = {};
        if (name) {
            updates.name = name;
        }
        if (email) {
            updates.email = email;
        }

        const user = await User.findByIdAndUpdate(
            id, updates,
            { new: true }

        ).select("-password");

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }
        return res.status(200).json({
            message: "Profile updated successfully",
            user
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};


const changePassword = async (req, res) => {

    try {
        const { oldPassword, newPassword } = req.body;

        if (!oldPassword || !newPassword) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        if (oldPassword === newPassword) {
            return res.status(400).json({
                message: "New password must be different from old password"
            });
        }

        const id = req.user.id;
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }
        const isMatch = await bcrypt.compare(
            oldPassword, user.password
        );

        if (!isMatch) {
            return res.status(401).json({
                message: "Old password is incorrect",
            });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        return res.status(200).json({
            message: "Password changed Successfully"
        });


    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }

};

const deleteAccount = async (req, res) => {
    try {


        const id = req.user.id;
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({
                message: "User does not exit",
            })
        }

        // await User.findByIdAndDelete(id);
        await user.deleteOne();
        return res.status(200).json({
            message: "Account deleted successfully"
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

const uploadResume = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                message: "Resume is required"
            });
        }

        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        user.resume = req.file.path;

        await user.save();

        return res.status(200).json({
            message: "Resume uploaded successfully",
            resume: user.resume
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    getProfile, updateProfile,
    changePassword,
    deleteAccount,
    uploadResume
};


const admin = (req, res, next) => {

    const role = req.user.role;

    if (role !== "admin") {
        return res.status(403).json({
            message: "Access denied, Admin only."
        })
    }
    next();

};

module.exports = admin;
const multer = require("multer");
//const { uploadResume } = require("../controllers/userController");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },

    filename: (req, file, cb) => {
        cb(
            null,
            Date.now() + "-" + file.originalname
        );
    }
});

const fileFilter = (req, file, cb) => {

    const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ];

    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    }
    else {
        cb(new Error("Only PDF, DOC and DOCX files are allowed"),
            false);
    }
};


const multerUpload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024
    }
});


const uploadUserResume = (req, res, next) => {

    multerUpload.single("resume")(req, res, (error) => {

        if (error instanceof multer.MulterError) {

            if (error.code === 'LIMIT_FILE_SIZE') {
                return res.status(400).json({
                    message: "File size cannot be exceed 5 MB"
                });
            }

            return res.status(400).json({
                message: error.message
            });
        }
        if (error) {
            return res.status(400).json({
                message: error.message
            });
        }
        next();
    });
};

module.exports = uploadUserResume;
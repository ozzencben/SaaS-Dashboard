const multer = require("multer");

const storage = multer.memoryStorage();
const upload = require({ storage });

module.exports = { upload };

const express = require("express");
const {getBlogs, getCreatePost, postCreatePost} = require("../controllers/blog");

const app = express.Router();

// // Initialize multer
// const storage = multer.diskStorage({
//     destination: "../client/public/uploads/",
//     limits: { fileSize: 1000000 },
//     filename: function(req, file, cb) {
//       cb(null, file.fieldname + "-" + Date.now());
//     }
//   });
// const upload = multer({storage: storage});

app.route("/blogs").get(getBlogs);
app.route("/create").get(getCreatePost).post(postCreatePost);

module.exports = app;
const express = require("express");
const multer = require("multer");
const path = require("path");
const app = express();
app.use("/uploads/", express.static(path.join(__dirname, "./uploads")));
// DiskStorage : The disk storage engine gives you full control on storing files to disk.
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// ============for single image upload=================
// app.post("/", upload.single("avatar"), function (req, res, next) {
//   console.log("done");
// });


// ============for multiple image upload=================
// app.post("/", upload.array("avatar", 12), function (req, res, next) {
//   //12 means maximum 12 images
//   console.log("done");
// });



// =================Another way for multiple image upload=================
const cpUpload = upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'avatar', maxCount: 8 }])
app.post('/', cpUpload, function (req, res, next) {
  console.log("done");
})

app.listen(8000);

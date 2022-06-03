const express = require("express");
const multer = require("multer");
var cors = require("cors");

const app = express();
const { spawn } = require("child_process");

app.use(cors()); // Use this after the variable declaration

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "data/");
  },
  filename: (req, file, cb) => {
    cb(null, "word.png");
  },
});

const uploadStorage = multer({ storage: storage });

// Single file
app.post("/upload/single", uploadStorage.single("file"), (req, res) => {
  console.log(req.file);
  trigger_ml();
  return res.send("Single file");
});

//Base route
app.get("/", (req, res) => {
  res.send("something is on...");
});

app.listen(5000 || process.env.PORT, () => {
  console.log("Server on...");
});

function trigger_ml() {
  console.log("vsg");
  const childPython = spawn("python", ["./src/main.py"]);

  childPython.stdout.on("data", (data) => {
    console.log(data.toString());
  });

  // in close event we are sure that stream from child process is closed
  childPython.on("close", (code) => {
    console.log(`child process close all stdio with code ${code}`);
    // send data to browser
  });
}

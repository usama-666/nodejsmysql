const express = require("express");
require("dotenv").config();
const db = require("./src/db/db");
const postRoutes = require("./src/routes/post.route");

const app = express();
const PORT = process.env.PORT || 3000;

//middleware
// Middleware for parsing JSON
app.use(express.json({ limit: "30kb" }));

// Middleware for parsing URL encoded data
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1/posts", postRoutes);

db.query("SELECT 1")
  .then(() => {
    app.listen(PORT, () => {
      console.log("Connected to MYSQL");
      console.log(`Server is Running at ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("Error while connecting to DB", error);
  });

//Global Error Handler

// app.use((err, req, res, next) => {
//   console.log(err);
//   console.log(err.name);
//   console.log(err.stack);
//   console.log(err.code);
//   res.status(500).json({ message: "something went wrong" });
// });

app.get("/", (req, res) => {
  res.send("Server running");
});
app.get("/test", (req, res) => {
  res.status(200).send("Helo From TEST Page");
});

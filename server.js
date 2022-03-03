const express = require("express");
const dotenv = require("dotenv");
const dbConnect = require("./src/config/db");
const cors = require("cors");
const errorHandler = require("./src/middleware/error");
const cookieParser = require("cookie-parser");
const fileupload = require("express-fileupload");
const path = require("path");
const app = express();
const PORT = process.env.PORT;

const restorent = require("./src/routes/restorent");
const user = require("./src/routes/user");
const auth = require("./src/routes/auth");
const dish = require("./src/routes/dish");
//loading middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser());
//dbconnection
app.use(fileupload());
// Set static folder
app.use(express.static(path.join(__dirname, "public")));
//executing routes
app.use("/api/restorent", restorent);
app.use("/api/users", user);
app.use("/api/authentication", auth);
app.use("/api/dish", dish);
app.get("/",(req,res)=>{

  res.status(301).redirect("https://documenter.getpostman.com/view/17198646/UVJfkG9G")
})

dbConnect();
dotenv.config({ path: "./src/config/config.env" });
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(
    `server is running in ${process.env.NODE_ENV} on http://localhost:${PORT}`
  );
});
module.exports = app;

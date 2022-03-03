const mongoose = require("mongoose");
const dotenv = require("dotenv");

//LOAD DOTENV FILES
dotenv.config({ path: "./src/config/config.env" });

//DEFINING CONNECTIO STRING
const connectionString = process.env.MONGOOSE_URI;
const dbConnect = async (next) => {
  const connect = await mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log(`mongodb connected on: ${connect.connection.host}`);
};
module.exports = dbConnect;

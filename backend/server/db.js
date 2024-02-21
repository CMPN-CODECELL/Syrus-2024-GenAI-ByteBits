const mongoose = require("mongoose");
const connectToMongo = async () => {
  await mongoose.connect(
    process.env.DATABASE_URI,
    await console.log("Successful Connection.")
  );
};
module.exports = connectToMongo;

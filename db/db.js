const mongoose = require("mongoose");

const dbConnect = () => {
  try {
    mongoose.connect(process.env.MONGO_URI);
    console.log(`Database Connected Successfully`);
  } catch (err) {
    console.log(`Database Not Connect ${err}`);
  }
};

module.exports = dbConnect;

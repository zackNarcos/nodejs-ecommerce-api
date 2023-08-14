const mongoose = require("mongoose");

const database = mongoose.connect(
  process.env.DB_URL,
  { useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useFindAndModify: false,
    useCreateIndex: true
  },
  (error) => {
    if (!error) {
      console.log("connexion à mongoDB réussie");
    } else {
      console.log("connexion à mongoDB échouée", error);
    }
  }
);

module.exports = database;

const mongoose = require("mongoose");

const uri = process.env.DB_URL;
console.log(uri)
const database = mongoose.connect(uri,
    { useNewUrlParser: true,
        useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

module.exports = database;

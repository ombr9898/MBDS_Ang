let mongoose = require('mongoose');
var aggregatePaginate = require("mongoose-aggregate-paginate-v2");

let Schema = mongoose.Schema;

let EleveSchema = Schema({
    id: Number,
    nom: String,
    prenom: String,
    adresse: String
});

// Pour activer le plugin
EleveSchema.plugin(aggregatePaginate);

// C'est à travers ce modèle Mongoose qu'on pourra faire le CRUD
module.exports = mongoose.model('Eleve', EleveSchema);

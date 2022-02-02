let mongoose = require('mongoose');
var aggregatePaginate = require("mongoose-aggregate-paginate-v2");

let Schema = mongoose.Schema;

let ProfSchema = Schema({
    id: Number,
    nom: String,
    prenom: String,
    adresse: String,
    photo: String
});

// Pour activer le plugin
ProfSchema.plugin(aggregatePaginate);

// C'est à travers ce modèle Mongoose qu'on pourra faire le CRUD
module.exports = mongoose.model('Prof', ProfSchema);
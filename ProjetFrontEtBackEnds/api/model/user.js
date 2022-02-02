let mongoose = require('mongoose');
var aggregatePaginate = require("mongoose-aggregate-paginate-v2");

let Schema = mongoose.Schema;
let UserSchema =Schema({
    id:Number,
    username: String,
    password: String
});
UserSchema.plugin(aggregatePaginate);

module.exports = mongoose.model('User',UserSchema);
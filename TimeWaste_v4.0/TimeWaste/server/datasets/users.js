var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    email: String,
    password: String,
    image: String,
    username: String,
    biography: String,
    following: [{userId : String}],
    followers: [{userId : String}]
}, { minimize: false });

module.exports = mongoose.model('User', userSchema );

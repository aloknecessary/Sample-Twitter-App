var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tweetsSchema = new Schema({
    user: String,
    userId: String,
    content: String,
    userImage : String,
    date: { type: Date, default: Date.now }
}, { minimize: false });

module.exports = mongoose.model('Tweet', tweetsSchema);

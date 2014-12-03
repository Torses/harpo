var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var usersSchema = new Schema({
	user: 		{ type: String},
	password: 	{ type: String},
	admin: 		{ type: Boolean}
});


module.exports = mongoose.model('users', usersSchema);
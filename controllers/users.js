//File: controllers/users.js
var mongoose = require('mongoose');
var Users = mongoose.model('users');

//GET - Return all Users in the DB

exports.findALLUsers = function(req,res){
	Users.find(function(err, users){
		if(err) res.send(500, err.message);

		console.log('GET /users')
			res.status(200).jsonp(users);
	});
};

//GET - Return a User with specified ID

exports.findById = function(req,res){
	Users.findById(req.params.id, function(err, users){
		if(err) return res.send(500, err.message);

		console.log('GET /users/' + req.params.id);
			res.status(200).jsonp(users);
	});
}

//POST - Insert a new User in the DB

exports.addUser = function(req,res){
	console.log('POST');
	console.log(req.body);

	var users = new users({
		user: 		req.body.user,
		password: 	req.body.password,
		admin: 		req.body.admin
	});

	users.save(function(err, users){
		if(err) return res.send(500, err.message);
		res.status(200).jsonp(users);
	});
};

//PUT - Update a register already exists

exports.updateUsers = function(req, res) {
    users.findById(req.params.id, function(err, users) {
        users.user 		= req.body.user;
        users.password 	= req.body.password;
        users.admin 	= req.body.admin;

        users.save(function(err) {
            if(err) return res.send(500, err.message);
      		res.status(200).jsonp(users);
        });
    });
};

//DELETE - Delete a User with specified ID

exports.deleteUser = function(req, res) {
    users.findById(req.params.id, function(err, users) {
        users.remove(function(err) {
            if(err) return res.send(500, err.message);
      		res.status(200);
        })
    });
};
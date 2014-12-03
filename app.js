var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    methodOverride = require("method-override");
    mongoose = require('mongoose');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

var router = express.Router();

app.get('/', function(req, res) {
  res.send("Hello world!");
});

app.use(router);

//Connect to MongoDB 
mongoose.connect('mongodb://127.0.0.1:27017/users', function(err,res){
	if(err){
		console.log('ERROR: connecting to Database. ' + err);
	} else {
		console.log('Connected to Database');
	}
});

var models = require('./models/users')(app, mongoose);

//Port listening
app.listen(3000, function() {
  console.log("Node server running on http://localhost:3000");
});


var UsersCtrl = require('./controllers/users');

//API routes
var users = express.Router();

users.route('/users')
  .get(UsersCtrl.findALLUsers)
  .post(UsersCtrl.addUser);

users.route('/users/:id')
  .get(UsersCtrl.findById)
  .put(UsersCtrl.updateUsers)
  .delete(UsersCtrl.deleteUser);


app.use('/api', users);
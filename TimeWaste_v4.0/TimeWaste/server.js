var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var multiPart = require('connect-multiparty');
var multiPartMiddleware = multiPart();

var app = express();
var authenticationController = require('./server/controllers/authentication-controller');
var profileController = require('./server/controllers/profile-controller');
var tweetsController = require('./server/controllers/tweets-controller');
var followUserController = require('./server/controllers/follow-user-controller');

mongoose.connect('mongodb://localhost:27017/Time_Waste');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("we're connected!");
});


app.use(multiPartMiddleware);
app.use(bodyParser.json());
app.use('/app',express.static(__dirname + "/app"));
app.use('/node_modules', express.static(__dirname + "/node_modules"));
app.use('/uploads/', express.static(__dirname + "/server/uploads"));

//Authentication

app.post('/api/user/signup',authenticationController.signup);
app.post('/api/user/login',authenticationController.login);

//Profile

app.post('/api/profile/edit', multiPartMiddleware, profileController.updatePhoto);
app.put('/api/profile/updateUsername', profileController.updateUserName);
app.put('/api/profile/updateUserbio', profileController.updateUserBio);
app.get('/api/profile/getUserImage', profileController.getUserImage);

//Tweets

app.post('/api/tweets/post', tweetsController.postTweet);
app.post('/api/tweets/get', tweetsController.getTweets);

//Follow Users

app.get('/api/users/get', followUserController.getUsers);
app.post('/api/users/follow', followUserController.followUser);
app.post('/api/users/unfollow', followUserController.unFollowUser);


app.get('/',function(req,res){
  // passing the absolute path to send file
  // res.sendFile(__dirname + '/index.html');
  // passing root and file name
  res.sendFile('index.html', { root: __dirname });
});



app.listen('3200',function(){
  console.log('I am ready at port 3200');
});

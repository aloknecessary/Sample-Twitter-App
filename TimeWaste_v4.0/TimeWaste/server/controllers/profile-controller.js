var User = require('../datasets/users');
var fs = require('fs-extra');
var path = require('path');

module.exports.updatePhoto = function(req, res) {
    var file = req.files.file;
    var userId = req.body.userId;

    console.log('User ' + userId + ' is submitting ', file);
    //var uploadDate = new Date().toISOString();
    //uploadDate = uploadDate.replace(".", "_");
    //uploadDate = uploadDate.replace(":", "_");
    //uploadDate = uploadDate.replace(":", "_");
    //
    var tempPath = file.path;
    var targetPath = path.join(__dirname + "/../uploads/" + file.name);
    var savePath = "/uploads/" + file.name;
    //console.log(targetPath);
    //
    fs.copy(tempPath, targetPath, function(err) {
        if (err) {
            throw err;
        } else {
            //console.log("uploaded image data");
            User.findById(userId, function(err, userData) {
                var user = userData;
                user.image = savePath;
                user.save(function(err) {
                    if (err) {
                        console.log("unable to edit user data");
                        res.json({ status: 500 });
                    } else {
                        console.log("edited user data, added image info");

                        res.json({ status: 200 });
                    }
                });
            });
        }
    });
};

module.exports.updateUserName = function(req, res) {
    
    var userId = req.body.userId;
    var userName = req.body.userName;

    User.findById(userId, function (err, userData) {
        if (err) {
            console.log("user not found" + userId );
            return res.json({ status: 500 });
        }
        var user = userData;
        user.username = userName;
        user.save(function (err) {
            if (err) {
                console.log("unable to edit username");
                return res.json({ status: 500 });
            } else {
                console.log("added username");
                return res.json({ status: 200 });
            }
        });
    });
};


module.exports.updateUserBio = function (req, res) {
    
    var userId = req.body.userId;
    var bio = req.body.userBio;
    
    User.findById(userId, function (err, userData) {
        if (err) {
            console.log("user not found" + userId);
            return res.json({ status: 500 });
        }
        var user = userData;
        user.biography = bio;
        user.save(function (err) {
            if (err) {
                console.log("unable to add biography");
                return res.json({ status: 500 });
            } else {
                console.log("added biography");
                return res.json({ status: 200 });
            }
        });
    });
};


module.exports.getUserImage = function (req, res) {
    
    var userId = req.query.userId;
    
    User.findById(userId, function (err, userData) {
        if (err) {
            console.log("user not found" + userId);
            return res.json({ status: 500 });
        } else {
            var imageUrl = userData.image == null ? "/app/img/img_not_available.png" : userData.image;
            return res.json({ status: 200, imgUrl: imageUrl });
        }
        
    });
};
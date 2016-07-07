var User = require('../datasets/users');

// SIGN UP HERE

module.exports.signup = function(req, res) {
    //console.log(req.body);
    var user = new User(req.body);
    console.log(user);
    user.save(function (err, u) {
        if (err) {
            console.error(err);
            return res.json({ status: 500 });
        }
        console.log(u);
        res.json(req.body.email);
    });

};

// LOGIN HERE

module.exports.login = function(req, res) {
    User.find(req.body, function(err, results) {
        if (err) {
            console.error('Error occured, no user found');
        }
        //console.log(result);
        if (results && results.length == 1) {
            var userData = results[0];
            res.json({
                email: req.body.email,
                id: userData._id,
                image: userData.image,
                username: userData.username == null ? "" : userData.username,
                biography: userData.biography == null ? "" : userData.biography,
                followers: userData.followers,
                following: userData.following
            });
        } else {
            res.json("invalid request");
        }
    });
};

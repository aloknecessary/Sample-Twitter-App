var Users = require('../datasets/users');


module.exports.getUsers = function (req, res) {
    Users.find({},function (err, allUsers) {
        if (err) {
            res.error(err);
        } else {
            res.json(allUsers);
        }
    });
};


module.exports.followUser = function (req, res) {
    var userId = req.body.myId;
    var followingId = req.body.followId;
    Users.findById(followingId, function(err, follow) {
        follow.followers.push({ userId: userId });
        follow.save();
    });
    Users.findById(userId, function (err, user) {
        user.following.push({ userId: followingId });
        user.save();
    });
    res.end();
};


module.exports.unFollowUser = function (req, res) {
    var userId = req.body.myId;
    var unFollowId = req.body.unfollowId;
    //console.log("unfollow " + unFollowId);
    //console.log("user Id " + userId);
    Users.findById(unFollowId, function (err, follow) {
        //console.log(follow.followers);
        var remains = [];
        follow.followers.filter(function (follower) {
            if (follower.userId != userId) {
                remains.push({ userId: follower.userId });
            }
        });
        follow.followers = remains;
        follow.save();
        
    });
    Users.findById(userId, function (err, user) {
        var remains = [];
        user.following.filter(function (following) {
            if (following.userId != unFollowId) {
                remains.push({ userId: following.userId });
            }
        });
        user.following = remains;
        user.save();
        res.json({ "remaingFollows": remains });
    });
    //res.end();
};
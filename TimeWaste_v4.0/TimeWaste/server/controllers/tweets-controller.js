var Tweet = require('../datasets/tweets');


module.exports.postTweet = function (req, res) {

    var tweet = new Tweet(req.body);
    tweet.save();
    if (!req.body.following) {
        Tweet.find({}).sort({ date: -1 }).exec(function (err, allTweets) {
            if (err) {
                res.error(err);
            } else {
                res.json(allTweets);
            }
        });
    } else {
        var requestedUsers = [];
        for (var i = 0, len = req.body.following.length; i < len; i++) {
            requestedUsers.push({ userId: req.body.following[i].userId });
        }
        Tweet.find({ $or: requestedUsers }).sort({ date: -1 }).exec(function (err, allTweets) {
            if (err) {
                res.error(err);
            } else {
                res.json(allTweets);
            }
        });
    }
};

module.exports.getTweets = function (req, res) {
    if (!req.body.following) {
        Tweet.find({}).sort({ date: -1 }).exec(function(err, allTweets) {
            if (err) {
                res.error(err);
            } else {
                res.json(allTweets);
            }
        });
    } else {
        var requestedUsers = [];
        for (var i = 0, len = req.body.following.length; i < len; i++) {
            requestedUsers.push({ userId: req.body.following[i].userId });
        }
        Tweet.find({ $or: requestedUsers }).sort({ date: -1 }).exec(function(err, allTweets) {
            if (err) {
                res.error(err);
            } else {
                res.json(allTweets);
            }
        });
    }
    
};
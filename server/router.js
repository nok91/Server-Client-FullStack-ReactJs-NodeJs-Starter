//
const Authentication = require('./controllers/authentication');
const passportConfig = require('./services/passport');
const passport = require('passport');

// Authenticating requests is as simple as calling passport.authenticate() and specifying which strategy to employ.
const requireAuth = passport.authenticate('jwt', { session : false }); 
const requireSignin = passport.authenticate('local', { session: false });

const User = require('./models/user');


module.exports = function (app) {
    //all requests come in must pass requireAuth request and then go on to the request handler
    app.get('/', requireAuth, function(req, res){
        res.send({ hi: 'there' });
    });

    app.get('/userList', requireAuth, function (req, res) {
        User.find({}, function (err, users) {
            var userMap = {};

            users.forEach(function (user) {
                userMap[user._id] = user;
            });

            res.send(userMap);
        });
    });

    app.post('/signin', requireSignin, Authentication.signin )
    app.post('/signup', Authentication.signup);
}
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

    app.get('/folder', function (req, res) {
        res.send(
            [
                {
                    "Name": "Connect",
                    "DisplayText": "Connect with an unrivalled audience",
                    "ButtonText": "Show Me",
                    "Link": "/locations/52c8ebad-3c93-43a2-a86d-426fa8287f52"
                },
                {
                    "Name": "Occupier Agent",
                    "DisplayText": "Are you and occupier/agent?",
                    "ButtonText": "Connect with us",
                    "Link": "/opportunities/6b31721e-335c-4718-b94b-aa726db7879c"
                },
                {
                    "Name": "Brand Agency",
                    "DisplayText": "Are you a brand/agency?",
                    "ButtonText": "Connect with us",
                    "Link": "/opportunities/71761e66-f07f-424c-9bec-4464186b66f6"
                },
                {
                    "Name": "Partnerships",
                    "DisplayText": "Do you want to do something amazing",
                    "ButtonText": "Connect with us",
                    "Link": "/opportunities/ef44495f-04e2-4bcd-8a9e-73f6a2f332bd"
                }
            ]
        );
    });

    app.post('/signin', requireSignin, Authentication.signin )
    app.post('/signup', Authentication.signup);
}
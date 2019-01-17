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
                { Id: "87b9a123-0670-4f23-8064-50595d216f47", type: 'folder', name: 'Test Folder 2', updated: 'Bianca Neve', size: 2 },
                { Id: "87b9a123-1670-4f23-2974-85234d216f47", type: 'folder', name: 'Test Folder 1', updated: 'Mohammed Nokri', size: 40 },
                { Id: "87b9a123-2670-4f23-3884-50595d216f47", type: 'folder', name: 'Test Folder 5', updated: 'Zorro Neve', size: 30 },
                { Id: "87b9a123-3670-4f23-4793-50595d216f47", type: 'folder', name: 'Test Folder 4', updated: 'Alex Neve', size: 20 },
                { Id: "87b9b123-0670-4f23-6666-50595d216f47", type: 'txt', name: 'Test Text file', updated: 'Carlo Bacchi', size: 20, src: "https://dataroom-dev.azurewebsites.net/Library/Download/24" },
                { Id: "87b9a123-0670-4f23-7510-50595d216f47", type: 'folder', name: 'Test Folder 9', updated: 'David Zuru', size: 60 },
                { Id: "87b9a123-0670-4f23-8460-50595d216f47", type: 'pdf', name: 'Fin Stat 2015', updated: 'David Anita', size: 29, src: "https://dataroom-dev.azurewebsites.net/Library/Download/8" },
                { Id: "87b9a123-0670-4f23-9362-50595d216f47", type: 'folder', name: 'Test Folder 8', updated: 'David Anita', size: 29 },
                { Id: "87b9a123-0670-4f23-1263-50595d216f47", type: 'image', name: 'Test Image 1', updated: 'David Anita', size: 29, src: "http://static.boxxed.com/boxxed/Media/images/projects/p_12/Preview.jpg", download: "https://dataroom-dev.azurewebsites.net/Library/Download/25" },
                { Id: "87b9a123-0670-4f23-0166-50595d216f47", type: 'pdf', name: 'Fin-Stat 2011', updated: 'David Anita', size: 29, src: "https://dataroom-dev.azurewebsites.net/Library/Download/9" },
            ]
        );
    });

    app.post('/signin', requireSignin, Authentication.signin )
    app.post('/signup', Authentication.signup);
}
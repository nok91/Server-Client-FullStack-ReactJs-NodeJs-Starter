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

        var _Id = req.query.Id || 0;

        var data = { }


        switch (_Id) {
            case "10145259659":
            case "0" : 
                var data = {
                    Id: "0",
                    type: 'folder',
                    name: 'Main Folder',
                    updated: 'Data-Room',
                    size: 10,
                    files: [
                        { Id: "380652543720", type: 'folder', name: 'Test Folder 2', updated: 'Bianca Neve', size: 2, root: "380652543720" },
                        { Id: "379340707916", type: 'folder', name: 'Test Folder 1', updated: 'Mohammed Nokri', size: 40, root: "379340707916" },
                        { Id: "63576959235", type: 'folder', name: 'Test Folder 5', updated: 'Zorro Neve', size: 30, root: "63576959235" },
                        { Id: "50432995144", type: 'folder', name: 'Test Folder 4', updated: 'Alex Neve', size: 20, root: "50432995144" },
                        { Id: "40315259652", type: 'txt', name: 'Test Text file', updated: 'Carlo Bacchi', size: 20, src: "https://dataroom-dev.azurewebsites.net/Library/Download/24", root: "379340707916" },
                        { Id: "20295259650", type: 'folder', name: 'Test Folder 9', updated: 'David Zuru', size: 60, root: "20295259650" },
                        { Id: "10145259659", type: 'pdf', name: 'Fin Stat 2015', updated: 'David Anita', size: 29, src: "https://dataroom-dev.azurewebsites.net/Library/Download/8", root: "379340707916" },
                        { Id: "20055259652", type: 'folder', name: 'Test Folder 8', updated: 'David Anita', size: 29, root: "20055259652" },
                        { Id: "90905259656", type: 'image', name: 'Test Image 1', updated: 'David Anita', size: 29, src: "http://static.boxxed.com/boxxed/Media/images/projects/p_12/Preview.jpg", download: "https://dataroom-dev.azurewebsites.net/Library/Download/25", root: "379340707916" },
                        { Id: "108252596528", type: 'pdf', name: 'Fin-Stat 2011', updated: 'David Anita', size: 29, src: "https://dataroom-dev.azurewebsites.net/Library/Download/9", root: "379340707916" }
                    ]
                }

            break;
            case "380652543720":

                data = {
                    Id: "0",
                    type: 'folder',
                    name: 'Test Folder 2',
                    updated: 'Bianca Neve',
                    size: 10,
                    files: [
                        { Id: "40315259652", type: 'txt', name: 'Test Text file', updated: 'Carlo Bacchi', size: 20, src: "https://dataroom-dev.azurewebsites.net/Library/Download/24", root: "379340707916" },
                        { Id: "20295259650", type: 'folder', name: 'Test Folder 9', updated: 'David Zuru', size: 60, root: "20295259650" },
                        { Id: "10145259659", type: 'pdf', name: 'Fin Stat 2015', updated: 'David Anita', size: 29, src: "https://dataroom-dev.azurewebsites.net/Library/Download/8", root: "379340707916" },
                        { Id: "90905259656", type: 'image', name: 'Test Image 1', updated: 'David Anita', size: 29, src: "http://static.boxxed.com/boxxed/Media/images/projects/p_12/Preview.jpg", download: "https://dataroom-dev.azurewebsites.net/Library/Download/25", root: "379340707916" },
                    ]
                }
                
                break;
        
            default:
                    
                break;
        }


        console.log("here I'm", req.query)
       

        res.send(data);
    });

    app.post('/signin', requireSignin, Authentication.signin )
    app.post('/signup', Authentication.signup);
}
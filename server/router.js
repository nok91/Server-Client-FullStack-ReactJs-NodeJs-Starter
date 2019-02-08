//
const Authentication = require('./controllers/authentication');
const passportConfig = require('./services/passport');
const passport = require('passport');

// const linqjs = require('linqjs');

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


    function findById(o, Id) {
        //Early return
        if( o.Id === Id ){
          return o;
        }
        var result, p; 
        for (p in o) {
            if( o.hasOwnProperty(p) && typeof o[p] === 'object' ) {
                result = findById(o[p], Id);
                if(result){
                    return result;
                }
            }
        }
        return result;
    }


    app.get('/folder', function (req, res) {

        var _Id = req.query.Id || 0;

        var data = {
            Id: "0",
            type: 'folder',
            name: 'Main Folder',
            updated: 'Data-Room',
            size: 10,
            history: [{Id: '0', name: 'Home'}],
            files: [
                { Id: "380652543720", type: 'folder', name: 'Test Folder 2', updated: 'Bianca Neve', size: 2, root: "0", history: [{Id: '0', name: 'Home'}, {Id: '380652543720', name: 'Test Folder 2'}], files: [
                    { Id: "90345259699", type: 'pdf', name: 'Pdf Sample 3', updated: 'David Anita', size: 29, src: "http://localhost:3090/files/pdf-sample-3.pdf", root: "380652543720", history: [{Id: '0', name: 'Home'}, {Id: '380652543720', name: 'Test Folder 2'}] },
                    { Id: "450652543761", type: 'folder', name: 'Test Folder z', updated: 'Bianca Neve', size: 2, root: "380652543720", history: [{Id: '0', name: 'Home'}, {Id: '380652543720', name: 'Test Folder 2'}, {Id: '450652543761', name: 'Test Folder z'}] , files: [
                        { Id: "00344259687", type: 'pdf', name: 'Pdf Sample 2', updated: 'David Anita', size: 29, src: "http://localhost:3090/files/pdf-sample-2.pdf", root: "450652543761", history: [{Id: '0', name: 'Home'}, {Id: '380652543720', name: 'Test Folder z'}, {Id: '450652543761', name: 'Test Folder 2'}] },
                        { Id: "10345259691", type: 'pdf', name: 'Pdf Sample 3', updated: 'David Anita', size: 29, src: "http://localhost:3090/files/pdf-sample-3.pdf", root: "450652543761", history: [{Id: '0', name: 'Home'}, {Id: '380652543720', name: 'Test Folder z'}, {Id: '450652543761', name: 'Test Folder 2'}] },
                    ] },
                ] },
                { Id: "379340707916", type: 'folder', name: 'Test Folder 1', updated: 'Mohammed Nokri', size: 40, root: "0", history: [{Id: '0', name: 'Home'}, {Id: '380652543720', name: 'Test Folder 2'}], files: [
                    { Id: "10315259650", type: 'txt', name: 'Test Text file 1', updated: 'Carlo Bacchi', size: 20, src: "http://localhost:3090/files/txt-sample.txt", root: "379340707916", history: [{Id: '0', name: 'Home'}, {Id: '379340707916', name: 'Test Folder 1'}] },
                    { Id: "10315259650", type: 'txt', name: 'Test Text file 2', updated: 'Carlo Bacchi', size: 20, src: "http://localhost:3090/files/txt-sample.txt", root: "379340707916", history: [{Id: '0', name: 'Home'}, {Id: '379340707916', name: 'Test Folder 1'}] },
                ] },
                { Id: "50432995144", type: 'folder', name: 'Test Folder 4', updated: 'Alex Neve', size: 20, root: "50432995144", history: [{Id: '0', name: 'Home'}, {Id: '380652543720', name: 'Test Folder 2'}] , files: [
                    { Id: "89315533617", type: 'txt', name: 'Test Text file zero', updated: 'Carlo Bacchi', size: 20, src: "http://localhost:3090/files/txt-sample.txt", root: "50432995144", history: [{Id: '0', name: 'Home'}, {Id: '50432995144', name: 'Test Folder 4'}] },
                    { Id: "12305259600", type: 'txt', name: 'Test Text file otto', updated: 'Carlo Bacchi', size: 20, src: "http://localhost:3090/files/txt-sample.txt", root: "50432995144", history: [{Id: '0', name: 'Home'}, {Id: '50432995144', name: 'Test Folder 4'}] },
                ]},
                { Id: "40315259652", type: 'txt', name: 'Test Text file', updated: 'Carlo Bacchi', size: 20, src: "http://localhost:3090/files/txt-sample.txt", root: "0", history: [{Id: '0', name: 'Home'}] },
                { Id: "20295259650", type: 'folder', name: 'Test Folder 9', updated: 'David Zuru', size: 60, root: "0", history: [{Id: '0', name: 'Home'}, {Id: '380652543720', name: 'Test Folder 2'}]  , files: [
                    { Id: "80315539607", type: 'txt', name: 'Test Text file zero', updated: 'Carlo Bacchi', size: 20, src: "http://localhost:3090/files/txt-sample.txt", root: "20295259650", history: [{Id: '0', name: 'Home'}, {Id: '20295259650', name: 'Test Folder 9'}] },
                    { Id: "03305159691", type: 'pdf', name: 'Pdf Sample uno', updated: 'David Anita', size: 29, src: "http://localhost:3090/files/pdf-sample-2.pdf", root: "20295259650", history: [{Id: '0', name: 'Home'}, {Id: '20295259650', name: 'Test Folder 9'}] },
                ]},
                { Id: "10145259659", type: 'pdf', name: 'Fin Stat 2015', updated: 'David Anita', size: 29, src: "http://localhost:3090/files/pdf-sample.pdf", root: "0", history: [{Id: '0', name: 'Home'}] },
                { Id: "20055259652", type: 'folder', name: 'Test Folder 8', updated: 'David Anita', size: 29, root: "0", history: [{Id: '0', name: 'Home'}, {Id: '380652543720', name: 'Test Folder 2'}]  , files: [
                    { Id: "30315535417", type: 'txt', name: 'Test Text file zero', updated: 'Carlo Bacchi', size: 20, src: "http://localhost:3090/files/txt-sample.txt", root: "20055259652", history: [{Id: '0', name: 'Home'}, {Id: '20055259652', name: 'Test Folder 8'}] },
                    { Id: "40305250610", type: 'txt', name: 'Test Text file otto', updated: 'Carlo Bacchi', size: 20, src: "http://localhost:3090/files/txt-sample.txt", root: "20055259652", history: [{Id: '0', name: 'Home'}, {Id: '20055259652', name: 'Test Folder 8'}] },
                    { Id: "01014159667", type: 'image', name: 'Test Image ocho', updated: 'David Anita', size: 29, src: "http://localhost:3090/files/image-sample.jpg", root: "20055259652", history: [{Id: '0', name: 'Home'}, {Id: '20055259652', name: 'Test Folder 8'}] },
                ]},
                { Id: "90905259656", type: 'image', name: 'Test Image 2', updated: 'David Anita', size: 29, src: "http://localhost:3090/files/image-sample-2.jpg", root: "0", history: [{Id: '0', name: 'Home'}] },
                { Id: "108252596528", type: 'pdf', name: 'Fin-Stat 2011', updated: 'David Anita', size: 29, src: "http://localhost:3090/files/pdf-sample-2.pdf", root: "0", history: [{Id: '0', name: 'Home'} ] },
                { Id: "19805256954", type: 'image', name: 'Test Image 3', updated: 'David Anita', size: 29, src: "http://localhost:3090/files/image-sample-3.jpg", root: "0", history: [{Id: '0', name: 'Home'} ] },
                { Id: "19805244415", type: 'image', name: 'Test Image 4', updated: 'David Anita', size: 29, src: "http://localhost:3090/files/image-sample-4.jpg", root: "0" , history: [{Id: '0', name: 'Home'}] },
            ]
        }

        data = _Id == 0  ? data : findById(data.files, _Id);

        // switch (_Id) {
        //     case "10145259659":
        //         var data = { Id: "10145259659", type: 'pdf', name: 'Fin Stat 2015', updated: 'David Anita', size: 29, src: "http://localhost:3090/files/pdf-sample.pdf", root: "0" }
        //     break;
        //     case "108252596528":
        //         var data = { Id: "108252596528", type: 'pdf', name: 'Fin Stat 2015', updated: 'David Anita', size: 29, src: "http://localhost:3090/files/pdf-sample-2.pdf", root: "0" }
        //     break;
        //     case "72145259641" :
        //         var data = { Id: "72145259641", type: 'pdf', name: 'Fin Stat 2015', updated: 'David Anita', size: 29, src: "http://localhost:3090/files/pdf-sample-3.pdf", root: "380652543720" }
        //     break;
        //     case "0" : 
        //         var data = {
        //             Id: "0",
        //             type: 'folder',
        //             name: 'Main Folder',
        //             updated: 'Data-Room',
        //             size: 10,
        //             files: [
        //                 { Id: "380652543720", type: 'folder', name: 'Test Folder 2', updated: 'Bianca Neve', size: 2, root: "380652543720" },
        //                 { Id: "379340707916", type: 'folder', name: 'Test Folder 1', updated: 'Mohammed Nokri', size: 40, root: "379340707916" },
        //                 { Id: "63576959235", type: 'folder', name: 'Test Folder 5', updated: 'Zorro Neve', size: 30, root: "63576959235" },
        //                 { Id: "50432995144", type: 'folder', name: 'Test Folder 4', updated: 'Alex Neve', size: 20, root: "50432995144" },
        //                 { Id: "40315259652", type: 'txt', name: 'Test Text file', updated: 'Carlo Bacchi', size: 20, src: "https://dataroom-dev.azurewebsites.net/Library/Download/24", root: "379340707916" },
        //                 { Id: "20295259650", type: 'folder', name: 'Test Folder 9', updated: 'David Zuru', size: 60, root: "20295259650" },
        //                 { Id: "10145259659", type: 'pdf', name: 'Fin Stat 2015', updated: 'David Anita', size: 29, src: "http://localhost:3090/files/pdf-sample.pdf", root: "379340707916" },
        //                 { Id: "20055259652", type: 'folder', name: 'Test Folder 8', updated: 'David Anita', size: 29, root: "20055259652" },
        //                 { Id: "90905259656", type: 'image', name: 'Test Image 1', updated: 'David Anita', size: 29, src: "http://static.boxxed.com/boxxed/Media/images/projects/p_12/Preview.jpg", download: "https://dataroom-dev.azurewebsites.net/Library/Download/25", root: "379340707916" },
        //                 { Id: "108252596528", type: 'pdf', name: 'Fin-Stat 2011', updated: 'David Anita', size: 29, src: "http://localhost:3090/files/pdf-sample-2.pdf", root: "379340707916" }
        //             ]
        //         }
        //     break;
        //     case "380652543720":
        //         data = {
        //             Id: "0",
        //             type: 'folder',
        //             name: 'Test Folder 2',
        //             updated: 'Bianca Neve',
        //             size: 10,
        //             files: [
        //                 { Id: "40315259652", type: 'txt', name: 'Test Text file', updated: 'Carlo Bacchi', size: 20, src: "https://dataroom-dev.azurewebsites.net/Library/Download/24", root: "380652543720" },
        //                 { Id: "20295259650", type: 'folder', name: 'Test Folder 9', updated: 'David Zuru', size: 60, root: "380652543720" },
        //                 { Id: "72145259641", type: 'pdf', name: 'Fin Stat 2015', updated: 'David Anita', size: 29, src: "https://dataroom-dev.azurewebsites.net/Library/Download/8", root: "380652543720" },
        //                 { Id: "90905259656", type: 'image', name: 'Test Image 1', updated: 'David Anita', size: 29, src: "http://static.boxxed.com/boxxed/Media/images/projects/p_12/Preview.jpg", download: "https://dataroom-dev.azurewebsites.net/Library/Download/25", root: "380652543720" },
        //             ]
        //         }
        //         break;
        
        //     default:
                    
        //         break;
        // }

        res.send(data);
    });

    app.post('/signin', requireSignin, Authentication.signin )
    app.post('/signup', Authentication.signup);
}
let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let matiere = require('./routes/matieres');
let assignment = require('./routes/assignments');
let prof = require('./routes/profs');
let eleve = require('./routes/eleves');
let  user=  require('./routes/users');
var AuthController = require('./AuthController');



let mongoose = require('mongoose');
mongoose.Promise = global.Promise;
//mongoose.set('debug', true);

// remplacer toute cette chaine par l'URI de connexion à votre propre base dans le cloud s
const uri = 'mongodb+srv://dridi:zakaria23@cluster0.f9nqf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify:false
};

mongoose.connect(uri, options)
  .then(() => {
    console.log("Connecté à la base MongoDB assignments dans le cloud !");
    console.log("at URI = " + uri);
    console.log("vérifiez with http://localhost:8010/api/assignments que cela fonctionne")
    },
    err => {
      console.log('Erreur de connexion: ', err);
    });

// Pour accepter les connexions cross-domain (CORS)
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

// Pour les formulaires
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


let port = process.env.PORT || 8010;

// les routes
const prefix = '/api';

app.route(prefix + '/assignments')
  .get(assignment.getAssignments)
  .post(assignment.postAssignment)
  .put(assignment.updateAssignment);

app.route(prefix + '/assignments/:id')
  .get(assignment.getAssignment)
  .delete(assignment.deleteAssignment);

app.route(prefix + '/matieres')
  .get(matiere.getMatieres)
  .post(matiere.postMatiere)
  .put(matiere.updateMatiere);

app.route(prefix + '/matieres/:id')
  .get(matiere.getMatiere)
  .delete(matiere.deleteMatiere);

app.route(prefix + '/profs')
  .get(prof.getProfs)
  .post(prof.postProf)
  .put(prof.updateProf);

app.route(prefix + '/profs/:id')
  .get(prof.getProf)
  .delete(prof.deleteProf);
app.route(prefix + '/eleves')
  .get(eleve.getEleves)
  .post(eleve.postEleve)
  .put(eleve.updateEleve);

app.route(prefix + '/eleves/:id')
  .get(eleve.getEleve)
  .delete(eleve.deleteEleve);
app.route(prefix+'/users')
    .get(user.getUsers);
app.route(prefix+'/users/:id')
    .get(user.getUser);
app.route(prefix+'/auth/login')
  .post(AuthController.a);


app.listen(port, "0.0.0.0");
console.log('Serveur démarré sur http://localhost:' + port);

module.exports = app;



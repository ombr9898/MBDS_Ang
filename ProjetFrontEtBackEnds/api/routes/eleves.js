let Eleve = require('../model/eleve');

// Récupérer tous les assignments (GET)
/*function getAssignments(req, res){
    Assignment.find((err, assignments) => {
        if(err){
            res.send(err)
        }

        res.send(assignments);
    });
}
*/

// version avec pagination
// Récupérer tous les assignments (GET)
function getEleves(req, res) {
    var aggregateQuery = Eleve.aggregate();

    
    Eleve.aggregatePaginate(aggregateQuery,
      {
        page: parseInt(req.query.page) || 1,
        limit: parseInt(req.query.limit) || 10,
      },
      (err, eleves) => {
        if (err) {
          res.send(err);
        }
        res.send(eleves);
      }
    );
   }
   

// Récupérer un assignment par son id (GET)
function getEleve(req, res){
    let eleveId = req.params.id;

    Eleve.findOne({id: eleveId}, (err, eleve) =>{
        if(err){res.send(err)}
        res.json(eleve);
    })
}

// Ajout d'un assignment (POST)
function postEleve(req, res){
    let eleve = new Eleve();
    eleve.id = req.body.id;
    eleve.nom = req.body.nom;
    eleve.prenom = req.body.prenom;
    eleve.adresse = req.body.adresse;

    console.log("POST eleve reçu :");
    console.log(eleve)

    eleve.save( (err) => {
        if(err){
            res.send('cant post eleve ', err);
        }
        res.json({ message: `${eleve.nom} saved!`})
    })
}

// Update d'un assignment (PUT)
function updateEleve(req, res) {
    console.log("UPDATE recu eleve : ");
    console.log(req.body);
    Eleve.findByIdAndUpdate(req.body._id, req.body, {new: true}, (err, eleve) => {
        if (err) {
            console.log(err);
            res.send(err)
        } else {
          res.json({message: 'updated'})
        }

      // console.log('updated ', assignment)
    });

}

// suppression d'un assignment (DELETE)
function deleteEleve(req, res) {

    Prof.findByIdAndRemove(req.params.id, (err, eleve) => {
        if (err) {
            res.send(err);
        }
        res.json({message: `${eleve.nom} deleted`});
    })
}



module.exports = { getEleves, postEleve, getEleve, updateEleve, deleteEleve};

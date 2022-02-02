let Matiere = require('../model/matiere');

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
function getMatieres(req, res) {
    var aggregateQuery = Matiere.aggregate();    
    Matiere.aggregatePaginate(aggregateQuery,
      {
        page: parseInt(req.query.page) || 1,
        limit: parseInt(req.query.limit) || 10,
      },
      (err, matieres) => {
        if (err) {
          res.send(err);
        }
        res.send(matieres);
      }
    );
   }
   

// Récupérer un assignment par son id (GET)
function getMatiere(req, res){
    let matiereId = req.params.id;

    Matiere.findOne({id: matiereId}, (err, matiere) =>{
        if(err){res.send(err)}
        res.json(matiere);
    })
}

// Ajout d'un assignment (POST)
function postMatiere(req, res){
    let matiere = new Matiere();
    matiere.id = req.body.id;
    matiere.name = req.body.name;
    matiere.image = req.body.image;
    matiere.prof = req.body.prof;

    console.log("POST matiere reçu :");
    console.log(matiere)

    matiere.save( (err) => {
        if(err){
            res.send('cant post matiere ', err);
        }
        res.json({ message: `${matiere.name} saved!`})
    })
}

// Update d'un assignment (PUT)
function updateMatiere(req, res) {
    console.log("UPDATE recu matiere : ");
    console.log(req.body);
    Matiere.findByIdAndUpdate(req.body._id, req.body, {new: true}, (err, matiere) => {
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
function deleteMatiere(req, res) {

    Matiere.findByIdAndRemove(req.params.id, (err, matiere) => {
        if (err) {
            res.send(err);
        }
        res.json({message: `${matiere.name} deleted`});
    })
}



module.exports = { getMatieres, postMatiere, getMatiere, updateMatiere, deleteMatiere};

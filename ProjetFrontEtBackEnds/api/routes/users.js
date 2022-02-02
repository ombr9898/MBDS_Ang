let User = require('../model/user');

function getUsers(req, res) {
    var aggregateQuery = User.aggregate();

    
    User.aggregatePaginate(aggregateQuery,
      {
        page: parseInt(req.query.page) || 1,
        limit: parseInt(req.query.limit) || 10,
      },
      (err, users) => {
        if (err) {
          res.send(err);
        }
        res.send(users);
      }
    );
   }
   

// Récupérer un assignment par son id (GET)
function getUser(req, res){
    let userId = req.params.id;

    User.findOne({id: UserId}, (err, user) =>{
        if(err){res.send(err)}
        res.json(user);
    })
}

module.exports = { getUser, getUsers};
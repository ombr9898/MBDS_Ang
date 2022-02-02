var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var User = require('./model/user');

var jwt = require('jsonwebtoken');
var config = module.exports = {'secret': 'secret'};
module.exports = router;
function a (req, res){
    console.log(req.body,res.body)
    User.findOne({ username: req.body.username }, function (err, user) {
        console.log(req.body,user)
        if (err) return res.status(500).send('Error on the server.');
        if (!user) return res.status(404).send('No user found.');
        var passwordIsValid = (req.body.password==user.password);
        if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });
        var token = jwt.sign({ id: user._id }, config.secret, {
            expiresIn: 3600 
        });
        res.status(200).send({ auth: true, token: token });
    });
};
router.get('/logout', function(req, res) {
    res.status(200).send({ auth: false, token: null });
});
module.exports = {a};
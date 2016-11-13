var express = require("express");
var app = express();
bodyParser = require('body-parser');
var mongoose = require('mongoose');

// database schemas
var Brewery = require('./models/brewery.js');

// enable retrieving data from POST with body-parser
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// *** DATABASE ***
// connect to remote mongoos instance
mongoose.connect('mongodb://asba-admin:#IloveBeer@ds149557.mlab.com:49557/asba');


// *** Routes for API ***
var router = express.Router();

// middlware
router.use(function(req, res, next){
    console.log("Someone's thirsy for ", req.url);
    next();
});

router.get('/', function(req, res) {
    res.json({
        message: "Cheers! You made it!"
    });
});

// route /breweries GET and POST
router.route('/breweries')
    .post(function(req, res) {
        var brewery = new Brewery();
        brewery.name = req.body.name;
        brewery.description = req.body.description;
        brewery.address = req.body.address;
        brewery.city = req.body.city;
        brewery.phone = req.body.phone;
        brewery.latd = req.body.latd;
        brewery.longd = req.body.longd;

        brewery.save(err => {
            if (err)
                res.send(err);

            res.json({
                message: "Brewery Created"
            });
        });
    })
    .get(function (req, res) {
        Brewery.find(function(err, breweries) {
            if(err)
                res.send(err);
            res.json(breweries);
        });
    });


// Register the routes and define prefix of /api
app.use('/api', router);

var port = process.env.PORT || 4200;
app.listen(port);
console.log("Happy Hour happens on port " + port);

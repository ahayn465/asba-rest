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
                message: "Brewery created",
                data: brewery
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

router.route('/breweries/:brewery_id')
    .get(function(req, res) {
        Brewery.findById(req.params.brewery_id, function(err, brewery) {
            if(err)
                res.send(err);
            res.json(brewery);
        });
    })

    .put(function(req, res){
        Brewery.findById(req.params.brewery_id, function(err, brewery){
            if(err)
                res.send(err);

            if(req.body.name)
                brewery.name = req.body.name;
            if(req.body.description)
                brewery.description = req.body.description;
            if(req.body.adddress)
                brewery.adddress = req.body.adddress;
            if(req.body.city)
                brewery.city = req.body.city;
            if(req.body.phone)
                brewery.phone = req.body.phone;
            if(req.body.latd)
                brewery.latd = req.body.latd;
            if(req.body.longd)
                brewery.longd = req.body.longd;

            brewery.save(function(err){
                if(err)
                    res.send(err);
                res.json({
                    message : "Brewery updated",
                    data: brewery
                });
            })

        });
    })

    .delete(function(req,res){
        Brewery.remove({
            _id: req.params.brewery_id
        }, function(err, brewery){
            if(err)
                res.send(err)
            res.json({ message : "Brewery deleted :( "});
        });
    });


// Register the routes and define prefix of /api
app.use('/api', router);

var port = process.env.PORT || 4200;
app.listen(port);
console.log("Happy Hour happens on port " + port);

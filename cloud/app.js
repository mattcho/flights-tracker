
// These two lines are required to initialize Express in Cloud Code.
 express = require('express');
 app = express();

// Global app configuration section
app.set('views', 'cloud/views');  // Specify the folder to find templates
app.set('view engine', 'ejs');    // Set the template engine
app.use(express.bodyParser());    // Middleware for reading request body

// This is an example of hooking up a request handler with a specific request
// path and HTTP verb using the Express routing API.
app.get('/', function(req, res){
    var flights;
    var Flight = Parse.Object.extend("Flight");
    var query = new Parse.Query(Flight);
    query.descending('datetime');
    query.find().then(function(_flights){
        flights = _flights
        res.render('index', {flights: flights})
    }, function(_error){
        res.json(_error)
    })
})

//app.get('/api/flights', function(req, res){
//    var flights;
//    var Flight = Parse.Object.extend("Flight");
//    var query = new Parse.Query(Flight);
//    query.find().then(function(_flights){
//        flights = _flights
//        res.json(flights)
//    }, function(_error){
//        res.json(_error)
//    })
//})

app.post('/api/flights/create', function(req, res){
    var Flight = Parse.Object.extend("Flight");
    var flightNum = req.body.flightNum;
    var datetime = new Date(req.body.datetime)
    var flight = new Flight({
        flightNum: flightNum,
        datetime: datetime
    })
    flight.save().then(function(_flight){
        res.redirect('/');
    }, function(_error){
        res.json(_error);
    })


})

app.post('/api/flights/:id', function(req, res){
    var Flight = Parse.Object.extend("Flight");
    var flight = new Flight({id: req.params.id})
    flight.destroy().then(function(){
        res.redirect('/')
    })
})

app.listen();

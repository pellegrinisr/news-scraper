//require packages
const express = require('express');
const mongoose = require('mongoose');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');

//require router
const router = require('./routes/router');
//set up the port
const port = process.env.PORT || 3000

//initialize express
const app = express();
//configure middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
//static asset folder
app.use(express.static('public'));
//set up handlebars
app.engine('handlebars', handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
//configure mongoose
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI, {useNewUrlParser: true});
//use the router
app.use('/', router);
//start the app
app.listen(port, function() {
    console.log('App running on port ' + port);
});
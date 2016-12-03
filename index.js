var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var app = express();

mongoose.connect(process.env.MONGO_DB_BOARD);
var db = mongoose.connection;
db.once('open', function() {
  console.log('DB connected');
});
db.on('error', function(err) {
  console.log('DB ERROR : ', err);
});

app.set('view engine', 'ejs');
app.use(express.static(__dirname+'/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride('_methode'));

app.use('/', require('./routes/home'));
app.use('/posts', require('./routes/posts'));

app.listen(3000,function() {
  console.log('Server On');
});

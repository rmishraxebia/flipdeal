var express = require('express');
var app = express();
var path = require('path');

var databaseUrl = "localhost:27017/ecommerce"; // "username:password@example.com/mydb"
var collections = ["users"]
//var db = require("mongojs").connect(databaseUrl, collections);

var mongojs = require('mongojs');
var db = mongojs(databaseUrl, collections);
//CDN
var cloudinary = require('cloudinary');


cloudinary.config({ 
  cloud_name: 'rmishra', 
  api_key: '674386685933353', 
  api_secret: 'U-JdMPulnf3H1dKobheXevwjhio' 
});

app.use(express.static('public'));


app.get('/index.htm', function (req, res) {
   res.sendFile( __dirname + "/" + "index.htm" );
})

app.get('/', function(request, response){
    response.sendFile( path.join(__dirname + "/" +'home.html'));
});
app.get('/process_get', function (req, res) {
   // Prepare output in JSON format
   var searchItem;
   response = {
      searchItem:req.query.searchItem
     //last_name:req.query.last_name
   };
  searchItem = response.searchItem;
 console.log("searchItem"+searchItem);
db.users.find({name: searchItem}, function(err, users) {
 console.log("finding");
  if( err || !users) console.log("No product found");
  else users.forEach( function(femaleUser) {
    console.log(femaleUser);
  } );
});


   console.log(response);
   res.end(JSON.stringify(response));
})

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)

})
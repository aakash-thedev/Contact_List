// require the library from package.json
const mongoose = require('mongoose');

// make a connection to database
 mongoose.connect('mongodb://localhost/contact_list_db');

 // store it in db variable and aquire connection check if its connected or not
 const db = mongoose.connection;

 // on any error

 db.on('error', console.error.bind(console, 'Error occured during connecting to db'));


 // on successfull connection 
 db.once('open', function(){
     console.log("Connection to Database established successfully !");
 });
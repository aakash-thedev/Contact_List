// my first express app

const express = require('express');
const path = require('path'); // we do not need to install path module because its inbuilt in node modules
const port = process.env.port || 8000;
const db = require('./config/mongoose.js');

const Contact = require('./models/contact');

// call express() function to create an express app.
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
// use() signifies middlewares
app.use(express.urlencoded());

// to use static files such as CSS / JS / IMAGES etc we use
app.use('*/assets', express.static(__dirname + '/assets'));

// creating our own middleware
// middleware 1 : Middleware are the functions which are called after recieving request from
// browsers and before sending response

// app.use(function(req, res, next) {

//     console.log('Middleare 1 called');

//     req.body.sex = "Male";

//     next();

// });

// // middleare 2

// app.use(function (req, res, next) {

//     console.log('Middleware 2 called');
//     next();

// });

// var contactList = [

//     {
//         name : "Aakash",
//         phone : "8840010480"
//     },

//     {
//         name : "Kopal",
//         phone : "1234567890"
//     },

//     {
//         name : "Thor",
//         phone : "1111001111"
//     },

//     {
//         name : "Joey",
//         phone : "1111001111"
//     },

//     {
//         name : "Chan",
//         phone : "1111001111"
//     },

//     {
//         name : "Ross",
//         phone : "1111001111"
//     }

// ];

var favouriteList = [];

// ---------------- HOME SERVER --------------//

app.get('/', (req, res) => {

    // console.log(req.url);
    // console.log(__dirname);

    // res.end('<h1> Express Server </h1>');
    // to pass any data from server to html
    // we pass it as an object (key value pair)

    // fetching from database
    Contact.AllContact.find({}, function(err, contactList) {
        if(err){
            console.log("Error fetching contacts from database");
            return;
        }

        return res.render('home', {

            title : "Contact List",
            contact_list : contactList

        
        });

    });

});



app.post('/create-contact', (req, res) => {

    // render function searches an ejs file in views folder 
    // there is another function redirects
    // redirects function tells browser to take me to this given url

    console.log(req.body);

    // contactList.push(req.body);
    // instead of pushing it into array
    // push it into database directly
    Contact.AllContact.create({

        name : req.body.name,
        phone : req.body.phone

    }, function(err, newContact) {

        if(err){
            console.log("Error creating a contact");
            return;
        }

        console.log("*****", newContact);

        return res.redirect('back');

    });

});

// to delete a contact we need to have a controller

// we could use string params or query params

// string params

// app.get('/delete-contact/:phone', (req, res) => {

//     console.log(req.params);

//     let contactToBeDeleted = req.params.phone;

// });

// --------------query params

app.get('/delete-contact/', (req, res) => {
    
    console.log(req.query);

    // 60671e87b2db8245e00095f8

    let id1 = req.query.id;

    // now we have id of the conytact which we have to delete and now 
    // there are many function in database to delete a document

    Contact.AllContact.findByIdAndDelete(id1, function(err) {
        console.log("Error deleting contact from db");
        return;
    });


    // delete the same contact from favourites as well
    Contact.FavouriteContact.find({}, function(err, favouriteList) {

        if(err) {
            console.log("Error fetching favourite contact from db");
            return;
        }

        // console.log("Favourite List", favouriteList);

        var id2 = -1;

        for(let c of favouriteList){
            if(c.name == req.query.name){
                id2 = c.id;
                break;
            }
        }

        if(id2 != -1){

            console.log("ID2 - ", id2);

            Contact.FavouriteContact.findByIdAndDelete(id2, function(err2) {
                console.log("Error deleting from favourite contact");
                return;
            });

        }
    });

    // Contact.FavouriteContact.findByIdAndDelete()

    return res.redirect('back');

});

// ------------ favorite contact ---------

app.get('/favourites', (req, res) => {

    // fetch favourite list from database

    Contact.FavouriteContact.find({}, function(err, favouriteList) {

        if(err){
            console.log("Error fetching favourite contact from db");
            return;
        }

        return res.render('home', {

            title : "Contact List",
            contact_list : favouriteList
        
        });

    });   

});

// ------------- adding to favourites ----------- //

// 

app.get('/add-to-favourites/', (req, res) => {

    console.log(req.query);

    Contact.FavouriteContact.find({}, function(err, favouriteList) {

        if(err){
            console.log("Error Adding favourite contact to db");
            return;
        }

        if(favouriteList.includes(req.query)){
        
            // let index = favouriteList.findIndex((contact, name) => {
            //     return contact.phone == req.query.phone && name.name == req.query.name;
            // });
    
            // favouriteList.splice(index, 1);
    
            return res.redirect('back');
        }
    
        else{
    
            Contact.FavouriteContact.create(req.query);
    
            res.redirect('back');
    
        }

    });

});

// ------------------- TEST SERVER ----------------- //

app.get('/test', (req, res) => {

    return res.render('test', {
        title : "Testing Server"
    });

});

// run app on the port
app.listen(port, (err) => {

    if(err){
        console.log(err);
        return;
    }

    console.log("Express Server is running on port : ", port);
});
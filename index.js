// my first express app

const express = require('express');
const path = require('path'); // we do not need to install path module because its inbuilt in node modules
const port = process.env.port || 8005;

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

var contactList = [

    {
        name : "Aakash",
        phone : "8840010480"
    },

    {
        name : "Kopal",
        phone : "1234567890"
    },

    {
        name : "Thor",
        phone : "1111001111"
    },

    {
        name : "Joey",
        phone : "1111001111"
    },

    {
        name : "Chan",
        phone : "1111001111"
    },

    {
        name : "Ross",
        phone : "1111001111"
    }

]

// ---------------- HOME SERVER --------------//

app.get('/', (req, res) => {

    // console.log(req.url);
    // console.log(__dirname);

    // res.end('<h1> Express Server </h1>');
    // to pass any data from server to html
    // we pass it as an object (key value pair)
    return res.render('home', {

        title : "Contact List",
        contact_list : contactList
    
    });

});



app.post('/create-contact', (req, res) => {

    // render function searches an ejs file in views folder 
    // there is another function redirects
    // redirects function tells browser to take me to this given url
    console.log(req.body);

    contactList.push(req.body);

    return res.redirect('/');

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

    let contactToBeDeleted = req.query;

    let deleteContactIndex = contactList.findIndex((contact, name) => {

        return contact.phone == contactToBeDeleted.phone && contact.name == contactToBeDeleted.name;

    });

    contactList.splice(deleteContactIndex, 1);

    return res.redirect('back');

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
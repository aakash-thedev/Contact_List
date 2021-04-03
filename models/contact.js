const mongoose = require('mongoose');

// every document in database is known as schema
// to create schema

const ContactSchema = new mongoose.Schema({

    name : {
        type : String,
        required : true
    },

    phone : {
        type: String,
        required : true
    }

});

// we have to tell database of name Contact to have schema structures like this
// contact_db is the name if the database
const Contact = mongoose.model('Contact_DB', ContactSchema);
const FavouriteContact = mongoose.model('Favourite_Contact', ContactSchema);

module.exports.AllContact = Contact;
module.exports.FavouriteContact = FavouriteContact;
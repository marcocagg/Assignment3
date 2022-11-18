let mongoose = require('mongoose');
//creates a ticket model, this is the schema that all objects in the database must use
let ticketModel = mongoose.Schema({
    name : String,
    request : String,
    date : String,
    priority : String,
    status : String,
    },
    {
        //every item will be in the tickets collection
        collections : "tickets"
    }
)
module.exports = mongoose.model('Ticket',ticketModel);
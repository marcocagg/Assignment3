let mongoose = require('mongoose');
//create a ticket model
let ticketModel = mongoose.Schema({
    name : String,
    request : String,
    date : String,
    priority : String,
    status : String,
    },
    {
        collections : "tickets"
    }
)
module.exports = mongoose.model('Ticket',ticketModel);
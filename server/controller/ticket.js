let express = require('express')
let router = express.Router();
let mongoose = require('mongoose');

let Ticket = require('../models/ticket')

//displays the general chart of the database at /tickets
module.exports.displayTicketList = (req,res,next) => {
    Ticket.find((err,ticketlist) => {
        if(err)
        {
            return console.error(err);
        }
        else 
        {
            res.render('ticket/list',{
                title : 'Current Tickets', 
                Ticketlist : ticketlist
            })
        }
    });
};

//displays the screen to add to the database at tickets/add
module.exports.displayAddPage = (req,res,next) =>  {
    res.render('ticket/add',{title:'Submit a Ticket'})

};

module.exports.processAddPage = (req,res,next) =>  {
    //adds a ticket to the database using this schema
    let newTicket = Ticket ({
        "name" : req.body.name,
        "request" :req.body.request,
        "date" : req.body.date,
        "priority":req.body.priority,
        "status":req.body.status
    });
    // if an error occurs it redirects the user back to the current ticket page
    Ticket.create(newTicket,(err,Ticket) => {
        if(err) { 
            console.log(err);
            res.end()
        }
        else 
        {
            res.redirect('/tickets');
        }

    })
};

//displays the screen to edit an exitsting object in the database at tickets/edit
module.exports.displayEditPage = (req,res,next) =>  {
    //verifys what object you selected to edit is in the database
    let id = req.params.id;
    Ticket.findById(id,(err,ticketToEdit)=> {
        if(err) { 
            console.log(err);
            res.end()
        }
        else 
        {
            res.render('ticket/edit',{title:'Edit a Ticket',ticket:ticketToEdit});
        }
    })
};
//edits a ticket to the database using this schema
module.exports.processEditPage = (req,res,next) =>  {
    let id = req.params.id;
    let updateTicket = Ticket({
        "_id":id,
        "name" : req.body.name,
        "request" :req.body.request,
        "date" : req.body.date,
        "priority":req.body.priority,
        "status":req.body.status
    });
    // if an error occurs it redirects the user back to the current ticket page
    Ticket.updateOne({_id:id},updateTicket,(err)=> {
        if(err) { 
            console.log(err);
            res.end()
        }
        else 
        {
            res.redirect('/tickets');
        }
    })
};

//the delete function verifies the object that you want to delete is actually in the database
module.exports.performDeletePage = (req,res,next) =>  {
    let id = req.params.id;
    Ticket.deleteOne({_id:id},(err) => {
        // if an error occurs it redirects the user back to the current ticket page
        if(err) { 
            console.log(err);
            res.end()
        }
        else 
        {
            res.redirect('/tickets')
        }
    })
};

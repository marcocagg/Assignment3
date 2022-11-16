let express = require('express')
let router = express.Router();
let mongoose = require('mongoose');

let Ticket = require('../models/ticket')

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

module.exports.displayAddPage = (req,res,next) =>  {
    res.render('ticket/add',{title:'Submit a Ticket'})

};

module.exports.processAddPage = (req,res,next) =>  {
    let newTicket = Ticket ({
        "name" : req.body.name,
        "request" :req.body.request,
        "date" : req.body.date,
        "priority":req.body.priority,
        "status":req.body.status
    });
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

module.exports.displayEditPage = (req,res,next) =>  {
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

module.exports.performDeletePage = (req,res,next) =>  {
    let id = req.params.id;
    Ticket.deleteOne({_id:id},(err) => {
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

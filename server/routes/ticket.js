let express = require('express')
let router = express.Router();
let mongoose = require('mongoose');

// need to connect with book model
let Ticket = require('../models/ticket')
let ticketController = require('../controller/ticket')

/*CRUD Operation */
// Read operation 
// Get route for the ticket list 
router.get('/',ticketController.displayTicketList)

/*Perform add operation  */
/*Get route for displaying the ADD-Page -- Create Operation */
router.get('/add',ticketController.displayAddPage)

/*Post route for processing the ADD-Page -- Create Operation */
router.post('/add',ticketController.processAddPage)

/*Perform edit operation  */
/*Get route for displaying the Edit Operation -- Update Operation */
router.get('/edit/:id',ticketController.displayEditPage)
/*Post route for displaying the Edit Operation -- Update Operation */
router.post('/edit/:id',ticketController.processEditPage)

/*Perform delete operation  */
/*Get to perform Delete Operation -- Deletion */
router.get('/delete/:id',ticketController.performDeletePage)

module.exports = router;
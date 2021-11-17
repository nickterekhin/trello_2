const Router = require('express');
const router = new Router();
const ticketRouter = require('./TicketsRouter');


router.use('/tickets',ticketRouter);

module.exports = router;
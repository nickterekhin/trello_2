const expressRouter = require('express');
const router = expressRouter.Router();
const ticketsController = require('../controllers/TicketsController');


router.get('/',ticketsController.index);
router.post('/create',ticketsController.create);
router.post('/move',ticketsController.move);
router.delete('/delete',ticketsController.delete);


module.exports = router;
const APIException = require("../exceptions/APIException");
const Tickets = require("../repository/TicketsCRUD")

class TicketsController{

    async index(req,res,next){
        try {
            const {panel} = req.query;
            Tickets.getAllByPanel(panel, (err, data) => {
                if (err)
                    next(APIException.BadRequest(err.message));
                else
                    res.send(data);
            });
        }catch(e)
        {
            next(APIException.fatal(e.message));
        }
        
    }
    async create(req,res,next){

        try {
            let ticket = new Tickets({
                title: req.body.title,
                description: req.body.description,
                panelId:1,
                sort:0
            });

             Tickets.getLastSort(ticket.panelId, (err, data) => {
                              ticket.sort = data.sort+1;
                                Tickets.create(ticket, (err, data) => {
                                    if (err)
                                        next(APIException.BadRequest(err.message));
                                    else
                                        res.send(data);
                                });
                         });
        }catch(e)
        {
            next(APIException.BadRequest(e.message));
        }

    }
    async move(req,res,next){
        const {id,panel,sort}=req.body;

        Tickets.findById(id,(err,data)=>{
            data.panelId = panel;
            data.sort = sort;

            Tickets.updateById(id,data,(err,data)=>{
                if (err)
                    next(APIException.BadRequest(err.message));
                else
                    res.send(data);
            });
        })
    }
    async delete(req,res,next){
        try {
            const {id} = req.query;
            Tickets.delete(id, (err, data) => {
                if (err)
                    next(APIException.BadRequest(err.message));
                else
                    res.send(data);
            });
        }catch(e)
        {
            next(APIException.BadRequest(e.message));
        }
    }

}
module.exports = new TicketsController();
const sql = require('../db/db')
const APIException = require('../exceptions/APIException')

const Ticket = function(ticket) {
    this.panelId = ticket.panelId;
    this.title = ticket.title;
    this.description = ticket.description;
    this.sort = ticket.sort;
};

Ticket.create = (ticket,result)=>{
    sql.query("INSERT INTO tickets (panelId,title,description,sort,active,addedAt)VALUES(?,?,?,?,?,?)", [ticket.panelId,ticket.title,ticket.description,ticket.sort,1,Date.now()/1000], (err, res) => {
        if (err) {
            return result(err, null);
        }
        console.log("created tutorial: ", {id: res.insertId, ...ticket});
        return result(null, {id: res.insertId, ...ticket});
    });
};
Ticket.getLastSort = (panelId=1,result)=>{
     sql.query("select max(sort) as sortValue from tickets WHERE panelId=?",[panelId],(err,res)=>{
         if(err) {
             return result(err, null);
         }
         return result(null, {sort: res[0].sortValue});
    });
};
Ticket.updateById = (id, ticket, result) => {
    sql.query(
        "UPDATE tickets SET panelId=?, title = ?, description = ?, sort=? WHERE id = ?",
        [ticket.panelId,ticket.title, ticket.description, ticket.sort, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                return result( err,null);
            }

            if (res.affectedRows === 0) {
                // not found Tutorial with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated tutorial: ", { id: id, ...ticket });
            result(null, { id: id, ...ticket });
        }
    );
};
Ticket.delete = (id, result) => {
    sql.query("DELETE FROM tickets WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        if (res.affectedRows === 0) {
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted tutorial with id: ", id);
        result(null, res);
    });
};
Ticket.findById = (id, result) => {
    sql.query(`SELECT * FROM tickets WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found tutorial: ", res[0]);
            result(null, res[0]);
            return;
        }

        result({ kind: "not_found" }, null);
    });
};
Ticket.getAllByPanel = (panel, result) => {
    let query = `SELECT * FROM tickets WHERE panelId=${panel}`;
                          console.log(query);
    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("tutorials: ", res);
        result(null, res);
    });
};

module.exports = Ticket;
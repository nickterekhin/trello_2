import React, {useEffect, useMemo, useState} from 'react';
import Item from "./Item";
import AddTicket from "./AddTicket";
import TicketsFilters from "./TicketsFilters";
import ModalDlg from "./UI/dialogs/ModalDlg";
import Button from "./UI/buttons/Button";
import {useFetch} from "../hooks/useFetch";
import TicketService from "../services/TicketService";


const Panel = (props) => {

    const [tickets, setTickets] = useState([])
    const [filter,setFilter] = useState({query:'',sort:''});
    const [modal,setModal] = useState(false);
    const [execute,isTicketsLoading,ticketError] =useFetch(async ()=>{
        console.log(process.env.REACT_APP_API_URL);
        const response = await TicketService.getAllByPanel(props.id);
        setTickets(response.data);

    });
    const [moveExecutor,isMoveLoading,moveError] = useFetch(async (items,movedTicket)=>{
        movedTicket = movedTicket||null;
        if(movedTicket)
            await TicketService.moveTicket(movedTicket.id,movedTicket.panelId,movedTicket.sort);
        setTickets(items);
    });

    const [removeExecutor,isRemoveLoading,removeError] = useFetch(async(id)=>{
        await TicketService.removeTicket(id);
        setTickets(tickets.filter(p=>p.id!==id))
    });
    useEffect(()=>{
        execute();
    },[]);

    const sortedTickets = useMemo(()=>{
        return [...tickets].sort((a,b)=>a.sort - b.sort);
    },[tickets]);

    const searchTickets = useMemo(()=>{
                   return sortedTickets.filter(t=>t.title.toLowerCase().includes(filter.query.toLowerCase()));
    },[filter.query,sortedTickets]);

    const createTicket =(ticket)=>{
        TicketService.create(ticket).then((r)=>{
            console.log(r);
            ticket.id=r.data.id;
            ticket.sort = r.data.sort;
            setTickets([...tickets,ticket])
        })
        setModal(false);

    }
    const removeTicket = (ticket)=>{
           removeExecutor(ticket.id);
    }

    const moveTicket = (items,movedTicket)=>{
        moveExecutor(items,movedTicket);
    }
    const handlers = props.handlers(tickets,moveTicket);

    return (
        <div className="col-4 p-3">
            <h3>{props.title} {props.id==='1'?<Button onClick={()=>setModal(true)}>Add</Button>:''}</h3>
            <TicketsFilters filter={filter} setFilter={setFilter}/>
            {props.id==='1'?
                <ModalDlg visible={modal} setVisible={setModal} title={"Add Task to TODO List"}>
                <div className={"add-todo row"}>
               <AddTicket createTicket={createTicket}/>
            </div>
                </ModalDlg>
                :''}
            <div id={props.id} className="col" style={{minHeight:"100%"}} onDrop={(e)=>handlers.dragDropPanel(e,props.id)} onDragOver={(e)=>e.preventDefault()}>
                {searchTickets.map((i,idx)=>
                    <Item key={i.id} data={i}  index={idx} handlers={handlers} remove={removeTicket}/>
                )}

            </div>
        </div>
    );
};

export default Panel;
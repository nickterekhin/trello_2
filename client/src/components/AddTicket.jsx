import React, {useState} from 'react';
import Input from "./UI/Input";
import Button from "./UI/buttons/Button";

const AddTicket = (props) => {
    const [ticket,setTicket] = useState({title:'',description:''});
    const addNewTask = (e)=>{
        e.preventDefault();
        const newTask = {
            id: Date.now(),
            panel:'todo',
            title:ticket.title,
            description:ticket.description,
            sort:100
        }
        props.createTicket(newTask);
        setTicket({title:'',description:''})

    }
    return (
        <form>
            <div className={"form-group mb-2"}>
            <Input
                type={"text"}
                placeholder={"Title"} onChange={e=>setTicket({...ticket,title:e.target.value})}
                value={ticket.title}
            />

            </div>
            <div className={"form-group mb-2"}>
            <Input
                type={"text"}
                placeholder={"Description"}
                value={ticket.description}
                onChange={e=>setTicket({...ticket,description:e.target.value})}
            />
            </div>
            <Button onClick={addNewTask} btnType={"success"} >Add Task</Button>
        </form>
    );
};

export default AddTicket;
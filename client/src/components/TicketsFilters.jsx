import React from 'react';
import Input from "./UI/Input";

const TicketsFilters = ({filter,setFilter}) => {
    return (
        <div className="my-2">
            <Input placeholder={"Search"} value={filter.query} onChange={e=>setFilter({filter,query:e.target.value})}/>
        </div>
    );
};

export default TicketsFilters;
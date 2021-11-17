import React, {useEffect, useState} from 'react';
import Panel from "./Panel";
import DragHandlers from "../handlers/DragHandlers";



const Board = () => {
    const  dragHandlers = DragHandlers();

    return (
        <div className="border row">
               <Panel  title="TODO"  id="1" slug={"todo"} key="todo" handlers = {dragHandlers}/>
                <Panel  title="In Progress"  id="2" slug={"in-progress"} key="in_progress"  handlers={dragHandlers}/>
                <Panel  title="DONE"  id="3" key="done" slug={"done"}  handlers={dragHandlers}/>
            </div>
    );
};

export default Board;
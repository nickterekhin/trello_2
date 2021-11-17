import React from 'react';
import Button from "./UI/buttons/Button";

const Item = (props) => {
    
    return (
        <div
            draggable={true}
            onDragOver={(e)=>props.handlers.dragOver(e)}
            onDragLeave={(e)=>props.handlers.dragLeave(e)}
            onDragStart={(e)=>props.handlers.dragStart(e,props.data)}
            onDragEnd={(e)=>props.handlers.dragEnd(e)}
            onDrop={(e)=>props.handlers.dragDrop(e,props.data)}
            className="card" style={{marginBottom:"20px"}}>
            <h5 className="card-header">
                {props.data.id} {props.data.title}
            </h5>
            <div className="card-body">
                <p> {props.data.description}</p>
            </div>
            <div className="card-footer">
                <Button onClick={()=>props.remove(props.data)} btnType={'danger'}>Delete</Button>
            </div>
        </div>
    );
};

export default Item;
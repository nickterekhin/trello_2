import {useState} from "react";

const DragHandlers =()=>{
    const [currItem,setCurrItem] = useState(null);
     let dropDone = false;
     let setAfter = false;

    return (items,handler)=> {
        return {
            dragStart: function (e, item) {
                setCurrItem(item);
            },
            dragOver: function (e) {
                e.preventDefault();
                if (e.target.className === 'card') {
                    e.target.style.boxShadow = '#a9a8a8 1px 5px 6px 0px';
                }
            },
            dragLeave: function (e) {
                e.target.style.boxShadow = 'none';
            },
            dragEnd: function (e) {

                if(dropDone) {
                   handler(items.filter((t)=>t.id!==currItem.id));
                    dropDone = false;
                }
                e.target.style.boxShadow = 'none';
            },
            dragDrop(e, item) {
                e.target.style.boxShadow = 'none';
                if(item.panelId!==currItem.panelId)
                {
                    currItem.panelId = item.panelId;
                }
                const currentIndex = items.indexOf(currItem);
                if(currentIndex!==-1)
                    items.splice(currentIndex,1);

                currItem.sort = parseFloat(item.sort)+0.01;
                const dropIndex = items.indexOf(item);
                items.splice(dropIndex+1,0,currItem);
                handler([...items],currItem);
                dropDone = true;
                setAfter = true;
            },
            dragDropPanel(e, panel) {
               
                if(!setAfter) {
                    currItem.sort = items.length===0?1:parseFloat(items[items.length-1].sort)+1;
                    currItem.panelId = panel;
                    handler([...items, currItem],currItem);
                    dropDone = true;
                }

            }

        }
    }
}

export default DragHandlers;

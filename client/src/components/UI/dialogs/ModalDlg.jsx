import React from 'react';
import dlgStyle from './ModalDlg.module.css';

const ModalDlg = ({children,title,visible,setVisible}) => {
    const modalClasses = ["modal","fade",dlgStyle.modal];
    let styles = null;
    if(visible)
    {
        modalClasses.push("show");
        styles = {display:"block"};
    }

    return (
        <div className={modalClasses.join(' ')} id="exampleModalCenter" tabIndex="-1" role="dialog"
             aria-labelledby="exampleModalCenterTitle" aria-hidden="false" style={styles} onClick={()=>setVisible(false)}>
            <div className="modal-dialog modal-dialog-centered" role="document" onClick={(e)=>e.stopPropagation()}>
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLongTitle">{title}</h5>
                    </div>
                    <div className="modal-body">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalDlg;
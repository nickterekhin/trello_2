import React from 'react';

const Button = ({children,btnType='success',...props}) => {
    return (
        <button {...props} className={`btn btn-${btnType} btn-sm`}>
            {children}
        </button>
    );
};

export default Button;
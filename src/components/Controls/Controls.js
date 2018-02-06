import React from 'react';

import './Controls.css';

const controls = (props) =>{
    return(
        <div className='controls'>
            <button onClick={props.all}>All</button>
            <button onClick={props.online}>Online</button>
            <button onClick={props.offline}>Offline</button>
        </div>
    );
}

export default controls;
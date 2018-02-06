import React from 'react';

import './Streamer.css';

const streamer = (props) => {
    return(
        <a href={props.link} className='Streamer'>
            <div>
            <img src={props.logo} alt='logo'/>
            <p>{props.name}</p>
            <p>{props.status}</p>
            </div>
        </a>
    );
}

export default streamer;
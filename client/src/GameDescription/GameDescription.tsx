import React, {useState} from 'react';
import './GameDescription.css';

/* <GameDescription title='' gameText='' */

interface GameDescriptionProps {
    title: string;
    gameText: string;
}
function GameDescription({title, gameText}: GameDescriptionProps) {
    return (
        <>
        <head>
            <link href='https://fonts.googleapis.com/css?family=Encode Sans Semi Expanded' rel='stylesheet'></link>
            <link href='https://fonts.googleapis.com/css?family=Erica One' rel='stylesheet'></link>
        </head>
        <div className='gameDescriptionBox'>
            <h1 className='gameTitle'>
                {title} 
            </h1>
            <div className='descriptionBox'>
                <h3 className="literallyDescription">Description:</h3>
                <p className='gameDescription'>{gameText}</p>
            </div>
        </div>
        </>
    );
}

export default GameDescription;



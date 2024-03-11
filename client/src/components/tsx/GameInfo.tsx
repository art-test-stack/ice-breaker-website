import { get, ref } from '@firebase/database';
import { database } from '../../firebase/init';
import '../css/GameInfo.css';
import { useState } from 'react';

interface GameInfoProps {
    numPlayers: string;
    duration: string;
    equipments: string[];
    categories: string;
    author: string;
}

/* Assuming categories is a string. Can also be a list of strings, then the last div must be changed.
<GameInfo numPlayers="string" duration = "string" categories="string" equipments={[string,string]} /> */

function GameInfo({numPlayers, duration, categories, equipments, author}: GameInfoProps){

    const listEquipments = equipments.map((equipment, i) => 
        <li key={i}>
            {equipment}
        </li>
        );

    let [userName, setUserName] = useState<string | null>(null);

    // get author username from database
    get(ref(database, 'userData/' + author + "/username")).then((snapshot: any) => {
        if (snapshot.exists()) {
            setUserName(snapshot.val());
        }
    }).catch((error: any) => {
        console.error(error);
    });

    return (
    <>
    <div id='infoBox' data-cy="infoBox">
        <div>
            <p className='bolded'>Number of players:</p>
            <p id='numPlayers'>{numPlayers} players</p>
        </div>
        <div>
            <p className='bolded'>Duration:</p>
            <p id='duration'>{duration}</p>
        </div>
        <div id="list">
            <p className='bolded'>Equipments:</p>
            <ul className='listEquipments'>{listEquipments}</ul>
        </div>
        <div>
            <p className='bolded'>Categories: </p>
            <p id='categories'>{categories}</p>
        </div>

        <div id="authorBox">
            <p className='bolded'>Author:</p>
            <p id='author'>{userName ?? "Anonymous"}</p>
        </div>
    </div>
    </>)
}

export default GameInfo;
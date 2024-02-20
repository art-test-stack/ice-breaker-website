import './GameInfo.css';

interface GameInfoProps {
    numPlayers: string;
    duration: string;
    equipments: string[];
    categories: string;
}

/* Assuming categories is a string. Can also be a list of strings, then the last div must be changed.
<GameInfo numPlayers="string" duration = "string" categories="string" equipments={[string,string]} /> */

function GameInfo({numPlayers, duration, categories, equipments}: GameInfoProps){

    const listEquipments = equipments.map((equipment) => 
        <li key='equipment'>
            {equipment}
        </li>
        );

    return (
    <>
    <div id='infoBox'>
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
    </div>
    </>)
}

export default GameInfo;
import { useNavigate } from 'react-router-dom';
import '../css/SpinTheWheelButton.css'
import React from 'react';

const SpinTheWheelButton: React.FC<{}> = () => {
    const navigate = useNavigate()
    const handleClick = () => {
        navigate ('/spinTheWheel');
    }

    let [is_hovering, setHovering] = React.useState(false);
    return (
        <div>
            <head>
                <link href='https://fonts.googleapis.com/css?family=Galindo' rel='stylesheet'></link>
            </head>
            <button onClick={handleClick} onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)} id="spinTheWheelButton">
                <img src="src/assets/roulette.png" id="rouletteImage" width="30px" height="30px" style={{
                    transform: is_hovering ? "rotate(360deg)" : "rotate(0deg)",
                }}></img>
                Spin the wheel
            </button>
        </div>
    );
}

export default SpinTheWheelButton;
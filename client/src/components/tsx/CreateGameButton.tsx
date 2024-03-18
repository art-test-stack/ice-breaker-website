import { useNavigate } from 'react-router-dom';
import '../css/CreateGameButton.css'

const CreateGameButton: React.FC<{onClick: () => void}> = ({ onClick}) => {
const navigate = useNavigate()
const handleClick = () => {
    navigate ('/createGame');
}
    return (
        <div>
            <head>
                <link href='https://fonts.googleapis.com/css?family=Galindo' rel='stylesheet'></link>
            </head>
            <button onClick={handleClick} id="createGameButton"  data-cy="createNewGameButton">Create new game</button>
        </div>
    );
}

export default CreateGameButton;
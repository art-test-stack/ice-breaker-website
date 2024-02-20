import './CreateGameButton.css'

const CreateGameButton: React.FC<{onClick: () => void}> = ({ onClick}) => {
    return (
        <div>
            <head>
                <link href='https://fonts.googleapis.com/css?family=Galindo' rel='stylesheet'></link>
            </head>
            <button onClick={onClick} id="createGameButton">Create new game</button>
        </div>
    );
}

export default CreateGameButton;
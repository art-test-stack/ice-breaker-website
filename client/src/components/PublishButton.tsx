import "./PublishButton.css"
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';



const PublishButton: React.FC<{onClick: () => void}> = ({ onClick}) => {
    return (
        <div>
            <Popup trigger={<button onClick={onClick} id="publishButton">
                Publish</button>} position='bottom center'>
                <div className="popUp">Game successfully added!</div>
            </Popup>
        </div>
    ); 
}

export default PublishButton;
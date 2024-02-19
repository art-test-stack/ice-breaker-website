import { useNavigate } from 'react-router-dom';
import './GoBack.css'

const GoBack: React.FC<{onClick: () => void}> = ({ onClick}) => {
    const navigate = useNavigate()
    const goBackClick = () => {
        navigate ('/');//change here to make dynamic later
    }
    return (
        <div>
        <button onClick={goBackClick} id="goBack" >
            <img src='src/assets/left-arrow.svg' id='arrow' />
            <span style={{ display: 'inline-block' }}>GO BACK</span>
            </button>
    </div>
    ); 
}

export default GoBack;
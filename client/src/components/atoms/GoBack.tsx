
import './GoBack.css'

const GoBack: React.FC<{onClick: () => void}> = ({ onClick}) => {
    return (
        <div>
        <button onClick={onClick} id="goBack" >
            <img src='src/assets/left-arrow.svg' id='arrow' />
            <span style={{ display: 'inline-block' }}>GO BACK</span>
            </button>
    </div>
    ); 
}

export default GoBack;
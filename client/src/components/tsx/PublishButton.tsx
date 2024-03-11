import { useContext } from "react";
import "../css/PublishButton.css"
import { currentUserData } from "../../firebase/auth";

const PublishButton: React.FC<{onClick: () => void}> = ({ onClick}) => {
    const userData = useContext(currentUserData);
    return (
        <div>
        <button onClick={onClick} id="publishButton" className={userData ? "" : "publishButtonDisabled"} data-cy="publishButton">
            <span style={{ display: 'inline-block' }}>Publish</span>
        </button>
    </div>
    ); 
}

export default PublishButton;
import '../css/DeleteGameButton.css'
import { currentUserData } from "../../firebase/auth"
import { useNavigate, useLocation } from 'react-router-dom'
import { ref, remove, getDatabase } from 'firebase/database'
// import { useContext } from 'react'


const DeleteGameButton: React.FC<{onClick: () => void}> = ({onClick}) => {
    const navigate = useNavigate()
    const path = useLocation().pathname // url of page
    const db = getDatabase()    // gets the database
    const dbRef = ref(db, path) // makes database reference for game

    // if delete button is clicked, the game is deleted from database 
    // and we return to homepage
    const clicked = () => {
        
        const del = confirm('Are you sure you want to delete this game?\nThis action is permanent.')
        if(del){
            remove(dbRef).then(() => console.log('Deleted'))    // removes reference from database
            .catch((error) => console.log('Error occured when deleting: ' + error.message)) // catches error if not deleted
            navigate ('/') // navigates back to home when game is deleted
        }
    }

    // if author of game is user or admin -> button shows
    // user.key = game.creator or user.key = userData.key.moderator
    
    var canDelete = false
    return (
        <div>
            <button onClick={clicked} id='deleteGameButton' className={canDelete ? 'hide': ''}>
                <span>Delete Game</span>
            </button>
        </div>
    ); 
}

export default DeleteGameButton
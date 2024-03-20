import '../css/DeleteGameButton.css'
import { currentUserData } from "../../firebase/auth"
import { useNavigate, useLocation } from 'react-router-dom'
import { ref, remove, getDatabase, onValue} from 'firebase/database'
import { useContext } from 'react'


const DeleteGameButton: React.FC<{onClick: () => void}> = () => {
    const navigate = useNavigate()

    // game info
    const path = useLocation().pathname /* /games/gameID */
    const db = getDatabase()    
    const dbRef = ref(db, path)

    // user info
    const userData = useContext(currentUserData)
    const userID = userData?.user?.uid
    const moderator = userData?.data?.moderator

    // checks if user is game creator or admin -> button show/hidden
    let canDelete = false
    let creator
    onValue(dbRef, (snapshot) => {
        const data = snapshot.val()
        creator = data.creator
    })

    if (moderator || (userData && userID == creator)) {
        canDelete = true
    }

    // if button is clicked, game is deleted from database 
    // return to homepage
    const clicked = () => {
        const del = confirm('Are you sure you want to delete this game?\nThis action is permanent.')
        if(del){
            remove(dbRef).then(() => console.log('Deleted'))    // removes reference from database
            .catch((error) => console.log('Error occured when deleting: ' + error.message)) // catches error if cant delete
            navigate ('/') // navigates back to home when game is deleted
        }
    }

    return (
        <div>
            <button onClick={clicked} id='deleteGameButton' className={canDelete? '': 'hide'}>
                <span>Delete Game</span>
            </button>
        </div>
    ); 
}

export default DeleteGameButton
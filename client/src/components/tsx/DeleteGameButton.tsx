import '../css/DeleteGameButton.css'
import { currentUserData } from "../../firebase/auth"
import { useNavigate, useLocation } from 'react-router-dom'
import { ref, remove, getDatabase } from 'firebase/database'
// import { useContext } from 'react'

function showButton(){
    // if user or admin logged in
    // if user made the game -> should be able to delete game

}

const DeleteGameButton: React.FC<{onClick: () => void}> = ({onClick}) => {
    const navigate = useNavigate()
    const path = useLocation().pathname // url of page
    const db = getDatabase()    // gets the database
    const dbRef = ref(db, path) // makes database reference for game page
    const clicked = () => {
        var del = confirm('Are you sure you want to delete this game?')
        if(del){
            remove(dbRef).then(() => console.log('Deleted'))    // removes reference from database
            .catch((error) => console.log('Error occured when deleting: ' + error.message)) // catches error if not deleted
            navigate ('/') // navigates back to home
        }
    }
    return (
        <div>
            <button onClick={clicked} id='deleteGameButton'>
                <span>Delete Game</span>
            </button>
        </div>
    ); 
}

export default DeleteGameButton
import '../css/DeleteGameButton.css'
import * as React from 'react'
import { currentUserData } from "../../firebase/auth"
import { getGame, currentGamesList } from '../../firebase/gameprovider'
import { useNavigate, useLocation } from 'react-router-dom'
import { push, ref } from 'firebase/database'
import { database } from '../../firebase/init'
import { BorderLeft } from '@mui/icons-material'

const DeleteGameButton: React.FC<{onClick: () => void}> = ({onClick}) => {
    const navigate = useNavigate()
    const clicked = () => {
        var del = confirm('Are you sure you want to delete this game?')
        if(del){
            console.log('deleted')
            // find game from the firebase

            // delete game from the firebase
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
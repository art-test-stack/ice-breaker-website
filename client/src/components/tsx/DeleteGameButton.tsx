import '../css/DeleteGameButton.css'
import * as React from 'react'
import Button from '@mui/material/Button'
import DeleteIcon from '@mui/icons-material/Delete'
import SendIcon from '@mui/icons-material/Send'
import Stack from '@mui/material/Stack'
import { currentUserData } from "../../firebase/auth"
import { useNavigate } from 'react-router-dom'

const DeleteGameButton: React.FC<{onClick: () => void}> = ({onClick}) => {
    const navigate = useNavigate()
    
    const clicked = () => {
        var del = confirm('Are you sure you want to delete this game?')
        if(del){
            console.log('deleted')
            navigate ('/') // navigates back to home
        }
    }
    return (
        <div>
        <Button onClick={clicked} variant="outlined" startIcon={<DeleteIcon />} color='error' size='large' id="deleteGameButton">
        Delete game
        </Button>
    </div>
    ); 
}

export default DeleteGameButton;
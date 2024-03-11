import { currentUserData } from "../../firebase/auth"
import { useNavigate, useLocation } from 'react-router-dom'
import { createContext, useContext, useState } from 'react'

/*TODO:
- check if user is logged in -> show hearts button
- if clicked: show lists of favourites form database
*/
const Favourites = () => {

    const handleClick = () => {
        console.log('favourites clicked')
    }

    return (
        <button id="addButtonEquipment" onClick={handleClick} style={{marginTop: '10px'}}>
            <img src='src/assets/favorite-svgrepo-com.svg'/>
        </button>
    );
}

export default Favourites

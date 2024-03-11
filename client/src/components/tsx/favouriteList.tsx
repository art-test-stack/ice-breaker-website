import { currentUserData } from "../../firebase/auth"
// import { useNavigate, useLocation } from 'react-router-dom'
import { useContext } from 'react'
import { getDatabase, ref, onValue } from "firebase/database"
import '../css/FavouriteList.css'

/*TODO:
- check if user is logged in -> show hearts button
- if clicked -> show lists of favourites from database (same format as search)
*/

const Favourites = () => {
    // path info
    const db = getDatabase()
    const dbRef = ref(db, '/')

    // user info
    const userData = useContext(currentUserData)
    const userID = userData?.user?.uid

    // if logged in, show heart
    let displayHeart = false
    if(userData){
        displayHeart = true
    }

    const handleClick = () => {
        console.log('favourites clicked')
        console.log(userData)
    }

    return (
        <button id="addButtonEquipment" onClick={handleClick} style={{marginTop: '10px'}} className={displayHeart? '': 'hideHeart'}>
            <img src='src/assets/favorite-svgrepo-com.svg'/>
        </button>
    );
}

export default Favourites

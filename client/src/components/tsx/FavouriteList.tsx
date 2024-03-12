import { getDatabase, onValue, ref } from "firebase/database"
// import { useContext } from 'react-router-dom'
import { useContext } from 'react'
import { currentUserData } from "../../firebase/auth"
import '../css/FavouriteList.css'
import { useSearch } from "./Search"


const Favourites = () => {
    const {filters, setFilters}: any = useSearch();
    // user info
    const userData = useContext(currentUserData)

    // if logged in, show heart
    let displayHeart = false
    if(userData){
        displayHeart = true
    }

    const handleClick = () => {
        console.log('favourites clicked')
        setFilters( {...filters, favourites: !filters.favourites})
    }

    return (
        <button id="addButtonEquipment" onClick={handleClick} style={{marginTop: '10px'}} className={displayHeart? '': 'hideHeart'}>
            <img src='src/assets/favorite-svgrepo-com.svg'/>
        </button>
    );
}

export default Favourites

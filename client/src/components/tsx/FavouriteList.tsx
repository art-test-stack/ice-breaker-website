import { useContext } from 'react'
import { currentUserData } from "../../firebase/auth"
import '../css/FavouriteList.css'
import { useSearch } from "./Search"


const Favourites = () => {
    const {filters, setFilters}: any = useSearch()

    // user info
    const userData = useContext(currentUserData)

    // if logged in, show heart
    let displayHeart = false
    if(userData){
        displayHeart = true
    }

    const handleClick = () => {
        console.log('favourites clicked')
        setFilters({...filters, favourites: !filters.favourites})
    }

    return (
        <div style={{display: 'flex', padding: '0px', margin: '0'}} className={displayHeart? '': 'hideHeart'}>
            
            {/* <button id="addButtonEquipment" onClick={handleClick} style={{padding: '0', margin: '0'}} className={displayHeart? '': 'hideHeart'}> */}
            <img src='src/assets/favorite-svgrepo-com.svg' onClick={handleClick}  style={{padding: '0', margin: '0', background: 'blue'}}/>
            {/* </button> */}
            <p style={{alignContent: 'center', fontFamily: 'Galindo', fontSize: 'larger', marginLeft: '10px'}}>Favourites</p>
        </div> 
    );
}

export default Favourites

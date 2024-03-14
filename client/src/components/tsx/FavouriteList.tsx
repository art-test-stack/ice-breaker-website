import { useContext } from 'react'
import { currentUserData } from "../../firebase/auth"
import '../css/FavouriteList.css'
import { useSearch } from "./Search"

let redHeart = false
const Favourites = () => {
    const {filters, setFilters}: any = useSearch()

    // user info
    const userData = useContext(currentUserData)
    // if(!userData){
    //     redHeart = false
    // }
    // if logged in, show heart
    let displayHeart = true
    if(!userData){
        displayHeart = false
        redHeart = false
    }

    const handleClick = () => {
        console.log('favourites clicked')
        redHeart  = redHeart ? false : true
        console.log('redHeart', redHeart)
        setFilters({...filters, favourites: !filters.favourites})
    }
    
    return (
        <button id='favButton'style={{display: 'flex', padding: '0px', margin: '0'}} className={displayHeart? '': 'hideHeart'} onClick={handleClick}>
            <img className={redHeart ? 'redHeart':''} src='src/assets/favorite-svgrepo-com.svg'  style={{padding: '0', marginRight: '10px'}}/>
            Favourites
        </button> 
    );
}

export default Favourites

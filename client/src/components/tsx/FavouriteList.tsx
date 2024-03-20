import { useContext } from 'react'
import { currentUserData } from "../../firebase/auth"
import '../css/FavouriteList.css'
import { useSearch } from "./Search"
import { Filter } from '@mui/icons-material'

let redHeart = false
const Favourites = () => {
    const {filters, setFilters}: any = useSearch()

    // user info
    const userData = useContext(currentUserData)
    // if(!userData){
    //     redHeart = false
    // }
    // if logged in, show heart
    let displayFavourites = true
    if(!userData){
        displayFavourites = false
        redHeart = false
    }

    const handleClick = () => {
        console.log('favourites clicked')
        redHeart  = redHeart ? false : true
        console.log('redHeart', redHeart)
        setFilters({...filters, favourites: !filters.favourites})
    }
    
    return (
        <button id='favButton'style={{display: 'flex', padding: '0px'}} className={displayFavourites? '': 'hideFavourites'} onClick={handleClick}>
            <img id="favButtonHeart" src='src/assets/heart.png'  style={{
                padding: '0',
                marginRight: '10px',
                width: "32px",
                filter: redHeart ? null : 'saturate(0%) brightness(200%)' as any,
            }}/>
            Favourites
        </button> 
    );
}

export default Favourites

import { currentUserData } from "../../firebase/auth.tsx"
import { useContext } from 'react'
import '../css/FavouriteList.css'
import { useSearch } from './Search.tsx'


/*TODO:
- check if user is logged in -> show hearts button
- if clicked -> show lists of favourites from database (same format as search)
*/

const Favourites = () => {
    const { filters, setFilters }: any = useSearch();

    const userData = useContext(currentUserData)
    // if logged in, display heart
    let displayHeart = false
    if(userData){
        displayHeart = true
    }

    const handleClick = () => {
        console.log('favourites clicked')
        // console.log(favoritesGameIds)
        setFilters( {...filters, favourites: !filters.favourites})
    }

    return (
        <button id="addButtonEquipment" onClick={handleClick} style={{marginTop: '10px'}} className={displayHeart? '': 'hideHeart'}>
            <img src='src/assets/favorite-svgrepo-com.svg'/>
        </button>
    );
}

export default Favourites

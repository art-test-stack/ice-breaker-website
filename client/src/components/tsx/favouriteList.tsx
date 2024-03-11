import { currentUserData } from "../../firebase/auth"
import { useContext } from 'react'
import { getDatabase, ref, onValue } from "firebase/database"
import '../css/FavouriteList.css'
import { useSearch } from './Search.tsx'


/*TODO:
- check if user is logged in -> show hearts button
- if clicked -> show lists of favourites from database (same format as search)
*/

const Favourites = () => {
    const { filters, setFilters }: any = useSearch();

    // user info
    const userData = useContext(currentUserData)
    const userID = userData?.user?.uid
    const favouriteGames = userData?.data?.favorites 

    // database info
    // const db = getDatabase()
    // const dbRef = ref(db, '/userData/' + userID + '/favorites')

    // if logged in, display heart
    let displayHeart = false
    if(userData){
        displayHeart = true
    }

    // gets favourite games
    // let favouriteGames : Array<string> = []
    // onValue(dbRef, (snapshot) => {
    //     snapshot.forEach((childSnapshot) => {
    //       const childKey = childSnapshot.key;
    //       favouriteGames.push(childKey)
    //     });
    // }, {
    //     onlyOnce: true
    // });

    const handleClick = () => {
        console.log('favourites clicked')
        console.log(favouriteGames)
        setFilters( {...filters, favourites: !filters.favourites})
    }

    return (
        <button id="addButtonEquipment" onClick={handleClick} style={{marginTop: '10px'}} className={displayHeart? '': 'hideHeart'}>
            <img src='src/assets/favorite-svgrepo-com.svg'/>
        </button>
    );
}

export default Favourites

import { getDatabase, onValue, ref } from "firebase/database"
// import { useContext } from 'react-router-dom'
import { useContext } from 'react'

import { currentUserData } from "../../firebase/auth"

import '../css/FavouriteList.css'

/*TODO:
- check if user is logged in -> show hearts button
- if clicked -> show lists of favourites from database (same format as search)
*/

const Favourites = () => {
    // user info
    const userData = useContext(currentUserData)
    const userID = userData?.user?.uid

    // database info
    const db = getDatabase()
    const dbRef = ref(db, '/userData/' + userID + '/favorites')

    // if logged in, show heart
    let displayHeart = false
    if(userData){
        displayHeart = true
    }

    // gets favourite games
    let favouriteGames = []
    onValue(dbRef, (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          const childKey = childSnapshot.key;
          favouriteGames.push(childKey)
        });
    }, {
        onlyOnce: true
    });

    const handleClick = () => {
        console.log('favourites clicked')
    }

    return (
        <button id="addButtonEquipment" onClick={handleClick} style={{marginTop: '10px'}} className={displayHeart? '': 'hideHeart'}>
            <img src='src/assets/favorite-svgrepo-com.svg'/>
        </button>
    );
}

export default Favourites

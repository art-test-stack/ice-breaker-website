import { useContext, useState } from 'react';
import { Button } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { push, ref, remove } from 'firebase/database';
import { database } from '../../firebase/init';
import { currentUserData } from '../../firebase/auth';
import { useLocation } from 'react-router-dom';

type saveOnPlaylistProps = {
  userDataId: any,
  gameId: string
} 
const saveOnDatabase = async ({ userDataId, gameId }: saveOnPlaylistProps) => {
  const result = await push(ref(database, 'userData/' + userDataId + '/favorites/' + gameId), "").then((res) => {
      console.log("here->", res)
      window.alert('Game added to favorite !')
      return true
  }).catch((error) => {
      console.log('Error: ', error)
      window.alert("Error adding review: " + error.message)
      return false
  })
  return result
}

const deleteFromDataBase = async ({ userDataId, gameId }: saveOnPlaylistProps) => {
  const result = await remove(ref(database, 'userData/' + userDataId + '/favorites/' + gameId)).then((res) => {
    window.alert('Game deleted from favorite !')
    return false
}).catch((error) => {
    console.log('Error: ', error)
    window.alert("Error adding review: " + error.message)
    return true
})
  return result
}


export const SaveButton = () => {
  const currentLocation = useLocation();
  const gameId = currentLocation.pathname.split("/")[2]

  const userData = useContext(currentUserData)
  const isInFavorites = userData?.data?.favorites ? (userData?.data?.favorites[gameId] ? true : false) : false
  const userId = userData?.user.uid
  
  const [gameSaved, setGameSaved] = useState(isInFavorites)
  if (gameSaved != isInFavorites) {setGameSaved(isInFavorites)}
  const handleClick = () => {
    userData ?
    (!gameSaved ? 
      saveOnDatabase({userDataId: userId, gameId: gameId}).then((res) => setGameSaved(res)) : 
      deleteFromDataBase({userDataId: userId, gameId: gameId}).then((res) => setGameSaved(res)))
      : window.alert("You must log in before adding that game to favorite")
  }
  
  const colorComp = {color: gameSaved ? "red" : "white"}
  const favoriteIcon = <FavoriteIcon style={colorComp}/>
  const buttonText = gameSaved ? "Saved" : "Save"

  return (
      <Button 
        onClick={handleClick} 
        startIcon={favoriteIcon}
        > 
          <text style={colorComp}>{buttonText}</text>
      </Button>
  );

}
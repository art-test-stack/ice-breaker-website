import { useContext, useState } from 'react';
import { Button } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { get, push, ref, remove } from 'firebase/database';
import { database } from '../../firebase/init';
import { currentUserData } from '../../firebase/auth';
import { useLocation } from 'react-router-dom';

type saveOnPlaylistProps = {
  userDataId: any,
  gameId: string
} 
const saveOnDatabase = async ({ userDataId, gameId }: saveOnPlaylistProps) => {
  await push(ref(database, 'userData/' + userDataId + '/favorites/' + gameId), "").then((res) => {
      // push reviewIDs to games.
      console.log("here->", res)
      window.alert('Game added to favorite !')
      return true
  }).catch((error) => {
      console.log('Error: ', error)
      window.alert("Error adding review: " + error.message)
      return false
  })
}

const deleteFromDataBase = async ({ userDataId, gameId }: saveOnPlaylistProps) => {
  await remove(ref(database, 'userData/' + userDataId + '/favorites/' + gameId)).then((res) => {
    // push reviewIDs to games.
    console.log("here->", res)
    window.alert('Game deleted from favorite !')
    return false
}).catch((error) => {
    console.log('Error: ', error)
    window.alert("Error adding review: " + error.message)
    return true
})
}

const getIfGameIsInFavorites = async ({ userDataId, gameId }: saveOnPlaylistProps) => {
  get(ref(database, 'userData/' + userDataId + '/favorites/' + gameId)).then((res) => {
    // push reviewIDs to games.
    console.log("here->", res)
    return true
}).catch((error) => {
    console.log('Error: ', error)
    return false
})
}

export const SaveButton = () => {
  const currentLocation = useLocation();
  const gameId = currentLocation.pathname.split("/")[2]

  const userData = useContext(currentUserData)
  const userId = userData?.user?.uid

  const isGameInFavorites = getIfGameIsInFavorites({userDataId: userId, gameId: gameId})
  console.log('isGameInFavorites:', isGameInFavorites)
  const [gameSaved, setGameSaved] = useState(isGameInFavorites)
  const colorComp = {color: gameSaved ? "red" : "white"}

  const handleClick = () => {
    const gameStatus = !gameSaved ? saveOnDatabase({userDataId: userId, gameId: gameId}).then((res) => console.log('res', res)) : deleteFromDataBase({userDataId: userId, gameId: gameId}) // .then(res => setGameSaved(res))
    console.log('gameStatus', gameStatus)
    setGameSaved(gameStatus)
  }
  
  return (
    // <Fragment>
      <Button 
        onClick={handleClick} 
        startIcon={<FavoriteIcon style={colorComp}/>}
        > 
          <text style={colorComp}>Save</text>
      </Button>
  );

}
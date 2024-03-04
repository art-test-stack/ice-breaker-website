import { useContext, useState } from 'react';
import { Button } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { push, ref } from 'firebase/database';
import { database } from '../../firebase/init';
import { currentUserData } from '../../firebase/auth';
import { useLocation } from 'react-router-dom';

type saveOnPlaylistProps = {
  userId: any,
  gameId: string
} 
const saveOnDatabase = ({ userId, gameId}: saveOnPlaylistProps) => {

  console.log(gameId)
  // Push reviews to database
  push(ref(database, 'userData/' + userData?.user.uid + '/favorites/' + gameId), "").then((res) => {
      // push reviewIDs to games.
      console.log("here->", res)
      window.alert('Game added to favorite !')
  }).catch((error) => {
      console.log('Error: ', error)
      window.alert("Error adding review: " + error.message)
  })
}

const deleteFromDataBase = () => {
  window.alert("Game deleted from favorite")
}

export const SaveButton = () => {
  const [gameSaved, setGameSaved] = useState(false)
  const currentLocation = useLocation();
  const gameId = currentLocation.pathname.split("/")[2]

  const userData = useContext(currentUserData)
  const userId = userData?.data?.username
  console.log("user ->", userData?.user.uid)
  const colorComp = {color: gameSaved ? "red" : "white"}

  const handleClick = () => {
      !gameSaved ? saveOnDatabase({userId: userData, gameId: gameId}) : deleteFromDataBase()
      // window.alert(!gameSaved ? 'Game added to favorite !' : "Game deleted from favorite")
      setGameSaved(!gameSaved)
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
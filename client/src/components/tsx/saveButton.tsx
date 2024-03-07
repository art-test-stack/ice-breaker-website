import { useState } from 'react';
import { Button } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';


export const SaveButton = () => {
  const [gameSaved, setGameSaved] = useState(false)
  const colorComp = {color: gameSaved ? "red" : "white"}

  const handleClick = () => {
      window.alert(!gameSaved ? 'Game added to favorite !' : "Game deleted from favorite")
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
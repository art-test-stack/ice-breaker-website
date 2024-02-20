import { Fragment, useState } from 'react';
import { Button } from '@mui/material';
import { useSnackbar } from '@mui/base/useSnackbar';
import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import FavoriteIcon from '@mui/icons-material/Favorite';


export const SaveButton = () => {
  const [gameSaved, setGameSaved] = useState(false); 
  const [openNotification, setOpenNotification] = useState(false);

  const colorComp = {color: gameSaved ? "red" : "white"}

  const handleClose = () => {
    setOpenNotification(false);
  };

  const { getRootProps, onClickAway } = useSnackbar({
    onClose: handleClose,
    open: openNotification,
    autoHideDuration: 5000,
  });

  const handleClick = () => {
      // add here the steps after
      setGameSaved(!gameSaved)
      setOpenNotification(true) // Should be moved or deleted
      console.log('Saving...');
  }
  
  return (
    <Fragment>
      <Button 
        onClick={handleClick} 
        startIcon={<FavoriteIcon style={colorComp}/>}
        > 
          <text style={colorComp}>Save</text>
      </Button>

      {openNotification ? (
        <ClickAwayListener onClickAway={onClickAway}>
          <div>{gameSaved ? "Game saved !" : "Game unsaved"}</div>
        </ClickAwayListener>
      ) : null}
    </Fragment>
  );

}
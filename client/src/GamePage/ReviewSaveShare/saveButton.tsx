import React from 'react';
// import { Button } from '@mui/material';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import Button from '@mui/material/Button';
import { Button } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';

export class SaveButton extends React.Component  {
    handleClick = () => {
        // add here the steps after
        console.log('Saving...');
    }
  
    render() {
      return (
        <Button onClick={this.handleClick} startIcon={<FavoriteIcon/>} > 
            Share
        </Button>
      );
    }
  }
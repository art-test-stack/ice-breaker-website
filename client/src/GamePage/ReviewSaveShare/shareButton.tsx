import { Button } from '@mui/material';
import React from 'react';

export class ShareButton extends React.Component  {
    handleClick = () => {
        // add here the steps after
        console.log('Sharing...');
    }
  
    render() {
      return (
        <Button onClick={this.handleClick}>
            Share
        </Button>
      );
    }
  }
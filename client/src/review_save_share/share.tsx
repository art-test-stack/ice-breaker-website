import React from 'react';

export class ShareButton extends React.Component  {
    handleClick = () => {
        // add here the steps after
        console.log('Sharing...');
    }
  
    render() {
      return (
        <button onClick={this.handleClick}>
            Share
        </button>
      );
    }
  }
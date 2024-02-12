import React from 'react';

export class SaveButton extends React.Component  {
    handleClick = () => {
        // add here the steps after
        console.log('Saving...');
    }
  
    render() {
      return (
        <button onClick={this.handleClick}>
            Share
        </button>
      );
    }
  }
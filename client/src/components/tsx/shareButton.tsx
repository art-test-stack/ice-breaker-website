import { Button } from '@mui/material';
import IosShareIcon from '@mui/icons-material/IosShare';
import { useLocation } from 'react-router-dom';

export const ShareButton = () =>  {

  const currentLocation = useLocation();
  const handleClick = () => {
        // Create something to copy address + find format for domain 
        const url = `http://localhost:5173${currentLocation.pathname}`
        navigator.clipboard.writeText(url)
        alert('Game link copied to clipboard!')
  }

    return (
      <Button onClick={handleClick} startIcon={<IosShareIcon/>}>
          Share
      </Button>
    );
}
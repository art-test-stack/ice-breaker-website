import { Button } from '@mui/material';
import IosShareIcon from '@mui/icons-material/IosShare';
import { useLocation } from 'react-router-dom';

export const ShareButton = () =>  {

  const currentLocation = useLocation();
  const handleClick = () => {
      // Create something to copy address + find format for domain 
      console.log('Sharing game... game path:', currentLocation.pathname);
  }

    return (
      <Button onClick={handleClick} startIcon={<IosShareIcon/>}>
          Share
      </Button>
    );
}
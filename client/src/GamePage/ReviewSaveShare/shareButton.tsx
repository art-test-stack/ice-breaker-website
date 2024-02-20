import { Button } from '@mui/material';
import IosShareIcon from '@mui/icons-material/IosShare';

export const ShareButton = () =>  {

  const handleClick = () => {
      // add here the steps after
      console.log('Sharing...');
  }

    return (
      <Button onClick={handleClick} startIcon={<IosShareIcon/>}>
          Share
      </Button>
    );
}
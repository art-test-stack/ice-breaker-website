import ButtonGroup from '@mui/material/ButtonGroup';
import { ReviewButton } from './reviewButton';
import { SaveButton } from './saveButton';
import { ShareButton } from './shareButton';

export default function ReviewSaveShareButton() {
  return (
    <ButtonGroup 
      variant="contained" 
      aria-label="review-save-share"
      sx={{
        backgroundColor: '#4D6DAB',
        padding: '8px',
        borderRadius: '25px',        
        '& .MuiButtonBase-root': {
          color: '#ffffff', 
          backgroundColor: '#4D6DAB',
          borderColor: '#ffffff',
          '&:not(:last-child)': 
          { borderRight: '1px solid #ffffff', }
        },
      }}
    >
      <ReviewButton/>
      <SaveButton/>
      <ShareButton/>
    </ButtonGroup>
  );
}

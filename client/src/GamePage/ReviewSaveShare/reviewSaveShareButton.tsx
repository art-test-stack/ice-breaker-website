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
          '&:not(:last-child)': {
            borderRight: 'none',
          },
          '&:first-child': {
            borderTopLeftRadius: '25px',
            borderBottomLeftRadius: '25px',
          },
          '&:last-child': {
            borderTopRightRadius: '25px',
            borderBottomRightRadius: '25px', 
          },
          '&:hover': {
            backgroundColor: '#b4bfed',
            color: '#4D6DAB',
          },
        },
      }}
    >
      <ReviewButton/>
      <SaveButton/>
      <ShareButton/>
    </ButtonGroup>
  );
}

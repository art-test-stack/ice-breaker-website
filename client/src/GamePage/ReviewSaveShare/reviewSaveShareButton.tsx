import ButtonGroup from '@mui/material/ButtonGroup';
import { ReviewButton } from './reviewButton';
import { SaveButton } from './saveButton';
import { ShareButton } from './shareButton';


export default function ReviewSaveShareButton() {
    return (
      <ButtonGroup 
        variant="contained" 
        aria-label="review-save-share"
        border-radius={'50%'}
        >
            <ReviewButton/>
            <SaveButton/>
            <ShareButton/>
      </ButtonGroup>
    );
  }
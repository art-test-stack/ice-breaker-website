import ButtonGroup from '@mui/material/ButtonGroup';
import { ReviewGame } from './reviewButton';
import { SaveButton } from './saveButton';
import { ShareButton } from './shareButton';


export default function ReviewSaveShareButton() {
    return (
      <ButtonGroup 
        variant="contained" 
        aria-label="review-save-share"
        border-radius={'50%'}
        >
            <ReviewGame/>
            <SaveButton/>
            <ShareButton/>
      </ButtonGroup>
    );
  }
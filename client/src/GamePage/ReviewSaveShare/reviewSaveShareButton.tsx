import ButtonGroup from '@mui/material/ButtonGroup';
import { ReviewGame } from './reviewButton';
import { SaveButton } from './saveButton';
import { ShareButton } from './shareButton';


export default function ReviewSaveShareButton() {
    return (
      <ButtonGroup variant="contained" aria-label="review-save-share">
            <ReviewGame/>
            <SaveButton/>
            <ShareButton/>
      </ButtonGroup>
    );
  }
import '../css/ReviewComponent.css'

// import StarBorderIcon from '@mui/icons/StarBorder';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import EditReviewIcon from './EditReviewIcon';
import Rating from '@mui/material/Rating';
import {CurrentUserDataProvider,} from '../../firebase/auth'



interface Props {
    userName: string;
    givenReview: string;
    rating: string;
}

function ReviewComponent({userName, givenReview, rating}:Props) {
    return (
        <div className="background">
            <span>
                <div className='givenRating'>
                    <Rating name="read-only" value={parseFloat(rating)} readOnly style={{color: "ffff00"}} emptyIcon={<StarBorderIcon style={{ color:'white'}} fontSize="inherit" />} />
                </div>
            <div className='userName'>
                {userName}
                <CurrentUserDataProvider>
                    <EditReviewIcon userName={userName}  />
                </CurrentUserDataProvider>
            </div>
            </span>
            <div className='review'>
                {givenReview}
            </div>
        </div>
    );
  }

  export default ReviewComponent;
import './ReviewComponent.css'

import StarBorderIcon from '@material-ui/icons/StarBorder';
import Rating from '@mui/material/Rating';

interface Props {
    userName: string;
    givenReview: string;
    rating: string;
}

function ReviewComponent({userName, givenReview, rating}:Props) {
    console.log(userName, givenReview, rating);
    return (
        
        <div className="background">
            <span>
                <div className='givenRating'>
                    <Rating name="read-only" value={rating} readOnly style={{color: "ffff00"}} emptyIcon={<StarBorderIcon style={{ color:'white'}} fontSize="inherit" />} />
                </div>
            <div className='userName'>
                {userName}
            </div>
            </span>
            <div className='review'>
                {givenReview}
            </div>
        </div>

    );
  }

  export default ReviewComponent;
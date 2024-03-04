import './ReviewComponent.css'

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
                    <Rating name="read-only" value={parseInt(rating)} readOnly style={{color: "ffff00"}} />
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
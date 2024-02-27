import './ReviewComponent.css'

import Rating from '@mui/material/Rating';

interface Props{
    userName: string;
    givenReview: string;
    rating: number;
}

function ReviewComponent({userName, givenReview, rating}:Props) {
    return (
        
        <div className="background">
            <span>
                <div className='givenRating'>
                    <Rating name="read-only" value={rating} readOnly />
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
import './ReviewComponent.css'

import * as React from 'react';
import Rating from '@mui/material/Rating';



function ReviewComponent() {
    const [value, setValue] = React.useState<number | null>(5);

    return (
        
        <div className="background">
            <span>
                <div className='givenRating'>
                    <Rating name="read-only" value={value} readOnly />
                </div>
            <div className='userName'>
                test_username
            </div>


            </span>


            <div className='review'>
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut i ko maha
            </div>


        
        
        </div>

    );
  }

  export default ReviewComponent;
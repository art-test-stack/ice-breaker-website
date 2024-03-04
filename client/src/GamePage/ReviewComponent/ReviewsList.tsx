import { useContext } from "react";
import ReviewComponent from "./ReviewComponent";
import { currentReviewsList } from "../../firebase/reviewProvider";

interface Review {
    username: string; 
    comment: string; 
    rating: string; 
}

export default function ReviewsList() {
    const reviewsList = useContext(currentReviewsList);
    console.log(reviewsList);
    return <>
        {
            reviewsList && Object.values(reviewsList).map((review: Review, index: number) => (
                <ReviewComponent
                    key={index}
                    userName={review.username}
                    givenReview={review.comment}
                    rating={review.rating}            />
            ))
        }
    </>
}
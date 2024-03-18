import { useContext } from "react";
import ReviewComponent from "./ReviewComponent";
import { currentReviewsList } from "../../firebase/reviewProvider";

interface Review {
    username: string; 
    comment: string; 
    rating: string;
    id: string;
}

export default function ReviewsList() {
    const reviewsList = useContext(currentReviewsList);
    console.log(reviewsList)
    if (!reviewsList || reviewsList.length === 0) {
        return <i style={{color: "#aaaaaa", fontFamily: "Calibri, sans-serif", fontSize: "24px"}}> No reviews... yet...</i>
    } else {
        return <>
            {
                reviewsList.map((review: Review, index: number) => (
                    <ReviewComponent
                        key={index}
                        userName={review.username}
                        givenReview={review.comment}
                        rating={review.rating}
                        review_id={review.id}        />
                ))
            }
        </>
    }
}
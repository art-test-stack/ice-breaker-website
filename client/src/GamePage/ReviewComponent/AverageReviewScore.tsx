import { useContext } from "react";
import { currentReviewsList } from "../../firebase/reviewProvider";

interface Review {
    username: string; 
    comment: string; 
    rating: string; 
}

function AverageScore(){
    const reviewsList = useContext(currentReviewsList);
    let array_test: number[] = []
    console.log(reviewsList);
    
    reviewsList && Object.values(reviewsList).map((review: Review, index: number) => (
        array_test[index] = parseInt(review.rating)
    ))

    let getAverage = 0;
    
    for (let i = 0; i < array_test.length; i++){
        getAverage+= array_test[i];
    }
    getAverage = getAverage / array_test.length;

    return Math.round(getAverage).toFixed(2)
}


export default function AverageReviewScore() {

    return <>

        <div style={{margin:'0px', fontSize:'33px', display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
            {AverageScore()}
            <img src="/src/assets/star.svg" style={{margin:'0px', marginLeft:'5px'}} />
        </div>
    </>
}
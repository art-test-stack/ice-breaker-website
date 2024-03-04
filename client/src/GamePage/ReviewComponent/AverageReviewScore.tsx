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
   
    
    reviewsList && Object.values(reviewsList).map((review: Review, index: number) => (
        array_test[index] = parseInt(review.rating)
    ))

    let getAverage = 0;
    
    for (let i = 0; i < array_test.length; i++){
        getAverage+= array_test[i];
    }
    getAverage = getAverage / array_test.length;

    return array_test.length > 0 ? Math.round(getAverage).toFixed(2) : 'No reviews yet'
    
}


export default function AverageReviewScore() {

    return <>

        <div style={{margin:'0px', fontSize:'26px', display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
            {AverageScore()}
            <img src="/src/assets/star.svg" style={{margin:'0px', marginLeft:'5px'}} />
        </div>
    </>
}
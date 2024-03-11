import GameInfo from "./components/tsx/GameInfo"
import GameDescription from "./components/tsx/GameDescription"
import './components/css/GamePage.css'
import ReviewSaveShareButton from "./components/tsx/reviewSaveShareButton";
import ReviewsList from "./components/tsx/ReviewsList";
import { CurrentGameReviewsProvider } from "./firebase/reviewProvider";
import { useContext } from "react";
import { currentReviewsList } from "./firebase/reviewProvider";
import AverageReviewScore, { averageScore } from "./components/tsx/AverageReviewScore";
import Timer from "./components/tsx/Timer"


interface Props{
    title: string;
    gameText: string;
    numPlayers: string;
    duration: string;
    equipments: string[];
    categories: string;
    author: string;
    gameId: string;
}
interface Review {
    username: string; 
    comment: string; 
    rating: string; 
}



function GameDescriptionAndAdditionalInfo({title, gameText, numPlayers, duration, equipments, categories, author, gameId}: Props) {

 

    return ( 
        <>
        <div className="GamePageWrap">
            <div className="GamePage">
                <GameDescription title={title} gameText={gameText}/> 
                <CurrentGameReviewsProvider gameId={gameId}>  
                <div className="reviewScoresSpan" data-cy="greviewScoresSpan">
                    <div style={{fontSize:'30px', fontWeight:'bold'}}>Reviews</div>  
                    <div className="averageReviewScore">
                    <AverageReviewScore score={null}/>
                    </div>
                    
                </div>

                <ul className="everyReview" data-cy="everyReview">
                    <ReviewsList/>
                </ul>

                                
                </CurrentGameReviewsProvider>
            </div>
     
            <div className="Right-Section-GameInfo">
                <GameInfo numPlayers={numPlayers} duration={duration} equipments={equipments} categories={categories} author={author}/>
                <ReviewSaveShareButton/>  
                <div className="Timer-box" data-cy="Timer-box">
                    <Timer />
                </div>
            </div>
            
        </div>
        </>    
    );
}

export default GameDescriptionAndAdditionalInfo;
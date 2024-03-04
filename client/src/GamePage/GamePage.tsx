import GameInfo from "../GameInfo/GameInfo"
import GameDescription from "../GameDescription/GameDescription"
import './GamePage.css'
import ReviewSaveShareButton from "./ReviewSaveShare/reviewSaveShareButton";
import ReviewComponent from "./ReviewComponent/ReviewComponent";

interface Props{
    title: string;
    gameText: string;
    numPlayers: string;
    duration: string;
    equipments: string[];
    categories: string;
    author: string;
}

function GameDescriptionAndAdditionalInfo({title, gameText, numPlayers, duration, equipments, categories, author}: Props) {
    const userNames = ['Test_user1', 'Test_user2', 'Test_user3'];
    const review = ['Lorem ipsum', 
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', 
    '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."'];

    return ( 
        <>
        <div className="GamePageWrap">
            <div className="GamePage">
                <GameDescription title={title} gameText={gameText}/>
                <ul className="everyReview">
                <h2>Reviews</h2>
                    {userNames.map((name, index) => (
                    <ReviewComponent key={name} userName={name} givenReview={review[index]} rating={index+2}/>
                    ))}
                </ul>     

            </div>
            <div className="Right-Section-GameInfo">
                <GameInfo numPlayers={numPlayers} duration={duration} equipments={equipments} categories={categories} author={author}/>
                <ReviewSaveShareButton/>  
            </div>
            
        </div>
        </>    
    );
}

export default GameDescriptionAndAdditionalInfo;
import GameInfo from "../GameInfo/GameInfo"
import GameDescription from "../GameDescription/GameDescription"
import './GamePage.css'
import ReviewSaveShareButton from "./ReviewSaveShare/reviewSaveShareButton";

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
    return (
        <>
        <div className="GamePage">
            <GameDescription title={title} gameText={gameText}/>
            <GameInfo numPlayers={numPlayers} duration={duration} equipments={equipments} categories={categories} author={author}/>
        </div>
        <ReviewSaveShareButton/>

        </>
    );
}

export default GameDescriptionAndAdditionalInfo;
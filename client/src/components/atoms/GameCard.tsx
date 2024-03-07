import React from 'react';
import './GameCard.css';
import { getAverageRating } from '../../firebase/init';
import AverageReviewScore from '../../GamePage/ReviewComponent/AverageReviewScore';

interface GameCardProps {
    imgSrc: string;
    imgAlt: string;
    title: string;
    category: string;
    gameId: string;
    onClick: () => void;
}

const GameCard: React.FC<GameCardProps> = ({ imgSrc, imgAlt, title, category, gameId, onClick }) => {

    let [rating, setRating] = React.useState("...");

    getAverageRating({gameId: gameId}).then((result: any) => {
        setRating(result.data.toFixed(2));
    });
    if (rating === "-1.00") {
        return (
            <div className="game-card" onClick={onClick}>
                <img src={imgSrc} alt={imgAlt} className="game-card-img" />
                <div className="game-card-textbox">
                    <h2 className="game-card-heading">{title}</h2>
                    <p className="game-card-category">{category}</p>
                </div>
            </div>
        );
    } else {
        return (
            <div className="game-card" onClick={onClick}>
                <img src={imgSrc} alt={imgAlt} className="game-card-img" />
                <div style={{width: "100%", height: 0, display: "flex", flexDirection: "row", justifyContent: "flex-end"}}>
                    <div id="rating-box">
                        <AverageReviewScore score={rating} />
                    </div>
                </div>
                <div className="game-card-textbox">
                    <h2 className="game-card-heading">{title}</h2>
                    <p className="game-card-category">{category}</p>
                </div>
            </div>
        );
    }
};

export default GameCard;

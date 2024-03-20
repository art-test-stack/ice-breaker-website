import React, { useContext } from 'react';

import { currentUserData } from '../../firebase/auth';
import { getAverageRating } from '../../firebase/init';
import AverageReviewScore from './AverageReviewScore';

import '../css/FavouriteList.css'
import '../css/GameCard.css';

interface GameCardProps {
    imgSrc: string;
    imgAlt: string;
    title: string;
    category: string;
    gameId: string;
    onClick: () => void;
style: React.CSSProperties;
}

let rating_cache: any = {};

const GameCard: React.FC<GameCardProps> = ({ imgSrc, imgAlt, title, category, gameId, style, onClick }) => {
    
    const userData = useContext(currentUserData);
    const favoriteGames = Object.keys((userData?.data as any)?.favorites ?? {});

    const favIconPath = "src/assets/heart.png"

    let isFavorite = favoriteGames.includes(gameId);
    

    let [rating, setRating] = React.useState("...");
    if (rating_cache[gameId]) {
        rating = rating_cache[gameId];
    } else {
        getAverageRating({gameId: gameId}).then((result: any) => {
            setRating(result.data.toFixed(1));
            rating_cache[gameId] = result.data.toFixed(1);
        });
    }
    if (rating === "-1.0") {
        return (
            <div className="game-card" onClick={onClick} style={style} data-cy="game-card">
                <img src={imgSrc} alt={imgAlt} className="game-card-img" />
                {isFavorite ? (
                    <div className="redHeartIconBox">
                        <img src={favIconPath} className="redHeartIcon" />
                    </div>
                ) : null}
                <div className="game-card-textbox">
                    <h2 className="game-card-heading">{title}</h2>
                    <p className="game-card-category" data-cy="gameCardCategory">{category}</p>
                </div>
            </div>
        );
    } else {
        return (
            <div className="game-card" onClick={onClick} style={style}>
                <img src={imgSrc} alt={imgAlt} className="game-card-img" />
                {isFavorite ? (
                    <div className="redHeartIconBox">
                        <img src={favIconPath} className="redHeartIcon" />
                    </div>
                ) : null}
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

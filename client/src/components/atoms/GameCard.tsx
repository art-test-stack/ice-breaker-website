import React from 'react';

import './GameCard.css';
import './FavoriteButton.css';
import FavoriteButton from './FavoriteButton';

interface GameCardProps {
    imgSrc: string;
    imgAlt: string;
    title: string;
    category: string;
    onClick: () => void;
}

const GameCard: React.FC<GameCardProps> = ({ imgSrc, imgAlt, title, category, onClick }) => {
    return (
        <div className="game-card" onClick={onClick}>
            <img src={imgSrc} alt={imgAlt} className="game-card-img" />
            <FavoriteButton></FavoriteButton>
            {/* <button className="favorite-button"> Favorite </button> */}
            <div className="game-card-textbox">
                <h2 className="game-card-heading">{title}</h2>
                <p className="game-card-category">{category}</p>
            </div>
        </div>
    );
};

export default GameCard;

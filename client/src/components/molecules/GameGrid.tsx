import React from 'react';
import GameCard from '../atoms/GameCard'; 
import './GameGrid.css';
import cardImage from '../../assets/cards.webp'

interface GameGridProps {
    games: {
        imgSrc: string;
        imgAlt: string;
        title: string;
        category: string;
    }[];
}

const GameGrid: React.FC<GameGridProps> = ({ games }) => {
    return (
        <div className="game-grid">
            {games.map((game, index) => (
                <GameCard
                    key={index}
                    imgSrc={cardImage}
                    imgAlt={game.imgAlt}
                    title={game.title}
                    category={game.category}
                    onClick={() => console.log(`Clicked on ${game.title}`)} //displays in console which game you've clicked on
                />
            ))}
        </div>
    );
};

export default GameGrid;

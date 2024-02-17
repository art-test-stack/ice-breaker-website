import React from 'react';
import GameCard from '../atoms/GameCard'; 
import './GameGrid.css';
import cardImage from '../../assets/cards.webp'
// @ts-ignore
import { useNavigate } from 'react-router-dom';

interface GameGridProps {
    games: {
        imgSrc: string;
        imgAlt: string;
        title: string;
        category: string;
    }[];
}

const GameGrid: React.FC<GameGridProps> = ({ games }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate ('/games');//change here to make dynamic later
    }
    return (
        <div className="game-grid">
            {games.map((game, index) => (
                <GameCard
                    key={index}
                    imgSrc={cardImage}
                    imgAlt={game.imgAlt}
                    title={game.title}
                    category={game.category}
                    onClick={() => {
                        handleClick(),
                        console.log(`Clicked on ${game.title}`);
                    }} 
                />
            ))}
        </div>
    );
};

export default GameGrid;

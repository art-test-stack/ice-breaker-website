import React from 'react';
import GameCard from '../atoms/GameCard'; 
import './GameGrid.css';
import cardImage from '../../assets/cards.webp'
import { useSearch } from '../../SearchBar/Search';
// @ts-ignore
import { useNavigate } from 'react-router-dom';


export interface GameGridProps {
    games: {
        imgSrc: string;
        imgAlt: string;
        title: string;
        category: string;
    }[];
}

const hardCodedGames: GameGridProps = {
    games: [
        {
        imgSrc: './assets/cards.webp',
        imgAlt: 'Image 1',
        title: 'Game 1',
        category: 'Action',
        },
        {
        imgSrc: 'image2.jpg',
        imgAlt: 'Image 2',
        title: 'Game 2',
        category: 'Card',
        },
        {
        imgSrc: 'image3.jpg',
        imgAlt: 'Image 3',
        title: 'Game 3',
        category: 'Adventure',
        },
        {
        imgSrc: 'image3.jpg',
        imgAlt: 'Image 4',
        title: 'Game 4',
        category: 'Adventure',
        }
    ]}

const searchKeys = ['imgAlt', 'title', 'category']

const GameGrid: React.FC<GameGridProps> = () => {
    const navigate = useNavigate()
    const handleClick = () => {
        navigate ('/games');//change here to make dynamic later
    }
    const { searchQuery }: any = useSearch();
    const filteredGames = searchQuery ? { games: hardCodedGames.games.filter((game) => {
        for (const key in searchKeys) {
            if (game[searchKeys[key]].toLowerCase().includes(searchQuery.toLowerCase())) {
                return true;
            }
        };
        return false;
    })} : hardCodedGames

    return (
        <div className="game-grid">
            {filteredGames.games.map((game, index) => (
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

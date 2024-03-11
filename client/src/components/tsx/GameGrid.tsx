import React, { useContext } from 'react';
import GameCard from './GameCard'; 
import '../css/GameGrid.css';
import { useSearch } from './Search';
// @ts-ignore
import { useNavigate } from 'react-router-dom';
import { currentGamesList } from '../../firebase/gameprovider';
import { categories, getCategoryList } from '../../App';


export interface GameGridProps {
    games: {
        imgSrc: string;
        imgAlt: string;
        title: string;
        category: string;
    }[];
}

const searchKeys = ['name', 'aliases']

const GameGrid: React.FC<GameGridProps> = () => {
    const navigate = useNavigate()
    const handleClick = (id: string) => {
        navigate(`/games/${id}`)
    }
    const { filters }: any = useSearch();
    const gamesList = useContext(currentGamesList);
    
    const filteredOnCategoryGames = filters?.categories.length > 0 ? Object.entries(gamesList).filter((game: any) => {
            return game[1].categories && filters?.categories.every((e: any) => categories.filter((c, i) => game[1].categories[i]).includes(e))
    }) : Object.entries(gamesList)

    const filteredGames = filters?.searchQuery ? filteredOnCategoryGames.filter((game: any) => {
        const gameKeys = searchKeys.filter(key => Object.keys(game[1]).includes(key))
        for (const gameKey in gameKeys) {
            if (JSON.stringify(game[1][gameKeys[gameKey]]).toLowerCase().includes(filters?.searchQuery.toLowerCase())) {
                return true;
            }
        };
        return false;
    }) : filteredOnCategoryGames

    return (
        <div className="game-grid">
            {filteredGames.map((game, index) => (
                <GameCard
                    key={index}
                    imgSrc={'./src/assets/cards.webp'} // this is not currently from the database
                    imgAlt={'Image 2'}
                    title={game[1].name}
                    category={getCategoryList(game[1].categories).join(', ')}
                    onClick={() => {
                        handleClick(game[0]),
                        console.log(`Clicked on ${game[1].title} (id: ${game[0]})`);
                    }} 
                    gameId={game[0]}
                />
            ))}
        </div>
    );
};

export default GameGrid;
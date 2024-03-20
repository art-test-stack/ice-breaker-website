import React, { useContext } from 'react';
import GameCard from './GameCard'; 
import '../css/GameGrid.css';
import { useSearch } from './Search';
// @ts-ignore
import { useNavigate } from 'react-router-dom';
import { currentGamesList } from '../../firebase/gameprovider';
import { categories, getCategoryList } from '../../App';
import { currentUserData } from '../../firebase/auth';


export interface GameGridProps {
    games: {
        imgSrc: string;
        imgAlt: string;
        title: string;
        category: string;
    }[];
}

const searchKeys = ['name', 'aliases']

const gameImgs: any = { 
    'Active': './src/assets/active.webp', 
    'Card Game': './src/assets/cards.webp', 
    'Chill': './src/assets/chill.webp', 
    'Indoor': './src/assets/indoor.webp', 
    'Outdoor': './src/assets/outdoor.webp', 
    'Team Building': './src/assets/teambuilding.webp', 
}

export const getGameCardImg = (game: any) => {
    const gameCategories = getCategoryList(game.categories)
    // choose num based on game name
    const num = game.name.split('').reduce((acc: number, char: string) => acc + char.charCodeAt(0) * 2, 0)
    const randomIndex = num % gameCategories.length

    return gameCategories.length > 0 ? gameImgs[gameCategories[randomIndex]] : gameImgs['Card Game']
}

const GameGrid: React.FC<GameGridProps> = () => {
    const navigate = useNavigate()
    const handleClick = (id: string) => {
        navigate(`/games/${id}`)
    }
    const { filters }: any = useSearch();
    const gamesList = useContext(currentGamesList);
    
    // favourites
    const userData = useContext(currentUserData)
    const favouriteGames = userData?.data?.favorites
    const favoritesGameIds = favouriteGames ? Object.keys(favouriteGames) : []
    // console.log(favoritesGameIds)
    const filterFavourite = filters.favourites ? Object.entries(gamesList).filter((game: any) => {
        // console.log('hello', favoritesGameIds.includes(game[0]))
        // console.log('gqameinfo', game[0])
        return favoritesGameIds.includes(game[0]) 
    }) : Object.entries(gamesList)
    
    const filteredOnCategoryGames = filters?.categories.length > 0 ? filterFavourite.filter((game: any) => {
            return game[1].categories && filters?.categories.every((e: any) => categories.filter((c, i) => game[1].categories[i]).includes(e))
    }) : filterFavourite

    let filteredGames = filters?.searchQuery ? filteredOnCategoryGames.filter((game: any) => {
        const gameKeys = searchKeys.filter(key => Object.keys(game[1]).includes(key))
        for (const gameKey in gameKeys) {
            if (JSON.stringify(game[1][gameKeys[gameKey]]).toLowerCase().includes(filters?.searchQuery.toLowerCase())) {
                return true;
            }
        };
        return false;
    }) : filteredOnCategoryGames

    // sort by number of reviews
    filteredGames = filteredGames.sort((a: any, b: any) => {
        if (a[1].reviewIDs && b[1].reviewIDs) {
            return Object.keys(b[1].reviewIDs).length - Object.keys(a[1].reviewIDs).length
        } else if (a[1].reviewIDs) {
            return -1
        } else if (b[1].reviewIDs) {
            return 1
        } else {
            return 0
        }
    })

    return (
        <div className="game-grid" data-cy="game-grid">
            {filteredGames.map((game, index) => (
                <GameCard
                    key={index}
                    imgSrc={getGameCardImg(game[1])}
                    imgAlt={'Image 2'}
                    title={game[1].name}
                    category={getCategoryList(game[1].categories).join(', ')}
                    onClick={() => {
                        handleClick(game[0]),
                        console.log(`Clicked on ${game[1].title} (id: ${game[0]})`);
                    }} 
                    gameId={game[0]}
                    style={{}}
                />
            ))}
        </div>
    );
};

export default GameGrid;
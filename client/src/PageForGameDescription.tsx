

import React, { useContext, useEffect, useState } from 'react';
import LoginMenu from './components/tsx/LoginMenu.tsx';
import { Search, SearchProvider } from './components/tsx/Search.tsx';
import { Title } from './components/tsx/Title.tsx';
import GoBack from "./components/tsx/GoBack.tsx";
import { CurrentUserDataProvider } from "./firebase/auth.tsx";
import GamePage from "./GamePage.tsx"
import './App.css'
import { getGame } from './firebase/gameprovider.tsx';
import { useParams } from 'react-router-dom';
import { get, onValue } from 'firebase/database';
import { darkTheme, durations, getCategoryList } from './App.tsx';
import { ThemeProvider } from '@mui/material/styles';
import DeleteGameButton from "./components/tsx/DeleteGameButton";

function PageForGameDescription(){

    const { gameId } = useParams();
    const [game, setGame] = useState<any | null>(null);

    useEffect(() => {
        const gameRef = getGame(gameId as string);
        onValue(gameRef, (snapshot) => {
            const data = snapshot.val();
            setGame(data);
        });

    }, [gameId]);

    if (!game) {
        return <div>Loading...</div>;
    }
    return (

        <>
        <CurrentUserDataProvider>
        
        <SearchProvider> 
              <div id='header'> 
        <div id='titleContainer'>
          <Title/>
        </div>
        <div id='searchContainer'>
          <Search/>
        </div>
        <div id='loginContainer'>
        <ThemeProvider theme={darkTheme}>
            <LoginMenu/>
            </ThemeProvider>
        </div>
        </div>
        <div className ="gameSectionHeader">
        <GoBack onClick={() => {
                    console.log('go back button clicked');
                }}/>
        <DeleteGameButton onClick={() => {
            console.log('delete game button clicked')
        }}/>
      </div>
      
      
        <GamePage 
              title={game.name} 
              gameText={game.description} 
              numPlayers={game.minPlayers.toString() + (game.maxPlayers == 21 ? " or more" : `-${game.maxPlayers}`)}
              duration={durations[game.duration]} 
              equipments={game.equipment ?? []} 
              categories={getCategoryList(game.categories).join(", ")}
              author={game.creator}
              gameId={gameId ?? ""}
              aliases={game.aliases ?? []}/>

        </SearchProvider>
        </CurrentUserDataProvider>
        </>         
    )
}

export default PageForGameDescription
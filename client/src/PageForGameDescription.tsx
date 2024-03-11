

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


function PageForGameDescription(){
    // const gameExample = {
    //     title: 'GameName',
    //     description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Enim eu turpis egestas pretium aenean pharetra magna ac.',
    //     numPlayers: '1-6',
    //     duration: '1-5 hours',
    //     equipments: ['dice','timer','paper'],
    //     categories: 'dice game'

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
    // const userNames = ['Test_user1', 'Test_user2', 'Test_user3'];
    // const review = ['Lorem ipsum', 
    // 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', 
    // '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."'];


    return (

        <>
        <CurrentUserDataProvider>
        
        <SearchProvider> {/* NOTE: make no sense to let that here isnt it? Shouldnt we remove the search bar in gamepage?*/}
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
    
    {/*everyReview css is located in App.css, */}

        </SearchProvider>
        </CurrentUserDataProvider>
        </>         
    )
}

export default PageForGameDescription
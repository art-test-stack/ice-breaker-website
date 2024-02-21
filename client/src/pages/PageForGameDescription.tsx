

import React, { useEffect, useState } from 'react';
import LoginMenu from '../LoginRegisterMenu/LoginMenu.tsx';
import { Search, SearchProvider } from '../SearchBar/Search.tsx';
import { Title } from '../Title/Title.tsx';
import GoBack from "../components/atoms/GoBack";
import { CurrentUserDataProvider } from "../firebase/auth.tsx";
import GamePage from "../GamePage/GamePage"
import '../App.css'
import { getGame } from '../firebase/gameprovider.tsx';
import { useParams } from 'react-router-dom';
import { get, onValue } from 'firebase/database';
import { durations, getCategoryList } from '../App.tsx';

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

    return (
        <>
        <SearchProvider>
              <div id='header'> 
        <div id='titleContainer'>
          <Title/>
        </div>
        <div id='searchContainer'>
          <Search/>
        </div>
        <div id='loginContainer'>
          <CurrentUserDataProvider>
            <LoginMenu />
          </CurrentUserDataProvider>
        </div>
        {/* <div><LoginButton /></div> */}
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
              author={game.creator}/>
        </SearchProvider>
        </>   
    )
}

export default PageForGameDescription
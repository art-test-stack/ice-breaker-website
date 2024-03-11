import React from 'react';
import { useNavigate } from 'react-router-dom';

import { CategoryDropdown } from './components/tsx/CategoryDropdown.tsx';
import CreateGameButton from "./components/tsx/CreateGameButton.tsx";
import Favourites from './components/tsx/FavouriteList.tsx';
import GameGrid from './components/tsx/GameGrid.tsx';
import LoginMenu from './components/tsx/LoginMenu.tsx';
import { Search, SearchProvider } from './components/tsx/Search.tsx';
import { Title } from './components/tsx/Title.tsx';
import { AuthUI, CurrentUserDataProvider } from "./firebase/auth.tsx";
import { CurrentGamesProvider } from './firebase/gameprovider.tsx';

import './App.css';

function HomePage() {
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

            <div id='favouriteAndLogIn'>
                    <CurrentUserDataProvider>
                <div id='favouriteContainer'>
                    <Favourites/>
                </div>
                <div id='loginContainer'>
                    <LoginMenu />
                </div>
                    </CurrentUserDataProvider>
            </div>

            {/* <div><LoginButton /></div> */}
            </div>
            <div className ="gameSectionHeader">
            <CategoryDropdown />
            <CreateGameButton onClick={() => {
                            console.log('create game button clicked');
                        }}/>
            </div>
            <div className ="gameSection">
                
                <CurrentGamesProvider>
                    <GameGrid games={[]}/>
                </CurrentGamesProvider>
                
            </div>
        </SearchProvider>
    </>
  );
}


export default HomePage;

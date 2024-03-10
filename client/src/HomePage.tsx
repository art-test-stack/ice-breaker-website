import React from 'react';
import { Search, SearchProvider } from './components/tsx/Search.tsx';
import LoginMenu from './components/tsx/LoginMenu.tsx';
import { Title } from './components/tsx/Title.tsx';
import { CategoryDropdown } from './components/tsx/CategoryDropdown.tsx';
import { AuthUI, CurrentUserDataProvider } from "./firebase/auth.tsx";
import GameGrid from './components/tsx/GameGrid.tsx';
import CreateGameButton from "./components/tsx/CreateGameButton.tsx";
import { useNavigate } from 'react-router-dom';
import './App.css';
import { CurrentGamesProvider } from './firebase/gameprovider.tsx';
import Favourites from './components/tsx/favouriteList.tsx';

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
                <div id='favouriteContainer'>
                    <Favourites/>
                </div>
                <div id='loginContainer'>
                    <CurrentUserDataProvider>
                    <LoginMenu />
                    </CurrentUserDataProvider>
                </div>
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

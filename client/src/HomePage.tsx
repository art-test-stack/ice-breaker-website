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
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { darkTheme } from './App.tsx';


import './App.css';

function HomePage() {
  return (
    <>
    <ThemeProvider theme={darkTheme}>
      <SearchProvider>
            <div id='header'> 
            <div id='titleContainer'>
                <Title/>
            </div>
            <div id='searchContainer' data-cy="search">
                    <Search/>
            </div>

            <div id='loginContainer' data-cy="login">
                <CurrentUserDataProvider>
            <div id='loginContainer'>
                <LoginMenu />
            </div>
                </CurrentUserDataProvider>

            {/* <div><LoginButton /></div> */}
            </div>
            <div className ="gameSectionHeader">
                <div className='FavAndCat'>
                    <CurrentUserDataProvider>
                        <Favourites/>
                    </CurrentUserDataProvider>
                        <CategoryDropdown />
                </div>
                <CreateGameButton onClick={() => {
                                console.log('create game button clicked');
                            }}/>
            </div>
            <div className ="gameSection">
                
                <CurrentGamesProvider>
                    <CurrentUserDataProvider>
                    <GameGrid games={[]}/>
                    </CurrentUserDataProvider>
                </CurrentGamesProvider>
                
            </div>
        </SearchProvider>
        </ThemeProvider>
    </>
  );
}


export default HomePage;

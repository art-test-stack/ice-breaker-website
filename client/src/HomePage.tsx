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

import SpinTheWheelButton from './components/tsx/SpinTheWheelButton.tsx';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import { darkTheme } from './App.tsx';


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
                <LoginMenu />
                </CurrentUserDataProvider>
            </div>
            {/* <div><LoginButton /></div> */}
            </div>
            <div className ="gameSectionHeader">
            <CategoryDropdown />
            <div style={{display: "flex", flexDirection: "row"}}>
                <SpinTheWheelButton/>
                <CreateGameButton onClick={() => {
                                console.log('create game button clicked');
                            }}/>
            </div>
            </div>
            <div className ="gameSection">
                
                <CurrentGamesProvider>
                    <GameGrid games={[]}/>
                </CurrentGamesProvider>
                
            </div>
        </SearchProvider>
        </ThemeProvider>
    </>
  );
}


export default HomePage;

import React from 'react';
import { Search, SearchProvider } from '../SearchBar/Search.tsx';
import LoginMenu from '../LoginRegisterMenu/LoginMenu.tsx';
import { Title } from '../Title/Title.tsx';
import { CategoryDropdown } from '../CategoryDropdown/CategoryDropdown.tsx';
import { AuthUI, CurrentUserDataProvider } from "../firebase/auth";
import GameGrid from '../components/molecules/GameGrid';
import CreateGameButton from "../CreateGamePage/CreateGameButton/CreateGameButton";
import { useNavigate } from 'react-router-dom';
import '../App.css';

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
          <div id='loginContainer'>
            <CurrentUserDataProvider>
              <LoginMenu />
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
            <GameGrid games={[]}/>
          </div>
        </SearchProvider>
    </>
  );
}


export default HomePage;

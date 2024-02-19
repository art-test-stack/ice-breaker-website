import LoginMenu from './LoginRegisterMenu/LoginMenu.tsx';
import { Search, SearchProvider } from './SearchBar/Search.tsx';
import { Title } from './Title/Title.tsx';
import { CategoryDropdown } from './CategoryDropdown/CategoryDropdown.tsx';
import { AuthUI, CurrentUserDataProvider } from "./firebase/auth";
import GamePage from './GamePage/GamePage.tsx';
import GameGrid from './components/molecules/GameGrid';
import './App.css';

function App() {
  // Just an example. Not sure about the datatypes, but they shouldn't be that hard to change
  const gameExample = {
    title: 'GameName',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Enim eu turpis egestas pretium aenean pharetra magna ac.',
    numPlayers: '1-6',
    duration: '1-5 hours',
    equipments: ['dice','timer','paper'],
    categories: 'dice game'
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
          <CategoryDropdown />
        </div>
        <div className ="gameSection">
            <div className="gameBox">
              <GameGrid/>
            </div>
            <div>
              <GamePage 
                title={gameExample.title} 
                gameText={gameExample.description} 
                numPlayers={gameExample.numPlayers}
                duration={gameExample.duration} 
                equipments={gameExample.equipments} 
                categories={gameExample.categories}/>
            </div>
          </div>
        </SearchProvider>
    </>
  );
}

export default App;

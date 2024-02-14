import './App.css'
import GamePage from './GamePage/GamePage.tsx'
import GameGrid from './components/molecules/GameGrid'

function App() {

  // Just an example. Not sure ab the datatypes, but should they shouldn't be that hard to change
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
    
      <div className="gameBox">
          <GameGrid games={[{
          imgSrc: './assets/cards.webp',
          imgAlt: 'Image 1',
          title: 'Game 1',
          category: 'Action',
        },
        {
          imgSrc: 'image2.jpg',
          imgAlt: 'Image 2',
          title: 'Game 2',
          category: 'Card',
        },
        {
          imgSrc: 'image3.jpg',
          imgAlt: 'Image 3',
          title: 'Game 3',
          category: 'Adventure',
        },
        {
          imgSrc: 'image3.jpg',
          imgAlt: 'Image 4',
          title: 'Game 4',
          category: 'Adventure',
        }]}></GameGrid>

        <GamePage title={gameExample.title} gameText={gameExample.description} numPlayers = {gameExample.numPlayers}
        duration={gameExample.duration} equipments={gameExample.equipments} categories={gameExample.categories}/>
        </div>
  </>
  )
}

export default App

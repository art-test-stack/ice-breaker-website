import './App.css'
import GameGrid from './components/molecules/GameGrid'

function App() {
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
      </div>
    </>
  )
}

export default App

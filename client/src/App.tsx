import { useState } from 'react'
import './App.css'
import { LoginButton } from './LoginRegisterMenu/LoginButton.tsx'
import LoginMenu from './LoginRegisterMenu/LoginMenu.tsx'
import { Search } from './SearchBar/Search.tsx'
import {Title} from './Title/Title.tsx'
import { CategoryDropdown } from './CategoryDropdown/CategoryDropdown.tsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>

      <div id='header'> 
        <div id='titleContainer'>
          <Title/>
        </div>
        <div id='searchContainer'>
          <Search/>
        </div>
        <div id='loginContainer'>
          <LoginMenu />
        </div>
      </div>
      
      {/* <div><LoginButton /></div> */}

      <div><CategoryDropdown /></div>
    </>
  )
}

export default App

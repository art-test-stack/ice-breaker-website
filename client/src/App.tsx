import { useState } from 'react'
import './App.css'
import { LoginButton } from './LoginRegisterMenu/LoginButton.tsx'
import LoginMenu from './LoginRegisterMenu/LoginMenu.tsx'
import { Search } from './SearchBar/Search.tsx'
import {Title} from './Title/Title.tsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Search/>
      
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>

      {/* <div><LoginButton /></div> */}
      <div> <LoginMenu /> </div>
      
      <div><Title/></div>  

    </>
  )
}

export default App

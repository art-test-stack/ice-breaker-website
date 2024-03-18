import '../css/DescriptionPrompt.css'
import { ChangeEvent } from 'react'


export let gameDescription = ""

function handleChange(e: ChangeEvent<HTMLInputElement>){
    gameDescription = e.target.value
}

export default function DescriptionPrompt() {
  return (
    <div style={{width:"100%"}}>
        <h2 id='addGameTitle'>Game Description:</h2>
        <form>
            <textarea id="descriptionPrompt" onChange={handleChange}  placeholder='What are the rules of the game?' data-cy="descriptionPrompt" />
        </form>
    </div>
  );
}
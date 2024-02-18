import './DescriptionPrompt.css'
import { ChangeEvent } from 'react'


function handleChange(e: ChangeEvent<HTMLTextAreaElement>){
    console.log(e.target.value)
}


export default function DescriptionPrompt() {
  return (
    <div>
            <h2 id='addGameTitle'>Game Description:</h2>
            <form>
                <textarea id="descriptionPrompt" onChange={handleChange}  placeholder='What are the rules of the game?' />
            </form>
    </div>
  );
}
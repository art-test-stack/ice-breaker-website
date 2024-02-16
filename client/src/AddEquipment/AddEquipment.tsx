import { useState } from 'react'
import './AddEquipment.css'
import { ChangeEvent } from 'react'
import { SyntheticEvent } from 'react'

// the equipments list can be accessed by [equipments]
function AddEquipment () {
    const [equipments, setEquipments] = useState<string[]>([])
    const [inputValue, setInputValue] = useState<string>('')

    function handleChange(e: ChangeEvent<HTMLInputElement>){
        setInputValue(e.target.value)
    }

    function handleSubmit(e: SyntheticEvent){
        e.preventDefault()
        if (inputValue != ''){
            setEquipments([...equipments, inputValue])
            setInputValue('')
        }
    }

    function handleDelete(index: number){
        const newEquipments = [...equipments]
        newEquipments.splice(index, 1)
        setEquipments(newEquipments)
    }

    // function handleEdit(index: number){
    //     // var editedInput = prompt("Edit equipment: ")
    //     // if (editedInput != null && editedInput != '') {
    //     //     const newEquipments: string[] = [...equipments]
    //     //     newEquipments.splice(index,1, editedInput)
    //     //     setEquipments(newEquipments)
    //     // }
    //     // else {
    //     //     setEquipments(equipments)
    //     // }     

    // }

    function handleEdit(index: number) {
        let editedInput: string | null = null;
    
        while (editedInput === null || editedInput.trim() === '') {
            // Prompt the user and store the result
            editedInput = prompt("Edit equipment:");
    
            // If the user clicks "Cancel," exit the loop
            if (editedInput === null) {
                break;
            }
    
            // If the input is an empty string, prompt again
            if (editedInput.trim() === '') {
                prompt("Edit equipment:");
            }
        }
    
        if (editedInput !== null && editedInput !== '') {
            const newEquipments: string[] = [...equipments];
            newEquipments.splice(index, 1, editedInput);
            setEquipments(newEquipments);
        }
    }
    

    return (
        <div id='addEquipmentContainer'>
            <p>Equipments:</p>
            <form>
                <input id="inputBoxEquipment" type='text' value={inputValue} placeholder='Enter equipment' onChange={handleChange}/>
                <button id="addButtonEquipment" onClick={handleSubmit}>Add</button>
            </form>
            <ul>
                {equipments.map((content, index) => (
                <li className="equipments" key={index}>{content}
                <button id="editEquipmentButton" onClick={() => handleEdit(index)}>Edit</button>
                <button id="deleteEquipmentButton" onClick={() =>handleDelete(index)}>Delete</button>
                </li>
                ))}
            </ul>
        </div>
    )
}

export default AddEquipment;


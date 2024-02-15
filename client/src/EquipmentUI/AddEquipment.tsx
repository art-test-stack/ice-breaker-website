import { useState } from 'react'
import './AddEquipment.css'
import { ChangeEvent } from 'react'
import { SyntheticEvent } from 'react'

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

    function handleEdit(index: number){
        const editedInput = prompt("Edit equipment: ")
        if (editedInput != null && editedInput != '') {
            const newEquipments: string[] = [...equipments]
            newEquipments.splice(index,1, editedInput)
            setEquipments(newEquipments)
        }
        else {
            setEquipments(equipments)
        }
    }

    return (
        <div>
        <p>Equipments:</p>
        <form>
            <input type='text' value={inputValue} onChange={handleChange}/>
            <button onClick={handleSubmit}>Add</button>
        </form>
        <ul>
            {equipments.map((content, index) => (
            <li key={index}>{content}
            <button onClick={() => handleEdit(index)}>Edit</button>
            <button onClick={() =>handleDelete(index)}>Delete</button>
            </li>
            ))}
        </ul>
        </div>
    )
}

export default AddEquipment;
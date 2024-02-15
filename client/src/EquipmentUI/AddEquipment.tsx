import { useState } from 'react'
import './AddEquipment.css'

function AddEquipment () {
    const [equipments, setEquipments] = useState([])
    const [inputValue, setInputValue] = useState('')

    function handleChange(e){
        setInputValue(e.target.value)
    }

    function handleSubmit(e){
        e.preventDefault()
        setEquipments([...equipments, inputValue])
        setInputValue('')
    }

    function handleDelete(index){
        const newEquipments = [...equipments]
        newEquipments.splice(index, 1)
        setEquipments(newEquipments)
    }

    function handleEdit(index){
        const editedInput = prompt("Edit equipment: ")
        if (editedInput != null) {
            equipments.splice(index,1, editedInput)
        }
        setEquipments([...equipments])
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
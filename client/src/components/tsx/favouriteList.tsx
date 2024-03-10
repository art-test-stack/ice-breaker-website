const Favourites = () => {

    const handleClick = () => {
        console.log('favourites clicked')
    }

    return (
        <button id="addButtonEquipment" onClick={handleClick} style={{marginTop: '10px'}}>
            <img src='src/assets/favorite-svgrepo-com.svg'/>
        </button>
    );
}

export default Favourites

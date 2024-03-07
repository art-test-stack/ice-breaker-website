import { MdFavorite } from "react-icons/md";

// import { MdOutlineFavoriteBorder } from "react-icons/md";

export default function FavoriteButton(){    
    function FavoriteIcon(){
        return(<MdFavorite/>)
    }

    function handleClick(event: React.MouseEvent<HTMLElement>){
        console.log("Fav button clicked.")
        event.stopPropagation();
        
    }

    return(
        <button className = "favorite-icon" onClick = {handleClick}>
            <FavoriteIcon/>
        </button>
    )
}
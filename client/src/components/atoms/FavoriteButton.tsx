import { MdFavorite } from "react-icons/md";
// import { MdOutlineFavoriteBorder } from "react-icons/md";

export default function FavoriteButton(){    
    function FavoriteIcon(){
        return(<MdFavorite/>)
    }

    return(
        <button className = "favorite-button">
            <FavoriteIcon/>
        </button>
    )
}
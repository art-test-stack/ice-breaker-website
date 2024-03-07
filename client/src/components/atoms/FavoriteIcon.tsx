import { MdFavorite } from "react-icons/md";
import { MdOutlineFavoriteBorder } from "react-icons/md";

export default function FavoriteButton(){    
    function FavoriteIcon(){
        const isFavorite = true; //Placeholder as favorites have not been added to databases at the time of writing.
        // TODO: Replace with database request when possible
        if (isFavorite){
            return(<MdFavorite/>)
        }
        else{
            return(<MdOutlineFavoriteBorder/>)
        }
        
        
    }

    return(
        <button className = "favorite-icon">
            <FavoriteIcon/>
        </button>
    )
}
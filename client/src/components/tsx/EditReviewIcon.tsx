import {currentUserData} from '../../firebase/auth'
import { useContext } from 'react';

interface Data{
    userName: string;
}

function EditReviewIcon({userName}:Data) {
    const userData = useContext(currentUserData);
    if (userData?.data?.username == userName){
    return (
        <div >
        <button className='editReviewIcon'>
            <img src='/src/assets/edit-icon.svg' />
        </button>
    </div>
    ); 
}
}

export default EditReviewIcon;
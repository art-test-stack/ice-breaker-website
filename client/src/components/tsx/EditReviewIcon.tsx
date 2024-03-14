import {currentUserData} from '../../firebase/auth'
import { useContext, useState } from 'react';
import { ReviewButton, ReviewForm } from './reviewButton';
import { Modal } from './modal';

interface Data{
    userName: string;
    givenReview: string;
    rating: number;
}


function EditReviewIcon({userName, givenReview, rating}:Data) {
    const userData = useContext(currentUserData);
    const [isModalOpen, setIsModalOpen] = useState(false);
  
    const openModal = () => {
      setIsModalOpen(true);
    };
  
    const closeModal = () => {
      setIsModalOpen(false);
    };

    if (userData?.data?.username == userName){
    return (
        <div >
        <button className='editReviewIcon' onClick={openModal}>
            <img src='/src/assets/edit-icon.svg' />
        </button>
        <Modal isOpen={isModalOpen} onClose={closeModal}>
            <ReviewForm onClose={closeModal} givenReview={givenReview} givenRating={rating}/>
        </Modal>
    </div>
    ); 
}
}

export default EditReviewIcon;
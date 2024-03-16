import {currentUserData} from '../../firebase/auth'
import { useContext, useState } from 'react';
import { ReviewButton, ReviewForm } from './reviewButton';
import { Modal } from './modal';

interface Data{
    userName: string;
    givenReview: string;
    rating: number;
    review_id: string;
}


function EditReviewIcon({userName, givenReview, rating, review_id}:Data) {
    const userData = useContext(currentUserData);
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const openModal = () => {
      setIsModalOpen(true);
    };
  
    const closeModal = () => {
      setIsModalOpen(false);
    };

    if (userData?.data?.username == userName || userData?.data?.moderator) {
        return (
            <div >
            <button className='editReviewIcon' onClick={openModal}>
                <img src='/src/assets/edit-icon.svg' />
            </button>
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <ReviewForm onClose={closeModal} givenReview={givenReview} givenRating={rating} editReviewId={review_id}/>
            </Modal>
        </div>
    ); 
}
}

export default EditReviewIcon;
import { useState, useContext } from 'react';
import { Modal } from './modal';
import '../css/reviewButton.css';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import EditIcon from '@mui/icons-material/Edit';
import { useLocation } from 'react-router-dom';
import { currentUserData } from '../../firebase/auth';
import { push, ref } from 'firebase/database';
import { database } from '../../firebase/init';
// import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarBorderIcon from '@mui/icons-material/StarBorder';


interface ReviewFormData {
    rating: number;
    comment: string;
    username: string | undefined;
    gameId: string
}

const placeholderStyle: React.CSSProperties = {
    // fontStyle: 'italic',
};

const submitClicked = (formData: ReviewFormData) => {
    console.log(formData)
    // Push reviews to database
    push(ref(database, 'reviews'), formData).then((response) => {
        // reviewId from database
        const reviewID = response.key

        // push reviewIDs to games.
        push(ref(database, 'games/' + formData.gameId +'/reviewIDs'), reviewID).then(() => {
            window.alert("The review was added successfully!")
            window.location.reload() 
        })
    
    }).catch((error) => {
        console.log('Error: ', error)
        window.alert("Error adding review: " + error.message)
    })
}

const ReviewForm: any = ({ onClose }: any) => {
    const userData = useContext(currentUserData)
    const currentLocation = useLocation();

    const initialFormData: ReviewFormData = {
        rating: 0,
        comment: '',
        username: userData?.data?.username, // Issue: Appears as undefined on first submit but in console.log it is not
        gameId: currentLocation.pathname.split("/")[2] // Supposed to be gameId
      };

    const [formData, setFormData] = useState<ReviewFormData>(initialFormData);

    const handleInputChange = (event: any) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
        ...prevFormData,
        username: userData?.data?.username, // Not nice fix to issue on line 31
        [name]: value,
        }));
    };

    const handleSubmit = (event: any) => {
        event.preventDefault();
        // checks if logged in
        if (!userData) {
            window.alert("You must be logged in to review a game!")
        }else{
            console.log(formData);
            // Call API instead of console-log to register form data
            submitClicked(formData);
            setFormData(initialFormData);
        } 
    };

    return (
<>
    <div className='modal-content'>
        <div className='writeReviewText'>Write a review</div>
        <form onSubmit={handleSubmit}>
            <div>
                <Rating
                    id='ratings'
                    name="rating"
                    value={formData.rating}
                    onChange={handleInputChange}
                    emptyIcon={<StarBorderIcon style={{ color:'white'}} fontSize="inherit" />}
                />
            </div>
            <textarea 
                name="comment" 
                id="comment" 
                value={formData.comment} 
                onChange={handleInputChange}  
                placeholder="Write your review here..."
                style={placeholderStyle}
            />
            <Button id="submitReview" type="submit" onClick={onClose} className={userData ? '': 'disabledSubmitButton'}>
                Submit
            </Button>
        </form>
    </div>
</>

    );
};

export const ReviewButton = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
  
    const openModal = () => {
      setIsModalOpen(true);
    };
  
    const closeModal = () => {
      setIsModalOpen(false);
    };
  
    return (
      <div>
        <Button onClick={openModal} startIcon={<EditIcon/>}>Review</Button>
        <Modal isOpen={isModalOpen} onClose={closeModal}>
            <ReviewForm onClose={closeModal}/>
        </Modal>
      </div>
    );
  };
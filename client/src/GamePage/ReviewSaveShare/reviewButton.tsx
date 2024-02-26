import { useState, useContext } from 'react';
import { Modal } from './modal'
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import EditIcon from '@mui/icons-material/Edit';
import { useLocation } from 'react-router-dom';
import { currentUserData } from '../../firebase/auth';

interface ReviewFormData {
    rating: number;
    comment: string;
    username: string | undefined;
    gameId: string
}

const placeholderStyle: React.CSSProperties = {
    fontStyle: 'italic',
};
  
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
        console.log(formData);
        // Call API instead of console-log to register form data
        setFormData(initialFormData);
    };

    return (
        <>
            <h2>Write a Review</h2>
            <form onSubmit={handleSubmit}>
            <div>
                <Typography component="legend">Rating: </Typography>
                <Rating
                    name="rating"
                    value={formData.rating}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <Typography component="legend">Rating: </Typography>
                <TextField 
                    name="comment" 
                    id="comment" 
                    value={formData.comment} 
                    onChange={handleInputChange}  
                    placeholder="Write your review here..."
                    style={placeholderStyle}/>
            </div>
            <Button type="submit" onClick={onClose}>Submit</Button>
            </form>
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
        <Modal isOpen={isModalOpen}>
            <ReviewForm onClose={closeModal}/>
        </Modal>
      </div>
    );
  };
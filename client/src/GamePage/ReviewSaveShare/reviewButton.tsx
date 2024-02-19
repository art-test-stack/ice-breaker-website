import { useState, useContext } from 'react';
import { Modal } from './modal'
// import { currentUserData } from '../../firebase/auth';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

interface ReviewFormData {
    rating: number;
    comment: string;
    username: string | undefined;
}

const placeholderStyle: React.CSSProperties = {
    fontStyle: 'italic',
};
  
const ReviewForm: any = ({ onClose }: any) => {
    // const userData = useContext(currentUserData)
    const initialFormData: ReviewFormData = {
        rating: 1,
        comment: '',
        username: 'blabla'
        // username: userData?.data?.username, //Have to fix why userData is undefined
      };

    const [formData, setFormData] = useState<ReviewFormData>(initialFormData);

    const handleInputChange = (event: any) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
        ...prevFormData,
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
                    // value={value}
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
                    placeholder="Write yout review here..."
                    style={placeholderStyle}/>
            </div>
            <Button type="submit" onClick={onClose}>Submit</Button>
            </form>
        </>
    );
};

export const ReviewGame = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
  
    const openModal = () => {
      setIsModalOpen(true);
    };
  
    const closeModal = () => {
      setIsModalOpen(false);
    };
  
    return (
      <div>
        <Button onClick={openModal}>Review</Button>
        <Modal isOpen={isModalOpen} onClose={closeModal}>
            <ReviewForm onClose={closeModal}/>
        </Modal>
      </div>
    );
  };
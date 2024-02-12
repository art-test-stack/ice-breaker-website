import { useState, useContext } from 'react';
import { Modal } from './modal'
import { currentUserData } from '../firebase/auth';

interface ReviewFormData {
    rating: number;
    comment: string;
    username: string | null;
}

const placeholderStyle: React.CSSProperties = {
    fontStyle: 'italic',
};
  
const ReviewForm: any = ({ onClose }: any) => {
    const userData = useContext(currentUserData)
    const initialFormData: ReviewFormData = {
        rating: 1,
        comment: '',
        username: userData?.data?.username, //Have to fix why userData is undefined
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
                <label htmlFor="rating">Rating:</label>
                <select name="rating" id="rating" value={formData.rating} onChange={handleInputChange}>
                {[1, 2, 3, 4, 5].map((value) => (
                    <option key={value} value={value}>
                    {value}
                    </option>
                ))}
                </select>
            </div>
            <div>
                <label htmlFor="comment">Comment:</label>
                <textarea 
                    name="comment" 
                    id="comment" 
                    value={formData.comment} 
                    onChange={handleInputChange}  
                    placeholder="Write yout review here..."
                    style={placeholderStyle}/>
            </div>
            <button type="submit" onClick={onClose}>Submit</button>
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
        <button onClick={openModal}>Review</button>
        <Modal isOpen={isModalOpen} onClose={closeModal}>
            <ReviewForm onClose={closeModal}/>
        </Modal>
      </div>
    );
  };
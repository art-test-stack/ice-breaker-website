import { useState } from 'react';

export const Modal = ({ isOpen, onClose, children }: any) => {
  const modalStyle = {
    display: isOpen ? 'block' : 'none',
    position: 'fixed',
    zIndex: 1,
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    overflow: 'auto',
    backgroundColor: 'rgba(0,0,0,0.4)',
  };

  return (
    <div style={modalStyle}>
      <div style={{ backgroundColor: 'white', margin: '15% auto', padding: '20px', border: '1px solid #888', width: '80%' }}>
        <span style={{ float: 'right', cursor: 'pointer' }} onClick={onClose}>&times;</span>
        {children}
      </div>
    </div>
  );
};

export const ModalExample = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };  

  return (
    <div>
      <button onClick={openModal}>Review Game</button>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h2>Modal Content</h2>
        <p>This is the content of the modal.</p>
        <button onClick={closeModal}>Close Modal</button>
      </Modal>
    </div>
  );
};
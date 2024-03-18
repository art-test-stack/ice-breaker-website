import '../css/modal.css'

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
    <div style={modalStyle as any}>
      <div className='reviewModal' >
        <span className='closeModal' style={{ float: 'right', cursor: 'pointer' }} onClick={onClose}>&times;</span>
        {children}
      </div>
    </div>
  );
};


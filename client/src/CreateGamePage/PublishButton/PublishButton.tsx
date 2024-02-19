import "./PublishButton.css"

const PublishButton: React.FC<{onClick: () => void}> = ({ onClick}) => {
    return (
        <div>
        <button onClick={onClick} id="publishButton" >
            <span style={{ display: 'inline-block' }}>Publish</span>
            </button>
    </div>
    ); 
}

export default PublishButton;
import './VideoItem.css'

function VideoItem({video, onToggleLike, onClick, onDelete}){
    const handleLikeVideo = (e) => {
        e.stopPropagation();
        onToggleLike(video.id);
    };

    const handleCardClick = () => {
        onClick(video);
    };
    const handleDeleteClick = (e) => {
        e.stopPropagation();
        onDelete(video.id);
    };
    return(
        <div className="video-card" onClick={handleCardClick}>
            <div className="video-card-header">
                <h3 className="video-card-title">{video.title}</h3>
                <div className='video-card-actions'>
                    <button className="video-card-like-button" onClick={(e) => handleLikeVideo(e)}>
                        {video.isLiked ? "⭐" : "✰"}
                    </button>
                    <button onClick={(e) => handleDeleteClick(e)} className="video-card-delete-button">
                        🗑️
                    </button>
                </div>
            </div>
            <p className="video-card-description">{video.description}</p>
        </div>
    );
}

export default VideoItem
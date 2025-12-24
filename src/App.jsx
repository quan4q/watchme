import React, { useEffect, useState } from 'react';
import './App.css';
import VideoItem from './components/VideoItem';
import AddVideoModal from './components/VideoModal';

function App() {
  const [allVideos, setAllVideos] = useState([]);
  const [displayedVideos, setDisplayedVideos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingVideo, setEditingVideo] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const savedVideosString = localStorage.getItem('videos');
    if (savedVideosString) {
      const savedVideos = JSON.parse(savedVideosString);
      setAllVideos(savedVideos);
      setDisplayedVideos(savedVideos);
    }
  }, []);

  useEffect(() => {
    if(!search.trim()){
      setDisplayedVideos(allVideos);
    }
    else{
      const filteredVideos = allVideos.filter(video =>
        video.title.toLowerCase().includes(search.toLowerCase()) ||
        video.description.toLowerCase().includes(search.toLowerCase())
      );
      setDisplayedVideos(filteredVideos);
    }
  }, [search, allVideos]);

  const handleAddVideo = (videoData) => {
    const newVideo = {
      ...videoData,
      id: Date.now()
    };
    const updatedVideos = [...allVideos, newVideo];
    setAllVideos(updatedVideos);
    setDisplayedVideos(updatedVideos);
    localStorage.setItem('videos', JSON.stringify(updatedVideos));
  };

  const handleEditVideo = (videoData) => {
    const updatedVideos = allVideos.map(video => 
      video.id === videoData.id ? videoData : video
    );
    setAllVideos(updatedVideos);
    setDisplayedVideos(displayedVideos.map(video => 
      video.id === videoData.id ? videoData : video
    ));
    localStorage.setItem('videos', JSON.stringify(updatedVideos));
  };

  const handleEditClick = (video) => {
    setEditingVideo(video);
    setIsModalOpen(true);
  };

  const handleAllVideos = () => {
    setDisplayedVideos(allVideos);
  };

  const handleLikedVideos = () => {
    setDisplayedVideos(allVideos.filter(video => video.isLiked));
  };

  const handleDeleteClick = (id) => {
    const updatedVideos = allVideos.filter(
      video => video.id !== id
    );
    setAllVideos(updatedVideos);
    setDisplayedVideos(displayedVideos.filter(
      video => video.id !== id
    ));
    localStorage.setItem('videos', JSON.stringify(updatedVideos));
  };

  const onToggleLike = (id) => {
    const updatedVideos = allVideos.map(video =>
      video.id === id ? { ...video, isLiked: !video.isLiked } : video
    );
    setAllVideos(updatedVideos);
    setDisplayedVideos(displayedVideos.map(video =>
      video.id === id ? { ...video, isLiked: !video.isLiked } : video
    ));
    localStorage.setItem('videos', JSON.stringify(updatedVideos));
  };

  const openModal = () => {
    setEditingVideo(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingVideo(null);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="app">
      <AddVideoModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onAddVideo={handleAddVideo}
        onEditVideo={handleEditVideo}
        editingVideo={editingVideo}
      />

      <header className="header">
        <h1 className="logo">Посмотри меня</h1>
        <div className="tabs">
          <button className="tab" onClick={handleAllVideos}>Весь список</button>
          <button className="tab" onClick={handleLikedVideos}>Избранное</button>
        </div>
        <input
          type="text"
          placeholder="Поиск..."
          className="search-input"
          value={search}
          onChange={handleSearchChange}
        />
      </header>
      
      <main className="main-content">
        {displayedVideos.length === 0 ? (
          <button onClick={openModal} className='add-video-button'>+</button>
        ) : (
          <div className='cards-div'>
            {displayedVideos.map(video => (
              <VideoItem 
                key={video.id} 
                video={video} 
                onToggleLike={onToggleLike}
                onClick={handleEditClick}
                onDelete={handleDeleteClick}
              />
            ))}

            <button onClick={openModal} className='add-video-button'>+</button>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
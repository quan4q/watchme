import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import './VideoModal.css'

const AddVideoModal = ({ isOpen, onClose, onAddVideo, onEditVideo, editingVideo }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    ref: '',
    isLiked: false,
  });

  useEffect(() => {
    if (editingVideo) {
      setFormData({
        title: editingVideo.title || '',
        description: editingVideo.description || '',
        ref: editingVideo.ref || '',
        isLiked: editingVideo.isLiked || false,
      });
    } else {
      setFormData({ title: '', description: '', ref: '', isLiked: false });
    }
  }, [editingVideo, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      alert('Заполните название!');
      return;
    }

    if (editingVideo) {
      onEditVideo({
        ...formData,
        id: editingVideo.id
      });
    } else {
      onAddVideo(formData);
    }
    
    onClose();
  };

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (e) => {
    const {name, checked} = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      ariaHideApp={false}
    >
      <div className='modal-content'>
        <div className='modal-header'>
          <h2>{editingVideo ? 'Редактировать видео' : 'Добавить видео'}</h2>
          <button onClick={onClose} className='modal-close-btn'>x</button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <label>Название видео *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Введите название"
              required
            />
          </div>

          <div className='form-group'>
            <label>Описание</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Введите описание"
            />
          </div>

          <div className='form-group'>
            <label>Ссылка на видео</label>
            <input
              type="url"
              name="ref"
              value={formData.ref}
              onChange={handleChange}
              placeholder="https://www.youtube.com/watch?v=..."
            />
          </div>

          <div className='checkbox-group'>
            <label>
              <input
                type="checkbox"
                name="isLiked"
                checked={formData.isLiked}
                onChange={handleCheckboxChange}
              />
              В избранном
            </label>
          </div>

          <div className='form-actions'>
            <button type="button" onClick={onClose} className='cancel-btn'>Отмена</button>
            <button type="submit" className='submit-btn'>
              {editingVideo ? 'Сохранить изменения' : 'Добавить'}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default AddVideoModal;
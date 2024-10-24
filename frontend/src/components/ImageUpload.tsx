import React, { useState } from 'react';
import axios from '../services/api';

const ImageUpload: React.FC = () => {
  const [images, setImages] = useState<File[]>([]);
  const [titles, setTitles] = useState<string[]>([]);

  const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files));
    }
  };

  const handleTitleChange = (index: number, title: string) => {
    const newTitles = [...titles];
    newTitles[index] = title;
    setTitles(newTitles);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    images.forEach((image, index) => {
      formData.append('images', image);
      formData.append('titles', titles[index]);
    });
    try {
      await axios.post('/api/upload-images', formData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" multiple onChange={handleFilesChange} />
      {images.map((image, index) => (
        <div key={index}>
          <img src={URL.createObjectURL(image)} alt={`preview ${index}`} />
          <input
            type="text"
            placeholder="Title"
            value={titles[index] || ''}
            onChange={(e) => handleTitleChange(index, e.target.value)}
          />
        </div>
      ))}
      <button type="submit">Upload Images</button>
    </form>
  );
};

export default ImageUpload;

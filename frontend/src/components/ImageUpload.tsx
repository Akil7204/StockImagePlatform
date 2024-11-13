import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import axios from '../services/api';

const ImageUpload: React.FC = () => {
  const [images, setImages] = useState<File[]>([]);
  const [titles, setTitles] = useState<string[]>([]);
  const [error, setError] = useState<string>('');
  const navigate = useNavigate(); 

  const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      const validImages = selectedFiles.filter(file => file.type.startsWith('image/'));

      if (validImages.length !== selectedFiles.length) {
        setError('Only image files (e.g., JPG, PNG) are allowed.');
      } else {
        setError('');
      }
      
      setImages(validImages);
    }
  };

  const handleTitleChange = (index: number, title: string) => {
    const newTitles = [...titles];
    newTitles[index] = title;
    setTitles(newTitles);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (images.length === 0) {
      setError('Please select at least one image to upload.');
      return;
    }

    const token = localStorage.getItem('token');
    const formData = new FormData();
    images.forEach((image, index) => {
      formData.append('images', image);
      formData.append('titles', titles[index] || '');
    });

    try {
      await axios.post('/api/image/upload', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      navigate('/dashboard'); 
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold text-center mb-4">Upload Images</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleFilesChange}
        className="mb-4 w-full border border-gray-300 rounded-md p-2"
      />
      {images.map((image, index) => (
        <div key={index} className="mb-4">
          <img src={URL.createObjectURL(image)} alt={`preview ${index}`} className="h-32 w-32 object-cover mb-2" />
          <input
            type="text"
            placeholder="Title"
            value={titles[index] || ''}
            onChange={(e) => handleTitleChange(index, e.target.value)}
            className="block w-full px-4 py-2 mb-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
      ))}
      <button type="submit" className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600">
        Upload Images
      </button>
    </form>
  );
};

export default ImageUpload;

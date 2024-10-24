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
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold text-center mb-4">Upload Images</h2>
      <input
        type="file"
        multiple
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

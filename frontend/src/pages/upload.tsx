import React from 'react';
import ImageUpload from '../components/ImageUpload';

const UploadPage: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Upload Image</h1>
      <ImageUpload />
    </div>
  );
};

export default UploadPage;

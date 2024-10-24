import React from 'react';
import ImageUpload from '../components/ImageUpload';
import ImageList from '../components/ImageList';

const Dashboard: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Image Dashboard</h1>
      <div className="mb-6">
        <ImageUpload />
      </div>
      <ImageList />
    </div>
  );
};

export default Dashboard;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import ImageList from '../components/ImageList';
import { useAuth } from '../context/AuthContext';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const  {logout}: any  = useAuth();

  const handleLogout = () => {
    logout();

    navigate('/login');
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Image Dashboard</h1>
        <div className="flex space-x-4">
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            Logout
          </button>
          <button
            onClick={() => navigate('/upload')}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Upload Image
          </button>
        </div>
      </div>
      <ImageList />
    </div>
  );
};

export default Dashboard;

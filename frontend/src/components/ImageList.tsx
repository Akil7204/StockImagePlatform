import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import axios from '../services/api';

interface Image {
  _id: string;
  title: string;
  url: string;
}

const ImageList: React.FC = () => {
  const [images, setImages] = useState<Image[]>([]);

  const fetchImages = async () => {
    const response = await axios.get('/api/get-images');
    setImages(response.data);
  };

  const handleDelete = async (id: string) => {
    await axios.delete(`/api/delete-image/${id}`);
    fetchImages();
  };

  const handleEdit = async (id: string, newTitle: string) => {
    await axios.put(`/api/edit-image/${id}`, { title: newTitle });
    fetchImages();
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    const reorderedImages = Array.from(images);
    const [removed] = reorderedImages.splice(result.source.index, 1);
    reorderedImages.splice(result.destination.index, 0, removed);
    setImages(reorderedImages);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="image-list">
        {(provided) => (
          <div className="grid grid-cols-2 gap-4" {...provided.droppableProps} ref={provided.innerRef}>
            {images.map((image, index) => (
              <Draggable key={image._id} draggableId={image._id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="bg-gray-100 p-4 rounded-md shadow-md"
                  >
                    <img src={image.url} alt={image.title} className="h-32 w-32 object-cover mb-2" />
                    <input
                      type="text"
                      value={image.title}
                      onChange={(e) => handleEdit(image._id, e.target.value)}
                      className="block w-full px-4 py-2 mb-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    />
                    <button
                      onClick={() => handleDelete(image._id)}
                      className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default ImageList;

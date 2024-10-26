import React, { useEffect, useRef, useState, useCallback } from "react";
import Sortable from "sortablejs"; // Import SortableJS
import axios from "../services/api";

interface Image {
  _id: string;
  title: string;
  imageUrl: string;
  order: number;
}

const ImageList: React.FC = () => {
  const [images, setImages] = useState<Image[]>([]);
  const sortableContainerRef = useRef<HTMLDivElement>(null);

  const fetchImages = useCallback(async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get("/api/image/getImage", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const sortedImages = response.data.sort((a: Image, b: Image) => a.order - b.order);
      setImages(sortedImages);
    } catch (error) {
      console.error("Failed to fetch images:", error);
    }
  }, []);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  useEffect(() => {
    if (sortableContainerRef.current) {
      Sortable.create(sortableContainerRef.current, {
        animation: 150,
        onEnd: async (event) => {
          const newImages = Array.from(images);
          const [removed] = newImages.splice(event.oldIndex!, 1);
          newImages.splice(event.newIndex!, 0, removed);

          const updatedImages = newImages.map((image, index) => ({
            ...image,
            order: index,
          }));

          setImages(updatedImages);

          const token = localStorage.getItem("token");
          try {
            await axios.put("/api/image/updateOrder", updatedImages, {
              headers: { Authorization: `Bearer ${token}` },
            });
          } catch (error) {
            console.error("Failed to update image order:", error);
          }
        },
      });
    }
  }, [images]);

  const handleDelete = useCallback(
    async (id: string) => {
      try {
        await axios.delete(`/api/image/delete-image/${id}`);
        fetchImages();
      } catch (error) {
        console.error("Failed to delete image:", error);
      }
    },
    [fetchImages]
  );

  const handleEditTitle = useCallback(
    async (id: string, newTitle: string) => {
      const token = localStorage.getItem("token");
      try {
        await axios.put(`/api/image/edit-image/${id}`, { title: newTitle }, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setImages((prevImages) =>
          prevImages.map((image) =>
            image._id === id ? { ...image, title: newTitle } : image
          )
        );
        // fetchImages();
      } catch (error) {
        console.error("Failed to edit image title:", error);
      }
    },
    []
  );

  if (images.length === 0) {
    return <p>Loading images...</p>;
  }

  return (
    <div
      className="grid grid-cols-5 gap-4"
      ref={sortableContainerRef} 
    >
      {images.map((image) => (
        <div
          key={image._id}
          className="bg-gray-100 p-4 rounded-md shadow-md aspect-[3/4] flex flex-col items-center"
          data-id={image._id}
        >
          <img
            src={`http://localhost:4000${image.imageUrl}`}
            alt={image.title}
            className="h-3/4 w-full object-cover mb-2 rounded-md"
          />
          <input
            type="text"
            value={image.title}
            onChange={(e) => handleEditTitle(image._id, e.target.value)}
            className="w-full px-4 py-1 mb-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
          <button
            onClick={() => handleDelete(image._id)}
            className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default ImageList;

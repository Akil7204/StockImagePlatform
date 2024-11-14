import React, { useEffect, useRef, useState, useCallback } from "react";
import Sortable from "sortablejs";
import axios from "../services/api";

interface Image {
  _id: string;
  title: string;
  imageUrl: string;
  order: number;
}

const ImageList: React.FC = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState<Image | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editFile, setEditFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const sortableContainerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<any>(null);

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

  const openEditModal = (image: Image) => {
    setCurrentImage(image);
    setEditTitle(image.title);
    setError(null)
    setEditFile(null);
    setPreviewUrl(null);
    setIsModalOpen(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setEditFile(file);
      setPreviewUrl(URL.createObjectURL(file)); 
    } else {
      setError("Please select a valid image file.");
    }
  };

  const handleEditSave = async () => {
    if (!editTitle.trim()) {
      alert("Title cannot be empty.");
      return;
    }
    console.log(currentImage);
    

    if (currentImage) {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("title", editTitle);
      if (editFile) {
        formData.append("image", editFile);
      }

      try {
        await axios.put(
          `/api/image/edit/${currentImage._id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        fetchImages();
        setIsModalOpen(false);
      } catch (error) {
        console.error("Failed to edit image:", error);
      }
    }
  };

  if (images.length === 0) {
    return <p>Loading images...</p>;
  }

  return (
    <div>
      <div className="grid grid-cols-5 gap-4" ref={sortableContainerRef}>
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
              readOnly
              className="w-full px-4 py-1 mb-2 border border-gray-300 rounded-md focus:outline-none"
            />
            <div className="flex gap-2 w-full">
              <button
                onClick={() => openEditModal(image)}
                className="w-1/2 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(image._id)}
                className="w-1/2 bg-red-500 text-white py-2 rounded-md hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && currentImage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-md w-96">
            <h2 className="text-lg font-semibold mb-4">Edit Image</h2>
            <img
              src={previewUrl || `http://localhost:4000${currentImage.imageUrl}`} // Display preview if selected
              alt={currentImage.title}
              className="mb-4 w-full h-64 object-cover rounded-md"
            />
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Enter new title"
            />
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none"
            />
            <div className="flex gap-2">
              <button
                onClick={handleEditSave}
                className="w-1/2 bg-green-500 text-white py-2 rounded-md hover:bg-green-600"
              >
                Save
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-1/2 bg-gray-500 text-white py-2 rounded-md hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageList;

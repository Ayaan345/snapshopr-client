
'use client';

import { useState } from 'react';
import Image from "next/image"; // Import Image component

function ItemForm({ onCreate }) {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('price', price);
    formData.append('description', description);
    formData.append('location', location);
    if (image) {
      formData.append('image', image);
    }
    await onCreate(formData);

    setTitle('');
    setPrice('');
    setDescription('');
    setLocation('');
    setImage(null);
    setImagePreview(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImage(null);
      setImagePreview(null);
    }
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data"
          className="space-y-6 md:space-y-8 p-6 bg-white  rounded-lg max-w-md mx-auto">

      {/* Title Input */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter product title"
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>

      {/* Price Input */}
      <div>
        <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">Price</label>
        <input
          type="number"
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Enter price"
          required
          min="0" 
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>

      {/* Description Textarea */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe your product"
          rows="4" 
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm resize-y"
        />
      </div>

      {/* Location Input */}
      <div>
        <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Location</label>
        <input
          type="text"
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="e.g., City, Postal Code"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>

      {/* Image Upload */}
      <div>
        <label htmlFor="image-upload" className="block text-sm font-medium text-gray-700 mb-1">Product Image</label>
        <input
          type="file"
          id="image-upload"
          name="image"
          onChange={handleImageChange}
          accept="image/*"
          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
        {imagePreview && (
          <div className="mt-4">
            <p className="text-sm text-gray-600 mb-2">Image Preview:</p>
            <div className="relative w-full max-w-xs h-48 rounded-md shadow-sm border border-gray-200"> {/* Added relative positioning and fixed height for Image */}
              <Image // Changed img to Image
                src={imagePreview}
                alt="Preview"
                fill // Added fill prop
                style={{ objectFit: 'contain' }} // Equivalent to object-contain
                className="rounded-md"
              />
            </div>
          </div>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Add Item
      </button>
    </form>
  );
}

export default ItemForm;
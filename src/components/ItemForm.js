"use client";

// import React, { useState } from "react";

// export default function ItemForm({ onCreate }) {
//   const [title, setTitle] = useState("");
//   const [price, setPrice] = useState("");
//   const [description, setDescription] = useState("");
//   const [location, setLocation] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!title || !price) return; // basic validation

//     onCreate({
//       title,
//       price: Number(price),
//       description,
//       location,
//     });

//     // reset form
//     setTitle("");
//     setPrice("");
//     setDescription("");
//     setLocation("");
//   };
//   const [file, setFile] = useState(null);
//   const [preview, setPreview] = useState(null);

//   const chooseFile = e => {
//     const f = e.target.files[0];
//     if (!f) return;
//     setFile(f);
//     setPreview(URL.createObjectURL(f));
//   };
//   const upload = async () => {
//     if (!file) return alert('Pick an image first');
//     const fd = new FormData();
//     fd.append('image', file);
//     const res = await fetch(`/api/items/${itemId}/image`, {
//       method: 'POST',
//       body: fd,
//     });
//     const updated = await res.json();
//     onUploaded(updated);   // e.g. update parent state
//   };

//   return (
//     <form onSubmit={handleSubmit} style={{ marginBottom: "2rem" }}>
//       <div style={{ marginBottom: "0.5rem" }}>
//         <input
//           type="text"
//           placeholder="Title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           required
//           style={{ width: "100%", padding: "0.5rem" }}
//         />
//       </div>
//       <div style={{ marginBottom: "0.5rem" }}>
//         <input
//           type="number"
//           placeholder="Price"
//           value={price}
//           onChange={(e) => setPrice(e.target.value)}
//           required
//           style={{ width: "100%", padding: "0.5rem" }}
//         />
//       </div>
//       <div style={{ marginBottom: "0.5rem" }}>
//         <textarea
//           placeholder="Description"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           style={{ width: "100%", padding: "0.5rem" }}
//         />
//       </div>
//       <div style={{ marginBottom: "0.5rem" }}>
//         <input
//           type="text"
//           placeholder="Location (e.g., postal code)"
//           value={location}
//           onChange={(e) => setLocation(e.target.value)}
//           style={{ width: "100%", padding: "0.5rem" }}
//         />
//       </div>


//       <div>
//         <input type="file" accept="image/*" onChange={chooseFile} />
//         {preview && (
//           <div style={{ margin: '1em 0' }}>
//             <img src={preview} alt="Preview" style={{ maxWidth: 200 }} />
//           </div>
//         )}
//         <button onClick={upload} disabled={!file}>
//           Upload Image
//         </button>
//       </div>
      
//       <button type="submit" style={{
//         padding: "0.5rem 1rem",
//         border: "none",
//         background: "#0070f3",
//         color: "#fff",
//         borderRadius: "4px",
//         cursor: "pointer"
//       }}>
//         Add Item
//       </button>
//     </form>
//   );
// }

import { useState } from 'react';

function ItemForm({ onCreate }) {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [image, setImage] = useState(null);

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
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
      />
      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Price"
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />
      <input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Location"
      />
      <input
        type="file"
        name="image"
        onChange={(e) => setImage(e.target.files[0])}
        accept="image/*"
      />
      <button type="submit">Add Item</button>
    </form>
  );
}

export default ItemForm;
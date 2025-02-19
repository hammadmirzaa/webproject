import React, { useEffect, useState } from "react";
import { UsePostFormContext } from "../store/postContext";
import ListUser from "./listUser";
import Example from "./editUser";

const CreateUser = () => {
  const { formData, setFormData, postFormData, setIsLogout, isLogout } = UsePostFormContext();
  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      const file = files[0];
      setFormData({ ...formData, [name]: file });

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      if (file) {
        reader.readAsDataURL(file);
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  useEffect(()=>{
    setIsLogout(!isLogout)
  },[])

  const handleSubmit = async (e) => {
    e.preventDefault();
    postFormData();
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border border-gray-300 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Create User</h2>
      <form onSubmit={handleSubmit}>
        <label className="block font-medium mb-1" htmlFor="name">
          Name:
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />

        <label className="block font-medium mb-1" htmlFor="description">
          Description:
        </label>
        <input
        type="text"
        id="description"
        name="description"
        value={formData.description || ""}
        onChange={handleChange}
        required
        className="w-full p-2 mb-4 border border-gray-300 rounded"
      />

        <label className="block font-medium mb-1" htmlFor="price">
          Price:
        </label>
        <input
          type="number"
          id="price"
          name="price"
          value={formData.price || ""}
          onChange={handleChange}
          required
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />

        <label className="block font-medium mb-1" htmlFor="image">
          Image:
        </label>
        <input
          type="file"
          id="image"
          name="image"
          onChange={handleChange}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />

        {imagePreview && (
          <div className="my-4">
            <h4>Image Preview:</h4>
            <img
              src={imagePreview}
              alt="Preview"
              className="w-32 h-32 object-cover"
            />
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
      <Example/>
      <ListUser admin />
    </div>
  );
};

export default CreateUser;

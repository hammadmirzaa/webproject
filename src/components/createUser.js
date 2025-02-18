import React, { useEffect, useState } from "react";
import { UsePostFormContext } from "../store/postContext";

const CreateUser = () => {
  const { formData, setFormData, postFormData, fetchData, tableData, editFormData, updateFormData } =
    UsePostFormContext();

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.id) {
      editFormData(formData);  
    } else {
      // If no ID, we are creating a new user
      postFormData();
    }
  };


  const handleEdit = (item) => {
    // Set the form data with the item to edit
    setFormData(item);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border border-gray-300 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">{formData.id ? "Edit" : "Create"} User</h2>
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

        <label className="block font-medium mb-1" htmlFor="email">
          Email:
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />

        <label className="block font-medium mb-1" htmlFor="mobile">
          Mobile:
        </label>
        <input
          type="text"
          id="mobile"
          name="mobile"
          value={formData.mobile}
          onChange={handleChange}
          required
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          {formData.id ? "Update" : "Submit"}
        </button>
      </form>

      <div>
        {tableData.map((item) => (
          <div key={item.id} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <h4>{item.name}</h4>
            <h4>{item.email}</h4>
            <h4>{item.mobile}</h4>
            <button
              className="w-full bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600"
              type="button"
              onClick={() => handleEdit(item)} // Pre-fill form with the item data for editing
            >
              Edit
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreateUser;

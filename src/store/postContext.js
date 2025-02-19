import { createContext, useContext, useState } from "react";

const PostFormContext = createContext();
export const UsePostFormContext = () => useContext(PostFormContext);

export const PostFormProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image:""
  });
  const [isLogout, setIsLogout] = useState(false)
  const [tableData, setTableData] = useState([]) 
  const postFormData = async () => {
    try {
      const response = await fetch("http://localhost/web_project/submit.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          name: formData.name,
          description: formData.description,
          price: formData.price,
          image: formData.image,
        }).toString(),
      });

      const result = await response.json();
      if (result.status === "success") {
        alert("Data submitted successfully");
      } else {
        alert("Failed to submit data: " + result.message);
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost/web_project/data.php", {
        method: "GET",
      });

      const result = await response.json();
      console.log(result);
      setTableData(result.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const editFormData = async (id, updatedData) => {
  try {
    const response = await fetch(
      `http://localhost/web_project/update.php`,
      {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
        },
        body: new URLSearchParams({
          name: formData.name,
          description: formData.description,
          price: formData.price,
          imageji: formData.image,
        }).toString(),
      }
    );

    const result = await response.json();
    if (result.status === "success") {
      alert("Data updated successfully");
    } else {
      alert("Failed to update data: " + result.message);
    }
  } catch (error) {
    console.error("Error updating data:", error);
    alert("An error occurred. Please try again.");
  }
};

  return (
    <PostFormContext.Provider
      value={{ formData, setFormData, postFormData, editFormData, fetchData, tableData, setTableData, isLogout, setIsLogout }}
    >
      {children}
    </PostFormContext.Provider>
  );
};

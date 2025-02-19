import React, { useEffect } from "react";
import { UsePostFormContext } from "../store/postContext";
import Example from "./editUser";

const ListUser = ({ admin }) => {
  const { tableData, setFormData, fetchData, setIsLogout } = UsePostFormContext();
  console.log(tableData);
  useEffect(() => {
    fetchData();
    setIsLogout(true)
  }, []);
  const handleEdit = (item) => {
    setFormData(item);
  };
  return (
    <div>
      {tableData.map((item) => (
        <div
          key={item.id}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h4>{item.name}</h4>
          <h4>{item.description}</h4>
          <h4>{item.price}</h4>
          <img src={item.image} alt="" />
          {admin && (
            <button
              className="w-full bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600"
              type="button"
              onClick={() => handleEdit(item)}
            >
              Edit
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default ListUser;

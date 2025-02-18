import React, { useEffect } from 'react'
import { UsePostFormContext } from '../store/postContext';

const ListUser = () => {
    const { tableData, setFormData, fetchData  } = UsePostFormContext();
    console.log(tableData)
    useEffect(()=>{
      fetchData()
    },[])
    const handleEdit = (item) => {
    setFormData(item);
                // <button
            //   className="w-full bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600"
            //   type="button"
            //   onClick={() => handleEdit(item)} 
            // >
            //   Edit
            // </button>
  };
  return (
    <div>
        {tableData.map((item) => (
          <div key={item.id} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <h4>{item.name}</h4>
            <h4>{item.description}</h4>
            <h4>{item.price}</h4>
            <img src={item.image} alt='' />
          </div>
        ))}
      </div>
  )
}

export default ListUser

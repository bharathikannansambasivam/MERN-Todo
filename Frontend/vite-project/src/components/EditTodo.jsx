import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
function EditTodo() {
  const { id } = useParams;
  const handleUpdate = () => {
    axios.put(`http://localhost:3001/todo/${id}`);
    
  };

  return (
    <div className="flex mt-8">
      <div className=" flex  items-center gap-3 w-3/4 ">
        <input
          type="text"
          className="p-3 border rounded-lg w-full"
          placeholder="Enter todo title"
        />
      </div>{" "}
      <button
        className="bg-green-600 px-4 py-2 rounded-lg text-white w-full sm:w-auto"
        onClick={handleUpdate}
      >
        update
      </button>
    </div>
  );
}

export default EditTodo;

import React from "react";
import axios from "axios";

import { useNavigate, useParams } from "react-router-dom";

function Deletetodo() {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleDelete = () => {
    axios
      .delete(`http://localhost:3001/todo/${id}`)
      .then(() => navigate("/"))
      .catch((e) => {
        console.log("error");
        console.log(e.message);
      });
  };
  return (
    <div className=" h-screen w-screen  flex justify-center items-center  ">
      <button
        className="bg-red-600 p-5 rounded-xl text-white font-extrabold"
        onClick={handleDelete}
      >
        Delete
      </button>
    </div>
  );
}

export default Deletetodo;

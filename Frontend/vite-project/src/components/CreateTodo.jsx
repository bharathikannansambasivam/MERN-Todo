import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { HiCheck } from "react-icons/hi2";
import { useParams } from "react-router-dom";

import { MdOutlineDelete } from "react-icons/md";

function CreateTodo() {
  const [title, setTitle] = useState("");
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(-1);
  const [editTitle, setEditTitle] = useState("");
  const [isClicked, setIsClicked] = useState(false);
  useEffect(() => {
    fetchTodo();
  }, []);

  const fetchTodo = () => {
    axios.get("http://localhost:3001/todo").then((res) => {
      setTodos(res.data);
    });
  };

  const handleSubmit = () => {
    const data = {
      title,
    };

    axios
      .post("http://localhost:3001/todo", data)
      .then((res) => {
        console.log("todo added");
        setTitle("");
        fetchTodo();
      })
      .catch((e) => {
        console.log(e.message);
      });
  };

  const handleEdit = (item) => {
    setEditId(item._id);
    setEditTitle(item.title);
  };

  const handleUpdate = () => {
    const data = {
      title: editTitle,
    };

    axios
      .put(`http://localhost:3001/todo/${editId}`, data)
      .then((res) => {
        console.log("updated ");
        {
          const updatedTodos = todos.map((item) => {
            if (item._id == editId) {
              item.title = editTitle;
            }
            return item;
          });
          setTodos(updatedTodos);
        }
        setEditId(-1);
      })
      .catch((e) => {
        console.log(e.message);
      });
  };
  const handleEnter = () => {
    setIsClicked(!isClicked);
  };

  return (
    <div className="flex flex-col items-center gap-3 min-h-screen bg-gray-100 py-6">
      <h1 className="text-3xl font-bold mb-6">Create Todo</h1>
      <div className=" flex  items-center gap-3">
        <input
          type="text"
          className="p-3 border rounded-lg w-full"
          placeholder="Enter todo title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button
          className="bg-green-600 px-4 py-2 rounded-lg text-white w-full sm:w-auto"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
      <div className="mt-6">
        <h2 className="text-2xl font-bold mb-4 flex justify-center ">
          Todo List
        </h2>
        <div className="bg-white shadow-md rounded-lg p-4">
          <ul className="divide-y divide-gray-200">
            {todos.map((item, index) => (
              <li
                key={index}
                className="flex justify-between items-center py-2"
              >
                {editId == -1 || editId !== item._id ? (
                  <span
                    className={` ${isClicked} ? ${console.log(
                      "true"
                    )} :  ${console.log("false")} `}
                    onClick={handleEnter}
                  >
                    {item.title}
                  </span>
                ) : (
                  <input
                    type="text"
                    onChange={(e) => setEditTitle(e.target.value)}
                    value={editTitle}
                    className="p-3 border rounded-lg w-full"
                    placeholder="Enter todo title"
                  />
                )}
                <div className="flex gap-4">
                  {editId == -1 || editId !== item._id ? (
                    <button
                      className="text-blue-500 hover:text-blue-700"
                      onClick={() => handleEdit(item)}
                    >
                      <AiOutlineEdit size={20} />
                    </button>
                  ) : (
                    <button
                      className="text-blue-500 hover:text-blue-700"
                      onClick={() => handleUpdate(item)}
                    >
                      <HiCheck />
                    </button>
                  )}
                  <Link
                    to={`/todo/delete/${item._id}`}
                    className="text-red-500 hover:text-red-700"
                  >
                    <MdOutlineDelete size={20} />
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default CreateTodo;

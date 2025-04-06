import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

const API_BASE = import.meta.env.VITE_API_BASE;

const Body = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE}/tasks`)
      .then(res => res.json())
      .then(data => setTodos(data))
      .catch(err => console.error("Error fetching tasks:", err));
  }, []);

  const handleAdd = async () => {
    if (!todo.trim()) return;
    const newTask = { id: uuidv4(), todo, isCompleted: false };
    await fetch(`${API_BASE}/addtask`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTask),
    });
    setTodos([...todos, newTask]);
    setTodo("");
  };

  const handleDelete = async (id) => {
    await fetch(`${API_BASE}/deletetask/${id}`, { method: "DELETE" }); 
    setTodos(todos.filter((item) => item.id !== id));
  };

  const handleEdit = (id) => {
    const taskToEdit = todos.find((i) => i.id === id);
    setTodo(taskToEdit.todo);
    setTodos(todos.filter((item) => item.id !== id));
  };

  const handleCheckbox = async (id) => {
    const updatedTodos = todos.map((item) =>
      item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
    );
    setTodos(updatedTodos);
    const toggled = updatedTodos.find(t => t.id === id);
    await fetch(`${API_BASE}/toggle/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isCompleted: toggled.isCompleted }),
    });
  };

  const handleChange = (e) => setTodo(e.target.value);

  return (
    <div className="px-4 py-6 max-w-2xl mx-auto">
      <div className="bg-violet-300 rounded-2xl p-6 shadow-lg">
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-black">Add Your Tasks</h1>

        <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
          <input
            onChange={handleChange}
            value={todo}
            type="text"
            className="w-full sm:flex-1 p-2 rounded-md shadow-inner outline-none"
            placeholder="Add Your TASK"
          />
          <button
            onClick={handleAdd}
            className="w-full sm:w-auto bg-violet-800 hover:bg-violet-900 text-white px-5 py-2 rounded-lg transition-all"
          >
            Save
          </button>
        </div>

        <div className="mt-6">
          {todos.length > 0 ? (
            <h2 className="text-xl font-semibold text-center text-black mb-4">Your Tasks</h2>
          ) : (
            <p className="text-black font-medium text-center text-lg py-6">No tasks to display</p>
          )}

          <div className="space-y-4">
            {todos.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between bg-white rounded-lg shadow-md p-4"
              >
                <div className="flex items-center gap-4">
                  <input
                    onChange={() => handleCheckbox(item.id)}
                    type="checkbox"
                    checked={item.isCompleted}
                    className="h-5 w-5 accent-violet-800"
                  />
                  <p className={`font-medium text-lg ${item.isCompleted ? "line-through text-gray-500" : "text-black"}`}>
                    {item.todo}
                  </p>
                </div>

                <div className="flex gap-3 mt-3 sm:mt-0">
                  <button
                    onClick={() => handleEdit(item.id)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-1 rounded-md"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded-md"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Body;

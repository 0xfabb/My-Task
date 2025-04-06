import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const API_BASE = import.meta.env.VITE_API_BASE;

const Body = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE}/api/tasks`, {
      credentials: "include", 
    })
      .then((res) => res.json())
      .then((data) => setTodos(data))
      .catch((err) => console.error("Error fetching tasks:", err));
  }, []);
  

  const handleAdd = async () => {
    if (!todo.trim()) return;
    const newTask = { id: uuidv4(), todo, isCompleted: false };
    await fetch(`${API_BASE}/api/addtask`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json"  },
      body: JSON.stringify(newTask),
    });
    setTodos([...todos, newTask]);
    setTodo("");
  };

  const handleDelete = async (id) => {
    await fetch(`${API_BASE}/api/deletetask/${id}`, { method: "DELETE",  credentials: "include", });
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
    const toggled = updatedTodos.find((t) => t.id === id);
    await fetch(`${API_BASE}/api/toggle/${id}`, {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isCompleted: toggled.isCompleted }),
    });
  };

  const handleChange = (e) => setTodo(e.target.value);

  return (
    <div className="px-4 py-6 max-w-2xl mx-auto font-sans">
      <div className="bg-dark2 rounded-2xl p-6 shadow-lg text-white">
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-accent">Add Your Tasks</h1>

        <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
          <input
            onChange={handleChange}
            value={todo}
            type="text"
            className="w-full sm:flex-1 p-2 rounded-md shadow-inner outline-none bg-dark3 text-white placeholder:text-muted"
            placeholder="Add Your TASK"
          />
          <button
            onClick={handleAdd}
            className="w-full sm:w-auto bg-accent hover:bg-teal-500 text-dark1 px-5 py-2 rounded-lg font-medium transition-all"
          >
            Save
          </button>
        </div>

        <div className="mt-6">
          {todos.length > 0 ? (
            <h2 className="text-xl font-semibold text-center text-highlight mb-4">Your Tasks</h2>
          ) : (
            <p className="text-muted font-medium text-center text-lg py-6">No tasks to display</p>
          )}

          <div className="space-y-4">
            {todos.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between bg-dark3 rounded-lg shadow-md p-4"
              >
                <div className="flex items-center gap-4">
                  <input
                    onChange={() => handleCheckbox(item.id)}
                    type="checkbox"
                    checked={item.isCompleted}
                    className="h-5 w-5 accent-accent"
                  />
                  <p
                    className={`font-medium text-lg ${
                      item.isCompleted ? "line-through text-muted" : "text-white"
                    }`}
                  >
                    {item.todo}
                  </p>
                </div>

                <div className="flex gap-3 mt-3 sm:mt-0">
                  <button
                    onClick={() => handleEdit(item.id)}
                    className="bg-highlight hover:bg-yellow-400 text-dark1 px-4 py-1 rounded-md font-semibold"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-danger hover:bg-red-700 text-white px-4 py-1 rounded-md font-semibold"
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

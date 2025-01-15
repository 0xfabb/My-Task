import "react";
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

const Body = () => {
    const [todo, setTodo] = useState("")
    const [todos, setTodos] = useState([])
    const savetoLS = () => {
      localStorage.setItem("todos", JSON.stringify("todos"))
    }
    // useEffect(()=>{
    //   let todostring = localStorage.getItem(todos)
    //   if(todostring){
    //     let todos = JSON.parse(localStorage.getItem("todos"))
    //     setTodo(todos)
    //   }
    // },[])
    const handleEdit = (e,id) => {
      let t = todos.filter(i=>i.id === id)
      setTodo(t[0].todo)
      let newTodos = todos.filter(item=>{
        return item.id!== id
      });
      setTodos(newTodos)
      savetoLS()
    }
    const handleDelete = (e, id) => {
      let newTodos = todos.filter(item=>{
        return item.id!== id
      });
      setTodos(newTodos)
      savetoLS()

    }
    const handleAdd = () => {
      setTodos([...todos, {id: uuidv4(), todo, isCompleted: false}])
      setTodo("")
      savetoLS()
      
      
    }
    const handleChange = (e) => {
      setTodo(e.target.value)
    }
    
    const handleCheckbox = (e) => {
      let id = e.target.name;
      let index = todos.findIndex(item=>{
        return item.id === id;
      })
      let newTodos = [...todos];
      newTodos[index].isCompleted = !newTodos[index].isCompleted;
      setTodos(newTodos)
      savetoLS()

    }


  return (
    <div>
      <div className="todopage mt-6 bg-violet-300 h-1/2 border-5 md:w-1/2 p-6 mx-auto rounded-lg">
        <h1 className="text-3xl font-bold text-black text-center">
          Add Your Tasks
        </h1>
        <input
        onChange={handleChange}
        value={todo}
          type="text"
          className="mt-4 w-3/4 p-2 md:ml-12 mx-auto rounded-md"
          placeholder="Add Your TASK"
        />
        <button onClick={handleAdd} className="ml-3 rounded-lg py-2 bg-violet-800  hover:bg-slate-800 text-white px-3">
          Save
        </button>
        <div className="todos mt-6">
          {todos.length !== 0 && <div className="text-black my-4 font-semibold text-center">Your Tasks</div> }
          {todos.length === 0 && <div className="text-black font-semibold text-center text-lg p-5"> No tasks to Display</div>}
          {todos.map(item=>{
          return <div key={item.id} className="todo flex justify-between ">
            <div className="flex gap-5 my-3.5 font-semibold"> 
              <input onChange={handleCheckbox} id="" name={item.id} type="checkbox" value={item.isCompleted} />
            <div className={item.isCompleted?"line-through": ""}>{item.todo}</div>
            </div>
            <div className="btns flex gap-3">
              <button onClick={(e)=>{handleEdit(e, item.id)}} className="bg-violet-800 rounded-lg ml-3 py-2 px-3 my-2 text-white">Edit</button>
              <button onClick={(e)=> {handleDelete(e,item.id)} }className="bg-violet-800 rounded-lg ml-3 py-2 px-3 my-2 text-white">Delete</button>
            </div>
          </div>
          })}
        </div>
      </div>
    </div>
  );
};

export default Body;

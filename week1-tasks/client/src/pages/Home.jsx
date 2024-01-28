import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUserStart, updateUserSuccess } from "../redux/user/userSlice";
import Header from "./Header";

export default function Home() {
  const { currentUser } = useSelector((state) => state.user);
  const [todo, setTodo] = useState("");
  const [todoItems, setTodoitem] = useState(currentUser.tasks);
  console.log(todoItems);
  const dispatch = useDispatch();
  console.log(todo);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    dispatch(updateUserStart());
    const res = await fetch("/api/user/createTodo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: todo, userId: currentUser._id }),
    });
    setTodo("");
    const data = await res.json();
    console.log(data)
    setTodoitem(data.tasks)
    dispatch(updateUserSuccess(data));
  };

  const handleDelete = async (e) => {
    const updatedTodos = todoItems.filter((todos) => todos._id != e);
    setTodoitem(updatedTodos);

    dispatch(updateUserStart());
    const res = await fetch("/api/user/deleteTodo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ todoId: e, userId: currentUser._id }),
    });
    const data = await res.json();
    dispatch(updateUserSuccess(data));
    console.log(data);
  };

  const handleUpdate = async (e) => {
  
  



    dispatch(updateUserStart());

    const res = await fetch("/api/user/updateTodo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ todoId: e, userId: currentUser._id }),
    });

    const data = await res.json();
    console.log(data);
setTodoitem(data.tasks)
    dispatch(updateUserSuccess(data));
  };

  return (
    <div>
      <Header />

      <div className=" mt-48  flex justify-center  items-center flex-col gap-8">
        <div className="flex justify-center items-center   gap-6">
          <form onSubmit={handleSubmit} className=" ">
            <input
              className=" h-12 w-72    px-3 py-3 bg-[#E8ECF4] backdrop-blur-lg"
              value={todo}
              type="text"
              id="text"
              required
              onChange={(e) => {
                setTodo(e.target.value);
              }}
              placeholder="Enter a new task"
            />
            <button
              className="h-12 px-5 py-3 bg-[#303351] text-white font-medium "
              type="submit"
            >
              Add Todo
            </button>
          </form>
        </div>
        <div className="w-full text-center text-white flex items-center flex-col gap-5">
          <h1 className="text-slate-200 uppercase font-semibold text-2xl">
            Task List
          </h1>
          {todoItems.length?  <div className="w-1/2 bg-[#25273c] backdrop-blur-lg px-3 pt-5 pb-10  rounded-md">
            {todoItems.map((todo) => (
              <div
                key={todo._id}
                className="flex justify-between border-b bg-[#25273c] items-center py-3"
              >
                <li className="list-none w-2/3 text-left break-normal flex items-center">
                  <input
                    className="cursor-pointer  rounded-full border-2 border-gray-400  w-6 h-6 checked:bg-blue-600 checked:border-transparent align-middle mr-2"
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => handleUpdate(todo._id)}
                  />
                  {todo.text}
                </li>

                <div className="flex gap-3">
                  <button
                    className="bg-gray-300 text-red-600 px-2  mr-3 py-2  rounded-md"
                    onClick={() => handleDelete(todo._id)}
                  >
                    Delete
                  </button>
                </div>
            
              </div>
            ))}
          </div>:<p className="text-white">You Have No Todos Left</p>}
        </div>
      </div>
    </div>
  );
}

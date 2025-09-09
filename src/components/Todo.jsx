import React, { useEffect, useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { addTask, deleteTask, fetchTasks } from "../store";
const Todo = () => {
  const tasks = useSelector((state) => state.task);
  const dispatch = useDispatch();
  // console.log("state", tasks);
  const [title, setTitle] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(addTask({ id: Date.now(), title: title }));
    setTitle("");
  };

  const handleDeleteTask = (id) => {
    console.log(id);
    dispatch(deleteTask(id));
  };

  const fetchTasksData = () => {
    dispatch(fetchTasks());
    console.log(fetchTasks());
  };

  // console.log("tasks", tasks);
  return (
    <>
      <div className="container">
        <h1 className="todo-title">Todo App</h1>
        <div className="todo">
          <form onSubmit={handleFormSubmit}>
            <div className="todo-input-group">
              <input
                type="text"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <button>Add</button>
            </div>
          </form>
          <div>
            <h1>
              Todo List:{" "}
              <button className="fetch" onClick={fetchTasksData}>
                Fetch Tasks
              </button>
            </h1>
          </div>
          {/* {tasks["task"].length === 0 && (
            <h1 style={{ color: "red" }} className="no-tasks">
              No tasks found. Please add some tasks.
            </h1>
          )} */}
          <ul className="todo-list">
            {(tasks?.length > 0 &&
              tasks.map((task, index) => (
                <li className="todo-item" key={task.id}>
                  <span>
                    {index + 1}. {task.title}
                  </span>
                  <button onClick={() => handleDeleteTask(task.id)}>
                    <MdDeleteForever />
                  </button>
                </li>
              ))) || (
              <h1 className="no-tasks">
                No tasks found. Please add some tasks.
              </h1>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Todo;

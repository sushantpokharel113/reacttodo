import React, { useState, useEffect } from "react";
import axios from "axios";
function Todos() {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    const fetchTodos = () => {
      axios.get("https://jsonplaceholder.typicode.com/todos").then((resp) => {
        setTodos(resp.data);
      });
    };
    fetchTodos();
  }, []);

  const handleClick = (id) => {
    const updateTodo = todos.find((todo) => todo.id === id);
    updateTodo.completed = !updateTodo.completed;
    setTodos([...todos]);
  };

  const getTodoCount = (type) => {
    return todos.filter((todo) =>
      type === "Completed" ? todo.completed : !todo.completed
    ).length;
  };

  return (
    <>
      <h1>Todos Component</h1>
      <div className="row">
        <span className="col s2 flow-text green-text">
          Completed : {getTodoCount("Completed")}
        </span>
        <span className="col s2">Pending : {getTodoCount("NotCompleted")}</span>
      </div>
      <div className="row">
        <ul className="collection with-header col s6">
          {todos.map((todo) => (
            <li className={`collection-item`} key={todo.id}>
              <div>
                {todo.title}
                <span
                  className="secondary-content"
                  onClick={() => handleClick(todo.id)}
                  style={{ cursor: "pointer" }}
                >
                  <i className="material-icons">
                    {todo.completed ? "check_box" : "check_box_outline_blank"}
                  </i>
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Todos;

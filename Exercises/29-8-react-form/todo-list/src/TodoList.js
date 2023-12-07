import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import NewTodoForm from "./NewTodoForm";

const TodoList = () => {
  const INITIAL_STATE = [
    { id: uuid(), task: "task_1", isCompleted: true },
    { id: uuid(), task: "task_2", isCompleted: false },
  ];
  const [toDoList, setToDoList] = useState(INITIAL_STATE);

  const addTask = ({ task }) => {
    setToDoList((toDoList) => [
      ...toDoList,
      { id: uuid(), task, isCompleted: false },
    ]);
  };

  const deleteTask = (id) => {
    setToDoList(toDoList.filter((t) => t.id !== id));
  };

  const toggleComplete = (id) => {
    setToDoList(
      toDoList.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  };

  return (
    <div>
      <NewTodoForm addTask={addTask} />
      <ul>
        {toDoList.map((todo) => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.isCompleted}
              onChange={() => toggleComplete(todo.id)}
            />
            <span
              style={{
                textDecoration: todo.isCompleted ? "line-through" : "none",
              }}
            >
              {todo.task}{" "}
              {/* Render the 'task' property instead of the object */}
            </span>
            <button onClick={() => deleteTask(todo.id)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;

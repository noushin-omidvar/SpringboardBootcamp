import React, { useState } from "react";

const NewTodoForm = ({ addTask }) => {
  const INITIAL_STATE = {
    id: "",
    task: "",
  };

  const [formData, setFormData] = useState(INITIAL_STATE);

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData((fData) => ({
      ...fData,
      [name]: value,
    }));
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    addTask({ ...formData });
    setFormData(INITIAL_STATE);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="task">Task: </label>
      <input
        id={formData.id}
        name="task"
        placeholder="Task"
        onChange={handleChange}
        value={formData.task}
      />
      <button>Add</button>
    </form>
  );
};

export default NewTodoForm;

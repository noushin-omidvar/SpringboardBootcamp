import React, { useState } from "react";

const NewBoxForm = ({ addBox }) => {
  const INITIAL_STATE = {
    color: "",
    height: "",
    width: "",
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
    addBox(formData);
    setFormData(INITIAL_STATE);
  };

  return (
    <div>
      <h3>Add New Box</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="color">Color: </label>
        <input
          id="color"
          name="color"
          type="text"
          placeholder="Color"
          value={formData.color}
          onChange={handleChange}
        />

        <label htmlFor="height">Height: </label>
        <input
          id="height"
          name="height"
          type="text"
          placeholder="height"
          value={formData.height}
          onChange={handleChange}
        />

        <label htmlFor="width">Width: </label>
        <input
          id="width"
          name="width"
          type="text"
          placeholder="Width"
          value={formData.width}
          onChange={handleChange}
        />

        <button>Add!</button>
      </form>
    </div>
  );
};

export default NewBoxForm;

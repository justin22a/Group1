// src/UserInputForm.js
import React, { useState } from 'react';
import Select from 'react-select'; // React dropdown library

// Dynamically generate time options from 1 to 24 (military time)
const timeOptions = Array.from({ length: 24 }, (_, i) => ({
  value: i + 1,
  label: `${i + 1}:00`,
}));

const UserInputForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    title: '',
    description: '',
    coordinates: '',
    time: '',
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleTimeChange = (selectedOption) => {
    setFormData((prevData) => ({
      ...prevData,
      time: selectedOption ? selectedOption.value : '',
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    // Handle form submission logic here (e.g., send to backend or display on UI)
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <label>Username:</label>
      <input
        type="text"
        name="username"
        placeholder="Enter your username"
        value={formData.username}
        onChange={handleChange}
        style={styles.input}
        required
      />

      <label>Title:</label>
      <input
        type="text"
        name="title"
        placeholder="Enter title"
        value={formData.title}
        onChange={handleChange}
        style={styles.input}
        required
      />

      <label>Description:</label>
      <textarea
        name="description"
        placeholder="Enter description"
        value={formData.description}
        onChange={handleChange}
        style={styles.textarea}
        required
      />

      <label>Coordinates:</label>
      <input
        type="text"
        name="coordinates"
        placeholder="Enter coordinates (e.g., 37.7749, -122.4194)"
        value={formData.coordinates}
        onChange={handleChange}
        style={styles.input}
        required
      />

      <label>Time (1–24 hours):</label>
      <Select
        options={timeOptions}
        onChange={handleTimeChange}
        placeholder="Select hour"
        isClearable
        styles={customSelectStyles}
      />

      <label>Upload Image:</label>
      <input
        type="file"
        name="image"
        accept="image/*"
        onChange={handleChange}
        style={styles.input}
        required
      />

      <button type="submit" style={styles.button}>Submit</button>
    </form>
  );
};

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '300px',
    margin: '20px auto',
  },
  input: {
    marginBottom: '10px',
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  textarea: {
    marginBottom: '10px',
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    minHeight: '80px',
  },
  button: {
    padding: '10px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

const customSelectStyles = {
  control: (base) => ({
    ...base,
    marginBottom: '10px',
  }),
};

export default UserInputForm;

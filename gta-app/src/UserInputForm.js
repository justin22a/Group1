import React, { useState } from 'react';
import Select from 'react-select';
import axios from 'axios'; // Axios to send data to the backend

const timeOptions = Array.from({ length: 24 }, (_, i) => ({
  value: i + 1,
  label: `${i + 1}:00`,
}));

const API_KEY = 'ab06ae4881d044f28cef4879aca8c550'; // OpenCage API Key

const UserInputForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    title: '',
    description: '',
    address: '',
    latitude: '',
    longitude: '',
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

  const fetchCoordinates = async () => {
    if (!formData.address) return alert('Please enter an address.');
    try {
      const response = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
          formData.address
        )}&key=${API_KEY}`
      );
      const location = response.data.results[0]?.geometry;
      if (location) {
        setFormData((prevData) => ({
          ...prevData,
          latitude: location.lat,
          longitude: location.lng,
        }));
      } else {
        alert('Coordinates not found for the provided address.');
      }
    } catch (error) {
      console.error('Error fetching coordinates:', error);
      alert('Failed to fetch coordinates. Please try again.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload

    try {
      let imageBase64 = null;

      // Convert image to base64 if an image file is provided
      if (formData.image) {
        imageBase64 = await toBase64(formData.image);
      }

      // Prepare data to send
      const dataToSend = {
        ...formData,
        latitude: parseFloat(formData.latitude), // Convert to number
        longitude: parseFloat(formData.longitude), // Convert to number
        image: imageBase64, // Send image as base64 if available
      };

      const response = await axios.post(
        'http://localhost:3000/submit',
        dataToSend
      );

      console.log(response.data.message); // Log success message
      alert('Data submitted successfully!');
    } catch (error) {
      console.error('Error submitting data:', error);
      alert('Failed to submit data.');
    }
  };

  const toBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
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

      <label>Address:</label>
      <input
        type="text"
        name="address"
        placeholder="Enter address"
        value={formData.address}
        onChange={handleChange}
        style={styles.input}
      />
      <button type="button" onClick={fetchCoordinates} style={styles.button}>
        Fetch Coordinates
      </button>

      <label>Latitude:</label>
      <input
        type="number"
        name="latitude"
        placeholder="Enter latitude (e.g., 37.7749)"
        value={formData.latitude}
        onChange={handleChange}
        style={styles.input}
        required
        step="any"
      />

      <label>Longitude:</label>
      <input
        type="number"
        name="longitude"
        placeholder="Enter longitude (e.g., -122.4194)"
        value={formData.longitude}
        onChange={handleChange}
        style={styles.input}
        required
        step="any"
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
      />

      <button type="submit" style={styles.button}>
        Submit
      </button>
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
    marginBottom: '10px',
  },
};

const customSelectStyles = {
  control: (base) => ({
    ...base,
    marginBottom: '10px',
  }),
};

export default UserInputForm;

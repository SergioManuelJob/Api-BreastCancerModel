import React, { useState } from 'react';
import './styles.css';
import axios from 'axios';

const Formulario = () => {
  const [formData, setFormData] = useState({
    texture_worst: '',
    area_worst: '',
    smoothness_worst: '',
    concavity_worst: '',
  });
  const [prediction, setPrediction] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    const numberRegex = /^-?\d*\.?\d+$/;

    if (numberRegex.test(value) || value === '') {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:5000/api', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response.data)
      setPrediction(response.data);
    } catch (error) {
      console.error('Error al realizar la predicción:', error);
    }
  };

  return (
    <div className='Contenedor'>
      <h1>Formulario de Predicción</h1>
      <form onSubmit={handleSubmit}>

      <div className="input-group">
        <label>
          Texture Worst:
          <input type="number" name="texture_worst" value={formData.texture_worst} onChange={handleChange} />
        </label>
      </div>

      <div className="input-group">
        <label>
          Area Worst:
          <input type="number" name="area_worst" value={formData.area_worst} onChange={handleChange} />
        </label>
      </div>

      <div className="input-group">
        <label>
          Smoothness Worst:
          <input type="number" name="smoothness_worst" value={formData.smoothness_worst} onChange={handleChange} />
        </label>
      </div>

      <div className="input-group">
        <label>
          Concavity Worst:
          <input type="number" name="concavity_worst" value={formData.concavity_worst} onChange={handleChange} />
        </label>
      </div>

        <button type="submit">Predecir</button>
      </form>

      {prediction && (
        <div className='resultado'>
          <h2>Resultado de la Predicción:</h2>
          <p>{prediction}</p>
        </div>
      )}
    </div>
  );
};

export default Formulario;
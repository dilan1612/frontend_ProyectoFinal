import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/authService';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  // Manejar cambios en los campos del formulario
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Iniciando sesión con los datos:', formData); // Log para depuración

      // Llamada al servicio de autenticación
      const response = await loginUser(formData);

      console.log('Respuesta del servidor:', response); // Log para depuración

      // Guardar el token en el almacenamiento local
      localStorage.setItem('token', response.token);

      console.log('Token guardado en localStorage:', localStorage.getItem('token')); // Log para verificar el token

      // Redirigir al Dashboard
      navigate('/dashboard', { replace: true });
    } catch (error) {
      console.error('Error al iniciar sesión:', error); // Log de errores
      setErrorMessage(error.response?.data?.error || 'Error al iniciar sesión');
    }
  };

  return (
      <div>
        <h1>Iniciar Sesión</h1>

        {/* Mostrar mensaje de error si ocurre */}
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

        <form onSubmit={handleSubmit}>
          <label>
            Correo Electrónico:
            <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
            />
          </label>
          <br />
          <label>
            Contraseña:
            <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
            />
          </label>
          <br />
          <button type="submit">Ingresar</button>
        </form>

        <p>
          ¿No tienes una cuenta? <a href="/register">Regístrate aquí</a>
        </p>
      </div>
  );
};

export default Login;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/authService';
import { Link } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
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
            console.log('Intentando registrar usuario:', formData); // Log para depuración

            // Llamada al servicio de registro
            await registerUser(formData);

            alert('Usuario registrado con éxito');
            setErrorMessage(''); // Limpia cualquier error previo
            navigate('/login'); // Redirige al login
        } catch (error) {
            console.error('Error al registrar usuario:', error); // Log de errores
            setErrorMessage(error.response?.data?.error || 'Error al registrar usuario');
        }
    };

    return (
        <div>
            <h1>Registro</h1>

            {/* Mostrar mensaje de error si ocurre */}
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

            <form onSubmit={handleSubmit}>
                <label>
                    Nombre:
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />
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
                <button type="submit">Registrarse</button>

                <h2>Ir a otras vistas:</h2>
                  <Link to="/CreateDepartment">
                    <button>Ir a Departamentos</button>
                  </Link>
                  <Link to="/createBudget">
                    <button>Ir a Presupuesto</button>
                  </Link>
            </form>
        </div>
    );
};

export default Register;

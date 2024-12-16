import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ActivitiesPanel = () => {
    const { departmentId } = useParams(); // Captura el ID del departamento desde la URL
    const [activities, setActivities] = useState([]);
    const [departmentName, setDepartmentName] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true); // Estado de carga
    const navigate = useNavigate();

    useEffect(() => {
        fetchDepartmentData();
    }, []);

    // Obtener actividades y el nombre del departamento
    const fetchDepartmentData = async () => {
        try {
            setLoading(true); // Inicia el estado de carga

            // Hacer ambas solicitudes en paralelo
            const [activitiesResponse, departmentResponse] = await Promise.all([
                axios.get(`http://localhost:5000/api/activities/${departmentId}`),
                axios.get(`http://localhost:5000/api/departments/${departmentId}`),
            ]);

            // Actualizar estados con los datos obtenidos
            setActivities(activitiesResponse.data);
            setDepartmentName(departmentResponse.data.name);
        } catch (error) {
            console.error('Error al cargar los datos del departamento:', error);
            setError('Hubo un problema al cargar los datos del departamento.');
        } finally {
            setLoading(false); // Finaliza el estado de carga
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
            <h1>Actividades de {departmentName || 'Departamento desconocido'}</h1>

            {/* Mostrar error si ocurre */}
            {error && <p style={{ color: 'red', fontWeight: 'bold' }}>{error}</p>}

            {/* Botón para volver al Dashboard */}
            <button
                onClick={() => navigate('/dashboard')}
                style={{
                    marginBottom: '20px',
                    backgroundColor: '#007bff',
                    color: '#fff',
                    border: 'none',
                    padding: '10px 15px',
                    borderRadius: '5px',
                    cursor: 'pointer',
                }}
            >
                Volver al Dashboard
            </button>

            {/* Mostrar actividades o mensaje de no registros */}
            {loading ? (
                <p>Cargando actividades...</p>
            ) : activities.length > 0 ? (
                <div>
                    {activities.map((activity) => (
                        <div
                            key={activity._id}
                            style={{
                                border: '1px solid #ccc',
                                padding: '15px',
                                borderRadius: '8px',
                                marginBottom: '10px',
                                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                            }}
                        >
                            <h3>{activity.name}</h3>
                            <p>
                                <strong>Presupuesto:</strong> {activity.budget}
                            </p>
                            <p>
                                <strong>Descripción:</strong> {activity.description || 'Sin descripción'}
                            </p>
                        </div>
                    ))}
                </div>
            ) : (
                !error && <p>No hay actividades registradas para este departamento.</p>
            )}
        </div>
    );
};

export default ActivitiesPanel;

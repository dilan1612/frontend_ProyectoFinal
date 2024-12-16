import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
    // Estados para departamentos
    const [departments, setDepartments] = useState([]);
    const [departmentName, setDepartmentName] = useState('');
    const [departmentBudget, setDepartmentBudget] = useState('');

    // Estados para actividades
    const [activityName, setActivityName] = useState('');
    const [activityDepartment, setActivityDepartment] = useState('');
    const [activityBudget, setActivityBudget] = useState('');
    const [activityDescription, setActivityDescription] = useState('');

    // Estado para modificar presupuesto
    const [selectedDepartment, setSelectedDepartment] = useState('');
    const [budgetAdjustment, setBudgetAdjustment] = useState('');

    // Mensajes de éxito, error y estado de carga
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate(); // Hook para la navegación

    // Cargar departamentos al inicio
    useEffect(() => {
        fetchDepartments();
    }, []);

    // Función para cargar departamentos
    const fetchDepartments = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:5000/api/departments');
            setDepartments(response.data);
        } catch (error) {
            console.error('Error al cargar los departamentos:', error);
            setError('No se pudieron cargar los departamentos.');
        } finally {
            setLoading(false);
        }
    };

    // Función para crear un nuevo departamento
    const handleCreateDepartment = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            await axios.post('http://localhost:5000/api/departments/create', {
                name: departmentName,
                totalBudget: parseFloat(departmentBudget),
            });
            setMessage('Departamento creado con éxito.');
            setError('');
            setDepartmentName('');
            setDepartmentBudget('');
            fetchDepartments(); // Actualizar la lista de departamentos
        } catch (error) {
            console.error('Error al crear el departamento:', error);
            setError('Error al crear el departamento.');
            setMessage('');
        } finally {
            setLoading(false);
        }
    };

    // Función para crear una nueva actividad
    const handleCreateActivity = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            await axios.post('http://localhost:5000/api/activities/create', {
                name: activityName,
                departmentId: activityDepartment,
                budget: parseFloat(activityBudget),
                description: activityDescription,
            });
            setMessage('Actividad creada con éxito.');
            setError('');
            setActivityName('');
            setActivityDepartment('');
            setActivityBudget('');
            setActivityDescription('');
        } catch (error) {
            console.error('Error al crear la actividad:', error);
            setError('Error al crear la actividad.');
            setMessage('');
        } finally {
            setLoading(false);
        }
    };

    // Función para modificar el presupuesto de un departamento
    const handleAdjustBudget = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            await axios.put(`http://localhost:5000/api/departments/${selectedDepartment}/update-budget`, {
                amount: parseFloat(budgetAdjustment),
            });
            setMessage('Presupuesto actualizado con éxito.');
            setError('');
            setSelectedDepartment('');
            setBudgetAdjustment('');
            fetchDepartments(); // Actualizar la lista de departamentos
        } catch (error) {
            console.error('Error al actualizar el presupuesto:', error);
            setError('Error al actualizar el presupuesto.');
            setMessage('');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Gestión de Rubros Presupuestales</h1>

            {/* Mostrar mensajes de éxito o error */}
            {message && <div style={{ color: 'green' }}>{message}</div>}
            {error && <div style={{ color: 'red' }}>{error}</div>}

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                {/* Formulario para crear departamentos */}
                <div
                    style={{
                        border: '1px solid #ccc',
                        padding: '20px',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                        flex: '1 1 calc(45% - 20px)',
                        minWidth: '300px',
                    }}
                >
                    <h2>Crear Departamento</h2>
                    <form onSubmit={handleCreateDepartment}>
                        <div>
                            <label>Nombre del Departamento:</label>
                            <input
                                type="text"
                                value={departmentName}
                                onChange={(e) => setDepartmentName(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label>Presupuesto Total:</label>
                            <input
                                type="number"
                                min="1"
                                value={departmentBudget}
                                onChange={(e) => setDepartmentBudget(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" disabled={loading}>Crear Departamento</button>
                    </form>
                </div>

                {/* Formulario para crear actividades */}
                <div
                    style={{
                        border: '1px solid #ccc',
                        padding: '20px',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                        flex: '1 1 calc(45% - 20px)',
                        minWidth: '300px',
                    }}
                >
                    <h2>Crear Actividad</h2>
                    <form onSubmit={handleCreateActivity}>
                        <div>
                            <label>Nombre de la Actividad:</label>
                            <input
                                type="text"
                                value={activityName}
                                onChange={(e) => setActivityName(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label>Departamento:</label>
                            <select
                                value={activityDepartment}
                                onChange={(e) => setActivityDepartment(e.target.value)}
                                required
                            >
                                <option value="">Seleccione un departamento</option>
                                {departments.map((department) => (
                                    <option key={department._id} value={department._id}>
                                        {department.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label>Presupuesto Asignado:</label>
                            <input
                                type="number"
                                min="1"
                                value={activityBudget}
                                onChange={(e) => setActivityBudget(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label>Descripción de la Actividad:</label>
                            <textarea
                                value={activityDescription}
                                onChange={(e) => setActivityDescription(e.target.value)}
                            />
                        </div>
                        <button type="submit" disabled={loading}>Crear Actividad</button>
                    </form>
                </div>

                {/* Formulario para modificar presupuesto */}
                <div
                    style={{
                        border: '1px solid #ccc',
                        padding: '20px',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                        flex: '1 1 calc(45% - 20px)',
                        minWidth: '300px',
                    }}
                >
                    <h2>Modificar Presupuesto</h2>
                    <form onSubmit={handleAdjustBudget}>
                        <div>
                            <label>Departamento:</label>
                            <select
                                value={selectedDepartment}
                                onChange={(e) => setSelectedDepartment(e.target.value)}
                                required
                            >
                                <option value="">Seleccione un departamento</option>
                                {departments.map((department) => (
                                    <option key={department._id} value={department._id}>
                                        {department.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label>Monto a Ajustar (positivo o negativo):</label>
                            <input
                                type="number"
                                value={budgetAdjustment}
                                onChange={(e) => setBudgetAdjustment(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" disabled={loading}>Actualizar Presupuesto</button>
                    </form>
                </div>
            </div>

            {/* Mostrar departamentos como tarjetas */}
            <section>
                <h2>Departamentos Existentes</h2>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                    {loading ? (
                        <p>Cargando departamentos...</p>
                    ) : departments.length > 0 ? (
                        departments.map((department) => (
                            <div
                                key={department._id}
                                style={{
                                    border: '1px solid #ccc',
                                    padding: '20px',
                                    borderRadius: '8px',
                                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                                    minWidth: '300px',
                                    textAlign: 'center',
                                }}
                            >
                                <h3>{department.name}</h3>
                                <p>
                                    <strong>Presupuesto Total:</strong> {department.totalBudget}
                                </p>
                                <p>
                                    <strong>Presupuesto Disponible:</strong> {department.remainingBudget}
                                </p>
                                <button
                                    onClick={() => navigate(`/departments/${department._id}/activities`)}
                                    style={{
                                        backgroundColor: '#007BFF',
                                        color: '#fff',
                                        border: 'none',
                                        padding: '10px 15px',
                                        borderRadius: '4px',
                                        cursor: 'pointer',
                                    }}
                                >
                                    Consultar Actividades
                                </button>
                            </div>
                        ))
                    ) : (
                        <p>No hay departamentos registrados.</p>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Dashboard;

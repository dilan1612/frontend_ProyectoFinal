import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/formulario.css';

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [activityData, setActivityData] = useState({ name: '', budget: '', description: '', departmentId: '' });
  const [departments, setDepartments] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  // Obtener actividades por departamento
  const fetchActivities = async (departmentId) => {
    if (!departmentId) {
      console.error('El ID del departamento no es válido');
      return;
    }

    try {
      const response = await fetch(`https://backend-proyectofinal-4qkh.onrender.com/${departmentId}`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'No se pudieron obtener las actividades');
      }
      const data = await response.json();
      setActivities(data);
    } catch (error) {
      console.error('Error al obtener las actividades:', error.message);
    }
  };

  // Obtener departamentos
  const fetchDepartments = async () => {
    try {
      const response = await fetch('https://backend-proyectofinal-4qkh.onrender.com/departments');
      if (!response.ok) {
        throw new Error('No se pudieron obtener los departamentos');
      }
      const data = await response.json();
      setDepartments(data);
    } catch (error) {
      console.error('Error al obtener los departamentos:', error);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  // Manejar cambios en los campos del formulario
  const handleChange = (e) => {
    setActivityData({ ...activityData, [e.target.name]: e.target.value });
  };

  // Guardar o actualizar actividad
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!activityData.name || !activityData.budget || !activityData.departmentId) {
      alert('Por favor, complete todos los campos.');
      return;
    }

    try {
      let response;
      if (currentId) {
        response = await fetch(`https://backend-proyectofinal-4qkh.onrender.com/activities/${currentId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(activityData),
        });
      } else {
        response = await fetch('https://backend-proyectofinal-4qkh.onrender.com/activities', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(activityData),
        });
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al guardar la actividad');
      }

      alert(`Actividad ${currentId ? 'actualizada' : 'creada'} con éxito.`);
      setModalVisible(false);
      setActivityData({ name: '', budget: '', description: '', departmentId: '' });
      setCurrentId(null);
      fetchActivities(activityData.departmentId); // Actualizar la lista de actividades
    } catch (error) {
      console.error('Error al guardar la actividad:', error);
      alert('Hubo un error al guardar la actividad');
    }
  };

  // Eliminar actividad
  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar esta actividad?')) return;

    try {
      const response = await fetch(`https://backend-proyectofinal-4qkh.onrender.com/activities/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al eliminar la actividad');
      }

      alert('Actividad eliminada con éxito.');
      fetchActivities(activityData.departmentId); // Actualizar la lista de actividades
    } catch (error) {
      console.error('Error al eliminar la actividad:', error);
      alert('Hubo un error al eliminar la actividad');
    }
  };

  // Abrir modal para editar o crear
  const openModal = (id = null) => {
    setModalVisible(true);
    if (id) {
      const activity = activities.find((act) => act._id === id);
      if (activity) {
        setActivityData({
          name: activity.name,
          budget: activity.budget,
          description: activity.description,
          departmentId: activity.department._id,
        });
        setCurrentId(activity._id);
      }
    } else {
      setActivityData({ name: '', budget: '', description: '', departmentId: '' });
      setCurrentId(null);
    }
  };

  // Cerrar modal
  const closeModal = () => {
    setModalVisible(false);
    setActivityData({ name: '', budget: '', description: '', departmentId: '' });
    setCurrentId(null);
  };

  return (
    <div>
      <h1>Gestión de Actividades</h1>
      <button onClick={() => openModal()}>Crear Actividad</button>
      <select onChange={(e) => fetchActivities(e.target.value)} value={activityData.departmentId} required>
        <option value="">Seleccionar Departamento</option>
        {departments.map((department) => (
          <option key={department._id} value={department._id}>
            {department.name}
          </option>
        ))}
      </select>

      {/* Botones de redirección a otras vistas */}
      <div>
  <h2>Ir a otras vistas:</h2>
  <Link to="/CreateDepartment">
    <button>Ir a Departamentos</button>
  </Link>
  <Link to="/createBudget">
    <button>Ir a Presupuesto</button>
  </Link>
</div>

      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Presupuesto</th>
            <th>Departamento</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {activities.map((activity) => (
            <tr key={activity._id}>
              <td>{activity.name}</td>
              <td>{activity.budget}</td>
              <td>{activity.department.name}</td>
              <td>
                <button onClick={() => openModal(activity._id)}>Editar</button>
                <button onClick={() => handleDelete(activity._id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {modalVisible && (
        <div className="modal">
          <h2>{currentId ? 'Editar Actividad' : 'Crear Actividad'}</h2>
          <form onSubmit={handleSubmit}>
            <label>
              Nombre:
              <input type="text" name="name" value={activityData.name} onChange={handleChange} required />
            </label>
            <label>
              Presupuesto:
              <input type="number" name="budget" value={activityData.budget} onChange={handleChange} required />
            </label>
            <label>
              Descripción:
              <textarea name="description" value={activityData.description} onChange={handleChange} />
            </label>
            <label>
              Departamento:
              <select name="departmentId" value={activityData.departmentId} onChange={handleChange} required>
                <option value="">Seleccionar Departamento</option>
                {departments.map((department) => (
                  <option key={department._id} value={department._id}>
                    {department.name}
                  </option>
                ))}
              </select>
            </label>
            <button type="submit">{currentId ? 'Actualizar' : 'Guardar'}</button>
            <button type="button" onClick={closeModal}>
              Cancelar
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Activities;

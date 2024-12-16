import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/formulario.css';

const Departments = () => {
  const [departments, setDepartments] = useState([]);
  const [departmentData, setDepartmentData] = useState({ name: '', totalBudget: '' });
  const [modalVisible, setModalVisible] = useState(false);
  const [currentId, setCurrentId] = useState(null);

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
    setDepartmentData({ ...departmentData, [e.target.name]: e.target.value });
  };

  // Guardar o actualizar departamento
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!departmentData.name || !departmentData.totalBudget) {
      alert('Por favor, complete todos los campos.');
      return;
    }

    try {
      let response;
      if (currentId) {
        response = await fetch(`https://backend-proyectofinal-4qkh.onrender.com/departments/${currentId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(departmentData),
        });
      } else {
        response = await fetch('https://backend-proyectofinal-4qkh.onrender.com/departments', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(departmentData),
        });
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al guardar el departamento');
      }

      alert(`Departamento ${currentId ? 'actualizado' : 'creado'} con éxito.`);
      setModalVisible(false);
      setDepartmentData({ name: '', totalBudget: '' });
      setCurrentId(null);
      fetchDepartments(); // Actualizar la lista
    } catch (error) {
      console.error('Error al guardar el departamento:', error);
      alert('Hubo un error al guardar el departamento');
    }
  };

  // Eliminar departamento
  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar este departamento?')) return;

    try {
      const response = await fetch(`https://backend-proyectofinal-4qkh.onrender.com/departments/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al eliminar el departamento');
      }

      alert('Departamento eliminado con éxito.');
      fetchDepartments(); // Actualizar la lista
    } catch (error) {
      console.error('Error al eliminar el departamento:', error);
      alert('Hubo un error al eliminar el departamento');
    }
  };

  // Abrir modal para editar o crear
  const openModal = (id = null) => {
    setModalVisible(true);
    if (id) {
      const department = departments.find((dep) => dep._id === id);
      if (department) {
        setDepartmentData({ name: department.name, totalBudget: department.totalBudget });
        setCurrentId(department._id);  // Asegurarse de usar el _id
      }
    } else {
      setDepartmentData({ name: '', totalBudget: '' });
      setCurrentId(null);
    }
  };

  // Cerrar modal
  const closeModal = () => {
    setModalVisible(false);
    setDepartmentData({ name: '', totalBudget: '' });
    setCurrentId(null);
  };

  return (
    <div>
      <h1>Gestión de Departamentos</h1>

<h2>Ir a otras vistas:</h2>
      <Link to="/createBudget">
        <button>Ir a presupuestos</button>
      </Link>
      <Link to="/CreateActivity">
        <button>Ir a actividades</button>
      </Link>
    

      <button onClick={() => openModal()}>Crear Departamento</button>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Presupuesto Total</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {departments.map((department) => (
            <tr key={department._id}>
              <td>{department.name}</td>
              <td>{department.totalBudget}</td>
              <td>
                <button onClick={() => openModal(department._id)}>Editar</button>
                <button onClick={() => handleDelete(department._id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {modalVisible && (
        <div className="modal">
          <h2>{currentId ? 'Editar Departamento' : 'Crear Departamento'}</h2>
          <form onSubmit={handleSubmit}>
            <label>
              Nombre:
              <input
                type="text"
                name="name"
                value={departmentData.name}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Presupuesto Total:
              <input
                type="number"
                name="totalBudget"
                value={departmentData.totalBudget}
                onChange={handleChange}
                required
              />
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

export default Departments;

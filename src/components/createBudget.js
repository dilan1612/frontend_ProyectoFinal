import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/formulario.css'

const Budgets = () => {
  const [budgets, setBudgets] = useState([]);
  const [budgetData, setBudgetData] = useState({ name: '', allocatedAmount: '', spentAmount: 0 });
  const [modalVisible, setModalVisible] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  // Obtener presupuestos
  const fetchBudgets = async () => {
    try {
      const response = await fetch('https://backend-proyectofinal-4qkh.onrender.com/budgets');
      if (!response.ok) {
        throw new Error('No se pudieron obtener los presupuestos');
      }
      const data = await response.json();
      setBudgets(data);
    } catch (error) {
      console.error('Error al obtener los presupuestos:', error);
    }
  };

  useEffect(() => {
    fetchBudgets();
  }, []);

  // Manejar cambios en los campos del formulario
  const handleChange = (e) => {
    setBudgetData({ ...budgetData, [e.target.name]: e.target.value });
  };

  // Guardar o actualizar presupuesto
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!budgetData.name || !budgetData.allocatedAmount) {
      alert('Por favor, complete todos los campos.');
      return;
    }

    try {
      let response;
      if (currentId) {
        response = await fetch(`https://backend-proyectofinal-4qkh.onrender.com/budgets/${currentId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(budgetData),
        });
      } else {
        response = await fetch('https://backend-proyectofinal-4qkh.onrender.com/budgets', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(budgetData),
        });
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al guardar el presupuesto');
      }

      alert(`Presupuesto ${currentId ? 'actualizado' : 'creado'} con éxito.`);
      setModalVisible(false);
      setBudgetData({ name: '', allocatedAmount: '', spentAmount: 0 });
      setCurrentId(null);
      fetchBudgets(); // Actualizar la lista
    } catch (error) {
      console.error('Error al guardar el presupuesto:', error);
      alert('Hubo un error al guardar el presupuesto');
    }
  };

  // Eliminar presupuesto
  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar este presupuesto?')) return;

    try {
      const response = await fetch(`https://backend-proyectofinal-4qkh.onrender.com/budgets/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al eliminar el presupuesto');
      }

      alert('Presupuesto eliminado con éxito.');
      fetchBudgets(); // Actualizar la lista
    } catch (error) {
      console.error('Error al eliminar el presupuesto:', error);
      alert('Hubo un error al eliminar el presupuesto');
    }
  };

  // Abrir modal para editar o crear
  const openModal = (id = null) => {
    setModalVisible(true);
    if (id) {
      const budget = budgets.find((bud) => bud._id === id);
      if (budget) {
        setBudgetData({ name: budget.name, allocatedAmount: budget.allocatedAmount, spentAmount: budget.spentAmount });
        setCurrentId(budget._id);  // Asegurarse de usar el _id
      }
    } else {
      setBudgetData({ name: '', allocatedAmount: '', spentAmount: 0 });
      setCurrentId(null);
    }
  };

  // Cerrar modal
  const closeModal = () => {
    setModalVisible(false);
    setBudgetData({ name: '', allocatedAmount: '', spentAmount: 0 });
    setCurrentId(null);
  };

  return (
    <div>
      <h1>Gestión de Presupuestos</h1>
    

    <h2>Ir a otras vistas:</h2>
      <Link to="/CreateDepartment">
        <button>Ir a Departamentos</button>
      </Link>
      <Link to="/CreateActivity">
        <button>Ir a actividades</button>
      </Link>
    


      <button onClick={() => openModal()}>Crear Presupuesto</button>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Monto Asignado</th>
            <th>Monto Gastado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {budgets.map((budget) => (
            <tr key={budget._id}>
              <td>{budget.name}</td>
              <td>{budget.allocatedAmount}</td>
              <td>{budget.spentAmount}</td>
              <td>
                <button onClick={() => openModal(budget._id)}>Editar</button>
                <button onClick={() => handleDelete(budget._id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {modalVisible && (
        <div className="modal">
          <h2>{currentId ? 'Editar Presupuesto' : 'Crear Presupuesto'}</h2>
          <form onSubmit={handleSubmit}>
            <label>
              Nombre:
              <input
                type="text"
                name="name"
                value={budgetData.name}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Monto Asignado:
              <input
                type="number"
                name="allocatedAmount"
                value={budgetData.allocatedAmount}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Monto Gastado:
              <input
                type="number"
                name="spentAmount"
                value={budgetData.spentAmount}
                onChange={handleChange}
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

export default Budgets;

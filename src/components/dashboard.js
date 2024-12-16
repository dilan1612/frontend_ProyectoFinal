import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <h1>Dashboard de Gestión</h1>
      <p>Bienvenido al panel de gestión de actividades, presupuestos y departamentos.</p>
      <div className="links">
        <Link to="../components/CreateActivity.js">
          <button className="navigate-button">Ir a Actividades</button>
        </Link>
        <Link to="../components/createBudget.js">
          <button className="navigate-button">Ir a Presupuesto</button>
        </Link>
        <Link to="../components/CreateDepartment.js">
          <button className="navigate-button">Ir a Departamentos</button>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;

import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import ActivitiesPanel from './pages/ActivitiesPanel'; // Ruta adicional si manejas actividades
import CreateBudget from './components/createBudget';
import CreateDepartment from './components/CreateDepartment';
import CreateActivity from './components/CreateActivity';
import BudgetPieChart from './components/BudgetPieChart';


const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

    useEffect(() => {
        const handleStorageChange = () => {
            setIsAuthenticated(!!localStorage.getItem('token'));
            console.log('Token detectado en localStorage:', localStorage.getItem('token'));
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    return (
        <Router>
            <Routes>
                {/* Redirige según autenticación */}
                <Route
                    path="/"
                    element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />}
                />
                {/* Rutas de Login y Registro */}
                <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
                <Route path="/register" element={<Register />} />
                {/* Dashboard protegido */}
                <Route
                    path="/dashboard"
                    element={
                        isAuthenticated ? <Dashboard /> : <Navigate to="/login" replace />
                    }
                />
                {/* Actividades protegidas */}
                <Route
                    path="/departments/:departmentId/activities"
                    element={
                        isAuthenticated ? <ActivitiesPanel /> : <Navigate to="/login" replace />
                    }
                />
                {/* 404 */}
                <Route
                    path="*"
                    element={<h1 style={{ textAlign: 'center', marginTop: '20px' }}>404 - Página no encontrada</h1>}
                />
                   <Route path="createBudget" element={<CreateBudget/>} />
                   <Route path="createDepartment" element={<CreateDepartment/>} />
                   <Route path="createActivity" element={<CreateActivity/>} />
                   <Route path="budgetpie" element={<BudgetPieChart/>} />
                   
            </Routes>
        </Router>
    );
};

export default App;

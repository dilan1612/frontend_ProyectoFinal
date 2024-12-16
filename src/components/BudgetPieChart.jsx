import React from 'react';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';

const BudgetPieChart = ({ activities, totalBudget }) => {
    // Calcular el gasto total de actividades
    const totalSpent = activities.reduce((sum, activity) => sum + activity.budget, 0);
    const remainingBudget = totalBudget - totalSpent;

    // Datos para el gráfico
    const data = {
        labels: ['Gasto en Actividades', 'Presupuesto Restante'],
        datasets: [
            {
                data: [totalSpent, remainingBudget],
                backgroundColor: ['#FF6384', '#36A2EB'], // Colores del gráfico
                hoverBackgroundColor: ['#FF6384', '#36A2EB'],
            },
        ],
    };

    return (
        <div style={{ marginTop: '30px' }}>
            <h3>Distribución del Presupuesto</h3>
            <Pie data={data} />
        </div>
    );
};

export default BudgetPieChart;

import React, { useEffect, useState } from 'react';
import { getBudgets, deleteBudget } from '../services/budgetService';

const BudgetList = () => {
  const [budgets, setBudgets] = useState([]);

  useEffect(() => {
    const fetchBudgets = async () => {
      const data = await getBudgets();
      setBudgets(data);
    };
    fetchBudgets();
  }, []);

  const handleDelete = async (id) => {
    await deleteBudget(id);
    setBudgets(budgets.filter((budget) => budget._id !== id));
  };

  return (
    <div>
      <h2>Lista de Presupuestos</h2>
      <ul>
        {budgets.map((budget) => (
          <li key={budget._id}>
            {budget.name} - {budget.allocatedAmount} - {budget.spentAmount}
            <button onClick={() => handleDelete(budget._id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BudgetList;

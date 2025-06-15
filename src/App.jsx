import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AuthPage from './pages/Auth';
import Dashboard from './pages/Dashboard';
import Categories from './pages/Categories';
import BudgetRecords from './pages/BudgetRecord';
import ExpenseRecords from './pages/ExpenseRecord';

function App() {

  const token = useSelector((state) => state.auth.token);

  console.log("Token from Redux store:", token);

  return (
    <Router>
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        <Route
          path="/"
          element={token ? <Dashboard /> : <Navigate to="/auth" replace />}
        />
        <Route path="/categories" element={<Categories />} />
        <Route path="/budget-records" element={<BudgetRecords />} />
        <Route path="/expense-records" element={<ExpenseRecords />} />
      </Routes>
    </Router>
  );
}

export default App;

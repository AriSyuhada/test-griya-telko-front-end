import { Route, Routes } from 'react-router-dom';
import './App.css';
import Landing from './pages/Landing';
import Error from './pages/Error';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './hooks/useAuthContext';
import Navbar from './components/Navbar';

function App() {

  return (
    <div className="App">
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path='/' element={ <Landing /> } errorElement={ <Error /> } />
          <Route path='/login' element={ <Login /> } />
          <Route path='/dashboard/*' element={ 
            <ProtectedRoute>
              <Dashboard /> 
            </ProtectedRoute>
          } />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;

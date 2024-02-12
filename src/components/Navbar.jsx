import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
  };

  const handleLogin = () => {
    navigate('/login');
  };
  
  return (
    <div id="navbar" className="flex flex-row justify-between items-center bg-white lg px-8 py-4">
      <Link to='/' className="text-lg font-extrabold uppercase text-slate-800">Real <span className="text-emerald-600">Estate</span> App</Link>
      <div className="flex flex-row gap-4">
        { user ? 
            <>
              <Link to='/dashboard' className="cursor-pointer px-4 py-2 bg-white hover:bg-emerald-400 border-2 border-solid border-emerald-600 hover:border-emerald-400 rounded-lg text-emerald-600 hover:text-white font-bold">Dashboard</Link>
              <button onClick={handleLogout} className="cursor-pointer px-4 py-2 bg-emerald-600 hover:bg-emerald-400 border-2 border-solid border-emerald-600 hover:border-emerald-400 rounded-lg text-white font-bold">Logout</button>
            </>
          :
            <button onClick={handleLogin} className="cursor-pointer px-4 py-2 bg-emerald-600 hover:bg-emerald-400 border-2 border-solid border-emerald-600 hover:border-emerald-400 rounded-lg text-white font-bold">Login</button>
        }
      </div>
    </div>
  );
}
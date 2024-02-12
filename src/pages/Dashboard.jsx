import { Link, Route, Routes, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuthContext";
import SalesAccount from "./SalesAccount";
import Package from "./Package";
import Customer from "./Customer";
import { FaUserGear, FaFileContract, FaCreditCard } from "react-icons/fa6";

export default function Dashboard() {
  const { user } = useAuth();
  const location = useLocation();

  return (
    <div id="dashboard-page" className="min-h-[calc(100vh-76px)] flex flex-row">
      <div className="flex flex-col items-center gap-4 basis-64 bg-white py-8">
        <h2 className=" self-start px-8 font-semibold text-xl">Navigate</h2>
        {
          user.role === 'admin' ?
            <>
              <Link to="/dashboard/sales-account" className={`flex flex-row mx-4 w-[calc(100%-2rem)] self-start items-center gap-3 ${location.pathname === '/dashboard/sales-account' ? 'bg-slate-200' : ''} px-5 py-3 rounded-lg`}>
                <div className={`p-2 rounded-lg ${location.pathname === '/dashboard/sales-account' ? 'bg-emerald-400' : 'bg-slate-200'}`}>
                  <FaUserGear className={`${location.pathname === '/dashboard/sales-account' ? 'text-white' : 'text-emerald-400'}`} size={18} />
                </div>
                <p className={`${location.pathname === '/dashboard/sales-account' ? 'text-slate-800' : 'text-slate-600'} font-bold text-lg`}>Sales Account</p>
              </Link>

              <Link to="/dashboard/package" className={`flex flex-row mx-4 w-[calc(100%-2rem)] self-start items-center gap-3 ${location.pathname === '/dashboard/package' ? 'bg-slate-200' : ''} px-5 py-3 rounded-lg`}>
                <div className={`p-2 rounded-lg ${location.pathname === '/dashboard/package' ? 'bg-emerald-400' : 'bg-slate-200'}`}>
                  <FaFileContract className={`${location.pathname === '/dashboard/package' ? 'text-white' : 'text-emerald-400'}`} size={18} />
                </div>
                <p className={`${location.pathname === '/dashboard/package' ? 'text-slate-800' : 'text-slate-600'} font-bold text-lg`}>Package</p>
              </Link>
            </>
          :
            <></>
        }
        <Link to="/dashboard/customer" className={`flex flex-row mx-4 w-[calc(100%-2rem)] self-start items-center gap-3 ${location.pathname === '/dashboard/customer' ? 'bg-slate-200' : ''} px-5 py-3 rounded-lg`}>
          <div className={`p-2 rounded-lg ${location.pathname === '/dashboard/customer' ? 'bg-emerald-400' : 'bg-slate-200'}`}>
            <FaCreditCard className={`${location.pathname === '/dashboard/customer' ? 'text-white' : 'text-emerald-400'}`} size={18} />
          </div>
          <p className={`${location.pathname === '/dashboard/customer' ? 'text-slate-800' : 'text-slate-600'} font-bold text-lg`}>Customer</p>
        </Link>
      </div>
      <div className="flex flex-col bg-slate-200 flex-grow">
        <Routes>
          <Route path="/" element={ <h1 className="text-4xl font-semibold text-slate-800 my-auto">Welcome, <span className="text-emerald-600 font-bold">{user.username}</span></h1> } />
          {
            user.role === 'admin' ?
              <>
                <Route path="/sales-account" element={ <SalesAccount /> } />
                <Route path="/package" element={ <Package /> } />
              </>
            :
              <></>
          }
          <Route path="/customer" element={ <Customer /> } />
        </Routes>
      </div>
    </div>
  );
}
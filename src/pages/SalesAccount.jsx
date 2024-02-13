import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuthContext";
import ModalAccount from "../components/ModalAccount";

export default function SalesAccount() {
  const { user } = useAuth();
  const [listSales, setListSales] = useState([]);
  const [newAccount, setNewAccount] = useState({username: '', email: '', password: ''});
  const [isModalShow, setIsModalShow] = useState(false);

  const fetchAccount = async () => {
    let res = await fetch('http://127.0.0.1:8000/api/users?role=sales', {
      method: 'GET',
      headers: {
        'Authorization': `${user.type} ${user.token}`,
      },
    });
    let data = await res.json();

    setListSales(data);
  };

  const handleShowModal = () => {
    setIsModalShow(true);
  };

  const handleDeleteAccount = async (id) => {
    console.log(id);
    await fetch(`http://127.0.0.1:8000/api/users/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `${user.type} ${user.token}`,
      },
    });

    setListSales(listSales.filter((sale) => sale.id !== id));
  };

  useEffect(() => {
    fetchAccount();
  }, []);

  return (
    <div id="sales-account-page" className="my-8 mx-16 px-8 pt-4 pb-8 bg-white rounded-xl flex flex-col">
      <h1 className="text-3xl font-semibold text-slate-800 self-start my-4">Sales Account</h1>
      <div className="relative overflow-x-auto overflow-y-auto sm:rounded-lg max-h-72">
        <table className="w-full text-sm text-left rtl:text-right text-slate-800">
          <thead className="text-xs text-slate-800 uppercase bg-emerald-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                #
              </th>
              <th scope="col" className="px-6 py-3">
                Username
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">Action</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {
              listSales.length > 0 ?
                listSales.map((sale, i) => (
                  <tr key={`user-sales-${sale.id}`} className="bg-slate-100 border-b hover:bg-slate-200">
                    <td className="px-6 py-4">{i + 1}</td>
                    <th scope="row" className="px-6 py-4 font-medium text-slate-800 whitespace-nowrap">{sale.username}</th>
                    <td className="px-6 py-4">{sale.email}</td>
                    <td className="px-6 py-4 text-right">
                      <button onClick={() => handleDeleteAccount(sale.id)} className="text-red-400 font-bold uppercase">delete</button>
                    </td>
                  </tr>
                ))
              :
                [...Array(4)].map((_, i) => (
                  <tr key={`user-sales-skeleton-${i}`} className="bg-slate-50 border-b animate-pulse">
                    <td className="px-6 py-4"><span className="invisible">Data</span></td>
                    <td className="px-6 py-4"><span className="invisible">Data</span></td>
                    <td className="px-6 py-4"><span className="invisible">Data</span></td>
                    <td className="px-6 py-4"><span className="invisible">Data</span></td>
                  </tr>
                ))
            }
          </tbody>
        </table>
      </div>
      <button onClick={handleShowModal} className="self-end my-4 cursor-pointer px-4 py-2 bg-emerald-600 hover:bg-emerald-400 border-2 border-solid border-emerald-600 hover:border-emerald-400 rounded-lg text-white font-bold">Add Account</button>
      {
        isModalShow &&
          <ModalAccount 
            setIsModalShow={setIsModalShow} 
            setNewAccount={setNewAccount} 
            setListSales={setListSales}
            accountData={newAccount} 
          />
      }
    </div>
  );
}
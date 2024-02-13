import { useAuth } from "../hooks/useAuthContext";
import { FaXmark } from "react-icons/fa6"

export default function ModalAccount({ setIsModalShow, setNewAccount, setListSales, accountData }) {
  const { user } = useAuth();

  const handleModalClose = () => {
    setIsModalShow(false);
  };

  const handleOnChangeInput = (e) => {
    const { name, value } = e.target;
    setNewAccount((prevData) => ({
      ...prevData,
      [name]: value
    }));
  }

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    console.log('submitting');

    const formData = new FormData();

    for (const key in accountData) {
      formData.append(key, accountData[key]);
    }

    let res = await fetch('http://127.0.0.1:8000/api/auth/register', {
      method: 'POST',
      headers: {
        'Authorization': `${user.type} ${user.token}`
      },
      body: formData
    });

    let data = await res.json();

    setListSales((prev) => ([...prev, data]));
    setNewAccount({username: '', email: '', password: ''});
    setIsModalShow(false);
  }

  return (
    <div id="modal-account" className="fixed top-0 left-0 z-50 flex justify-center items-center w-full h-full bg-slate-500 bg-opacity-50">
      <div className="relative bg-white rounded-lg shadow min-w-[30vw] flex flex-col">
        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
          <h3 className="text-lg font-semibold text-gray-800">
            Add New Sales Account
          </h3>
          <FaXmark onClick={handleModalClose} className="text-slate-800 cursor-pointer" />
        </div>
        <form onSubmit={handleOnSubmit} className="flex flex-col gap-4 p-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="username" className="self-start text-sm font-medium text-slate-800">Username</label>
            <input type="text" name="username" placeholder="Username" value={accountData.username} onChange={handleOnChangeInput} className="bg-slate-50 border border-slate-500 text-slate-800 text-sm rounded-lg focus:ring-slate-600 focus:border-slate-600 block w-full p-2.5" />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="self-start text-sm font-medium text-slate-800">Email</label>
            <input type="email" name="email" placeholder="Email" value={accountData.email} onChange={handleOnChangeInput} className="bg-slate-50 border border-slate-500 text-slate-800 text-sm rounded-lg focus:ring-slate-600 focus:border-slate-600 block w-full p-2.5" />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="self-start text-sm font-medium text-slate-800">Password</label>
            <input type="password" name="password" placeholder="Password" value={accountData.password} onChange={handleOnChangeInput} className="bg-slate-50 border border-slate-500 text-slate-800 text-sm rounded-lg focus:ring-slate-600 focus:border-slate-600 block w-full p-2.5" />
          </div>
          <input type="submit" value="Add Account" className="cursor-pointer text-white self-end items-center bg-emerald-600 hover:bg-emerald-400 focus:ring-4 focus:outline-none focus:ring-emerald-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center uppercase mt-2" />
        </form>
      </div>
    </div>
  );
}
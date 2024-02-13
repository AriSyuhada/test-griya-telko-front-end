import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuthContext";
import ModalCustomer from "../components/ModalCustomer";
import ModalCustomerDetails from "../components/ModalCustomerDetails";

export default function Customer() {
  const { user } = useAuth();
  const [listCustomers, setListCustomers] = useState([]);
  const [listPackages, setListPackages] = useState({});
  const [customerData, setCustomerData] = useState({
    id: '', 
    package_id: '', 
    name: '', 
    phone_number: '', 
    address: '',
    verified: 0,
    id_card_pict: null, 
    house_pict: null
  });
  const [isModalShow, setIsModalShow] = useState(false);
  const [isModalDetailsShow, setIsModalDetailsShow] = useState(false);

  const fetchCustomers = async () => {
    let res = await fetch('http://127.0.0.1:8000/api/customers', {
      method: 'GET',
      headers: {
        'Authorization': `${user.type} ${user.token}`,
      },
    });
    let json = await res.json();
    let data = json.data;

    setListCustomers(data);
  };

  const fetchPackage = async () => {
    let res = await fetch('http://127.0.0.1:8000/api/packages', {
      method: 'GET',
      headers: {
        'Authorization': `${user.type} ${user.token}`
      },
    });
    let json = await res.json();
    let data = json.data;

    const mappedData = {};

    for (let i in data) {
      mappedData[data[i].id] = data[i]
    }

    mappedData['complete'] = true;

    setListPackages(mappedData);
  }

  const handleShowModal = () => {
    setIsModalShow(true);
  };

  const handleEditCustomer = (data) => {
    setCustomerData({
      id: data.id, 
      package_id: data.package_id, 
      name: data.name, 
      phone_number: data.phone_number, 
      address: data.address, 
      verified: data.verified,
      id_card_pict: null, 
      house_pict: null
    });
    setIsModalShow(true);
  };

  const handleVerifCustomer = (data) => {
    setCustomerData({
      id: data.id, 
      package_id: data.package_id, 
      name: data.name, 
      phone_number: data.phone_number, 
      address: data.address, 
      verified: data.verified,
      id_card_pict: null, 
      house_pict: null
    });
    setIsModalDetailsShow(true);
  };

  const handleDeleteCustomer = async (id) => {
    await fetch(`http://127.0.0.1:8000/api/customers/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `${user.type} ${user.token}`,
      },
    });

    setListCustomers(listCustomers.filter((customer) => customer.id !== id));
  };

  useEffect(() => {
    fetchCustomers();
    fetchPackage();
  }, [])

  return (
    <div id="customer-page" className="my-8 mx-16 px-8 pt-4 pb-8 bg-white rounded-xl flex flex-col">
      <h1 className="text-3xl font-semibold text-slate-800 self-start my-4">Customer</h1>
      <div className="relative overflow-x-auto overflow-y-auto sm:rounded-lg max-h-72">
        <table className="w-full text-sm text-left rtl:text-right text-slate-800">
          <thead className="text-xs text-slate-800 uppercase bg-emerald-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                #
              </th>
              <th scope="col" className="px-6 py-3">
                Package
              </th>
              <th scope="col" className="px-6 py-3">
                Customer Name
              </th>
              <th scope="col" className="px-6 py-3">
                Phone Number
              </th>
              <th scope="col" className="px-6 py-3">
                Address
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">Action</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {
              listCustomers.length > 0 && listPackages['complete'] ?
                listCustomers.map((customer, i) => (
                  <tr key={`customer-${customer.id}`} className="bg-slate-100 border-b hover:bg-slate-200 cursor-pointer">
                    <td className="px-6 py-4">{i + 1}</td>
                    <td className="px-6 py-4">{listPackages[customer.package_id].name}</td>
                    <th scope="row" className="px-6 py-4 font-medium text-slate-800 whitespace-nowrap">{customer.name}</th>
                    <td className="px-6 py-4">{customer.phone_number}</td>
                    <td className="px-6 py-4">{customer.address}</td>
                    <td className={`px-6 py-4 font-bold ${customer.verified ? 'text-green-400' : 'text-red-400'}`}>{customer.verified ? 'verified' : 'unverified'}</td>
                    {
                      user.role === 'sales' &&
                        <td className="px-6 py-4 text-right flex flex-row gap-4 justify-end">
                          <button onClick={() => handleEditCustomer(customer)} className="text-amber-400 font-bold uppercase">edit</button>
                          <button onClick={() => handleDeleteCustomer(customer.id)} className="text-red-400 font-bold uppercase">delete</button>
                        </td>
                    }
                    {
                      user.role === 'admin' &&
                        <td className="px-6 py-4 text-right">
                          <button onClick={() => handleVerifCustomer(customer)} className="text-blue-400 font-bold uppercase">verify</button>
                        </td>
                    }
                  </tr>
                ))
              :
                [...Array(4)].map((_, i) => (
                  <tr key={`user-sales-skeleton-${i}`} className="bg-slate-50 border-b animate-pulse">
                    <td className="px-6 py-4"><span className="invisible">Data</span></td>
                    <td className="px-6 py-4"><span className="invisible">Data</span></td>
                    <td className="px-6 py-4"><span className="invisible">Data</span></td>
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
      {
        user.role === 'sales' &&
          <button onClick={handleShowModal} className="self-end my-4 cursor-pointer px-4 py-2 bg-emerald-600 hover:bg-emerald-400 border-2 border-solid border-emerald-600 hover:border-emerald-400 rounded-lg text-white font-bold">Add Customer</button>
      }
      {
        isModalShow &&
          <ModalCustomer 
            setIsModalShow={setIsModalShow}
            setCustomerData={setCustomerData}
            setListCustomers={setListCustomers}
            customerData={customerData}
            listCustomers={listCustomers}
            listPackages={listPackages}
          />
      }
      {
        isModalDetailsShow &&
          <ModalCustomerDetails 
            setIsModalShow={setIsModalDetailsShow}
            setCustomerData={setCustomerData}
            setListCustomers={setListCustomers}
            customerData={customerData}
            listCustomers={listCustomers}
            listPackages={listPackages}
          />
      }
    </div>
  );
}
import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuthContext";
import { FaXmark } from "react-icons/fa6"

export default function ModalCustomer({ setIsModalShow, setCustomerData, setListCustomers, customerData, listCustomers, listPackages }) {
  const { user } = useAuth();
  const [ options, setOptions ] = useState([]);

  const mapOptions = () => {
    const element = [];
    const currentSelected = customerData.package_id === '';
    console.log(currentSelected)
    element.push(<option key={`options-package-default`} value='' disabled hidden selected={currentSelected} >Choose Package</option>)
    for (let key in listPackages) {
      if (key === 'complete') continue;
      element.push(<option key={`options-package-${key}`} value={key} { ...key === customerData.id ? 'selected' : '' }>{listPackages[key].name}</option>)
    }

    setOptions(element);
  }

  const handleModalClose = () => {
    setIsModalShow(false);
  };

  const handleOnChangeInput = (e) => {
    const { name, value, files } = e.target;
    setCustomerData((prevData) => ({
      ...prevData,
      [name]: name === 'id_card_pict' || name === 'house_pict' ? files[0] : value,
    }));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    for (const key in customerData) {
      if (key === 'id' && customerData[key] == '') continue;
      formData.append(key, customerData[key]);
    }

    const url = customerData.id === '' ? 'http://127.0.0.1:8000/api/customers' : `http://127.0.0.1:8000/api/customers/${customerData.id}?_method=PUT`;

    let res = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `${user.type} ${user.token}`,
      },
      body: formData,
    });

    let json = await res.json();
    let data = json.data;

    if (customerData.id === '') {
      setListCustomers((prev) => ([...prev, data]));
    } else {
      const updatedList = [...listCustomers];
      const updatedCustomer = updatedList.find((customer) => customer.id === customerData.id);

      for (const key in updatedCustomer) {
        updatedCustomer[key] = data[key];
      }

      setListCustomers(updatedList);
    }
    setCustomerData({
      id: '', 
      package_id: '', 
      name: '', 
      phone_number: '', 
      address: '', 
      verified: 0,
      id_card_pict: null, 
      house_pict: null
    });
    setIsModalShow(false);
  };

  useEffect(() => {
    mapOptions();
  }, [])

  return (
    <div id="modal-customer" className="fixed top-0 left-0 z-50 flex justify-center items-center w-full h-full bg-slate-500 bg-opacity-50">
      <div className="relative bg-white rounded-lg shadow min-w-[30vw] flex flex-col">
        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
          <h3 className="text-lg font-semibold text-gray-800">
            { customerData.package_id !== '' ? 'Add New Customer' : 'Update Customer' }
          </h3>
          <FaXmark onClick={handleModalClose} className="text-slate-800 cursor-pointer" />
        </div>
        <form className="flex flex-col gap-4 p-5" onSubmit={handleOnSubmit}>
          <div className="flex flex-col items-start gap-2">
            <label htmlFor="package_id" className="self-start text-sm font-medium text-slate-800">Package</label>
            <select name="package_id" onChange={handleOnChangeInput} id="package-options" className="bg-slate-50 border border-slate-500 text-slate-800 text-sm rounded-lg focus:ring-slate-600 focus:border-slate-600 block w-full p-2.5">
              {
                options
              }
            </select>
          </div>
          <div className="flex flex-col items-start gap-2">
            <label htmlFor="name" className="self-start text-sm font-medium text-slate-800">Name</label>
            <input type="text" name="name" value={customerData.name} onChange={handleOnChangeInput} className="bg-slate-50 border border-slate-500 text-slate-800 text-sm rounded-lg focus:ring-slate-600 focus:border-slate-600 block w-full p-2.5" />
          </div>
          <div className="flex flex-col items-start gap-2">
            <label htmlFor="phone_number" className="self-start text-sm font-medium text-slate-800">Phone Number</label>
            <input type="text" name="phone_number" value={customerData.phone_number} onChange={handleOnChangeInput} className="bg-slate-50 border border-slate-500 text-slate-800 text-sm rounded-lg focus:ring-slate-600 focus:border-slate-600 block w-full p-2.5" />
          </div>
          <div className="flex flex-col items-start gap-2">
            <label htmlFor="address" className="self-start text-sm font-medium text-slate-800">Adress</label>
            <input type="text" name="address" value={customerData.address} onChange={handleOnChangeInput} className="bg-slate-50 border border-slate-500 text-slate-800 text-sm rounded-lg focus:ring-slate-600 focus:border-slate-600 block w-full p-2.5" />
          </div>
          <div className="flex flex-col items-start gap-2">
            <label htmlFor="id_card_pict" className="self-start text-sm font-medium text-slate-800">ID Card Picture</label>
            <input type="file" name="id_card_pict" onChange={handleOnChangeInput} className="bg-slate-50 border border-slate-500 text-slate-800 text-sm rounded-lg focus:ring-slate-600 focus:border-slate-600 block w-full p-2.5" />
          </div>
          <div className="flex flex-col items-start gap-1">
            <label htmlFor="house_pict" className="self-start text-sm font-medium text-slate-800">House Picture</label>
            <input type="file" name="house_pict" onChange={handleOnChangeInput} className="bg-slate-50 border border-slate-500 text-slate-800 text-sm rounded-lg focus:ring-slate-600 focus:border-slate-600 block w-full p-2.5" />
          </div>
          <input type="submit" value={customerData.id === '' ? 'Add Customer' : 'Update Customer'} className="cursor-pointer text-white self-end items-center bg-emerald-600 hover:bg-emerald-400 focus:ring-4 focus:outline-none focus:ring-emerald-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center uppercase mt-2" />
        </form>
      </div>
    </div>
  );
}
import { useAuth } from "../hooks/useAuthContext";
import { FaXmark } from "react-icons/fa6"

export default function ModalCustomerDetails({ setIsModalShow, setCustomerData, setListCustomers, customerData, listCustomers, listPackages }) {
  const { user } = useAuth();

  const handleModalClose = () => {
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

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    let res = await fetch(`http://127.0.0.1:8000/api/customers/${customerData.id}/verify`, {
      method: 'GET',
      headers: {
        'Authorization': `${user.type} ${user.token}`,
      },
    });

    let json = await res.json();
    let data = json.data;

    const updatedList = [...listCustomers];
    const updatedCustomer = updatedList.find((customer) => customer.id === customerData.id);

    for (const key in updatedCustomer) {
      updatedCustomer[key] = data[key];
    }

    setListCustomers(updatedList);
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

  return (
    <div id="modal-customer-details" className="fixed top-0 left-0 z-50 flex justify-center items-center w-full h-full bg-slate-500 bg-opacity-50">
      <div className="relative bg-white rounded-lg shadow min-w-[30vw] flex flex-col">
        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
          <h3 className="text-lg font-semibold text-gray-800">
            Verify Customer
          </h3>
          <FaXmark onClick={handleModalClose} className="text-slate-800 cursor-pointer" />
        </div>
        <form className="flex flex-col gap-4 p-5" onSubmit={handleOnSubmit}>
          <div className="flex flex-col items-start gap-2">
            <label htmlFor="package_id" className="self-start text-sm font-medium text-slate-800">Package</label>
            <input type="text" name="package_id" value={ listPackages[customerData.package_id].name } aria-disabled disabled className="bg-slate-50 border border-slate-500 text-slate-800 text-sm rounded-lg focus:ring-slate-600 focus:border-slate-600 block w-full p-2.5" />
          </div>
          <div className="flex flex-col items-start gap-2">
            <label htmlFor="name" className="self-start text-sm font-medium text-slate-800">Name</label>
            <input type="text" name="name" value={customerData.name} aria-disabled disabled className="bg-slate-50 border border-slate-500 text-slate-800 text-sm rounded-lg focus:ring-slate-600 focus:border-slate-600 block w-full p-2.5" />
          </div>
          <div className="flex flex-col items-start gap-2">
            <label htmlFor="phone_number" className="self-start text-sm font-medium text-slate-800">Phone Number</label>
            <input type="text" name="phone_number" value={customerData.phone_number} aria-disabled disabled className="bg-slate-50 border border-slate-500 text-slate-800 text-sm rounded-lg focus:ring-slate-600 focus:border-slate-600 block w-full p-2.5" />
          </div>
          <div className="flex flex-col items-start gap-2">
            <label htmlFor="address" className="self-start text-sm font-medium text-slate-800">Adress</label>
            <input type="text" name="address" value={customerData.address} aria-disabled disabled className="bg-slate-50 border border-slate-500 text-slate-800 text-sm rounded-lg focus:ring-slate-600 focus:border-slate-600 block w-full p-2.5" />
          </div>
          <div className="flex flex-row gap-8">
            <div className="flex flex-col">
              <label htmlFor={`id-card-pict-${customerData.id}`} className="self-start text-sm font-medium text-slate-800">Id Card Picture</label>
              <iframe className="w-full h-full" src={`http://127.0.0.1:8000/api/customers/${customerData.id}/file/id_card`} title={`id-card-pict-${customerData.id}`}></iframe>
            </div>
            <div className="flex flex-col">
              <label htmlFor={`house-pict-${customerData.id}`} className="self-start text-sm font-medium text-slate-800">House Picture</label>
              <iframe className="w-full h-full" src={`http://127.0.0.1:8000/api/customers/${customerData.id}/file/house`} title={`house-pict-${customerData.id}`}></iframe>
            </div>
          </div>
          <input type="submit" value="Verify Customer" className="cursor-pointer text-white self-end items-center bg-emerald-600 hover:bg-emerald-400 focus:ring-4 focus:outline-none focus:ring-emerald-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center uppercase mt-2" />
        </form>
      </div>
    </div>
  );
}
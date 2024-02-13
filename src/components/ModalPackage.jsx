import { useAuth } from "../hooks/useAuthContext";
import { FaXmark } from "react-icons/fa6";

export default function ModalPackage({ setIsModalShow, setPackageData, setListPackages, packageData, listPackages }) {
  const { user } = useAuth();

  const handleModalClose = () => {
    setPackageData({id: '', name: '', prices: ''});
    setIsModalShow(false);
  };

  const handleOnChangeInput = (e) => {
    const { name, value } = e.target;
    setPackageData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    for (const key in packageData) {
      if (key === 'id' && packageData[key] == '') continue;
      formData.append(key, packageData[key]);
    }

    const url = packageData.id === '' ? 'http://127.0.0.1:8000/api/packages' : `http://127.0.0.1:8000/api/packages/${packageData.id}?_method=PUT`;

    let res = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `${user.type} ${user.token}`,
      },
      body: formData,
    });

    let json = await res.json();
    let data = json.data;

    if (packageData.id === '') {
      setListPackages((prev) => ([...prev, data]));
    } else {
      const updatedlist = [...listPackages];
      const updatedPackage = updatedlist.find((pack) => pack.id === packageData.id);

      for (const key in updatedPackage) {
        updatedPackage[key] = packageData[key];
      }

      setListPackages(updatedlist);
    }
    setPackageData({id: '', name: '', prices: ''});
    setIsModalShow(false);
  };

  return (
    <div id="modal-package" className="fixed top-0 left-0 z-50 flex justify-center items-center w-full h-full bg-slate-500 bg-opacity-50">
      <div className="relative bg-white rounded-lg shadow min-w-[30vw] flex flex-col">
        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
          <h3 className="text-lg font-semibold text-gray-800">
            { packageData.id !== '' ? 'Add New Package' : 'Update Package'}
          </h3>
          <FaXmark onClick={handleModalClose} className="text-slate-800 cursor-pointer" />
        </div>
        <form className="flex flex-col gap-4 p-5" onSubmit={handleOnSubmit}>
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="self-start text-sm font-medium text-slate-800">Name</label>
            <input type="text" name="name" placeholder="Name" value={packageData.name} onChange={handleOnChangeInput} className="bg-slate-50 border border-slate-500 text-slate-800 text-sm rounded-lg focus:ring-slate-600 focus:border-slate-600 block w-full p-2.5" />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="prices" className="self-start text-sm font-medium text-slate-800">Prices</label>
            <input type="number" name="prices" placeholder="Prices" value={packageData.prices} onChange={handleOnChangeInput} min={0} className="bg-slate-50 border border-slate-500 text-slate-800 text-sm rounded-lg focus:ring-slate-600 focus:border-slate-600 block w-full p-2.5" />
          </div>
          <input type="submit" value={packageData.id !== '' ? 'Add Package' : 'Update Package'} className="cursor-pointer text-white self-end items-center bg-emerald-600 hover:bg-emerald-400 focus:ring-4 focus:outline-none focus:ring-emerald-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center uppercase mt-2" />
        </form>
      </div>
    </div>
  );
}
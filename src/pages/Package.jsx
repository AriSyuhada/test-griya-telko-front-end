import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuthContext";
import ModalPackage from "../components/ModalPackage";

let USD = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export default function Package() {
  const { user } = useAuth();
  const [listPackages, setListPackages] = useState([]);
  const [packageData, setPackageData] = useState({id: '', name: '', prices: ''});
  const [isModalShow, setIsModalShow] = useState(false);

  const fetchPackages = async () => {
    let res = await fetch('http://127.0.0.1:8000/api/packages', {
      method: 'GET',
      headers: {
        'Authorization': `${user.type} ${user.token}`,
      },
    });
    let json = await res.json();
    let data = json.data;

    setListPackages(data);
  };

  const handleShowModal = () => {
    setIsModalShow(true);
  };

  const handleEditPackage = (data) => {
    setPackageData({id: data.id, name: data.name, prices: data.prices})
    setIsModalShow(true);
  };

  const handleDeletePackage = async (id) => {
    await fetch(`http://127.0.0.1:8000/api/packages/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `${user.type} ${user.token}`,
      },
    });

    setListPackages(listPackages.filter((pack) => pack.id !== id));
  };

  useEffect(() => {
    fetchPackages();
  }, [])

  return (
    <div id="package-page" className="my-8 mx-16 px-8 pt-4 pb-8 bg-white rounded-xl flex flex-col">
      <h1 className="text-3xl font-semibold text-slate-800 self-start my-4">Package</h1>
      <div className="relative overflow-x-auto overflow-y-auto sm:rounded-lg max-h-72">
        <table className="w-full text-sm text-left rtl:text-right text-slate-800">
          <thead className="text-xs text-slate-800 uppercase bg-emerald-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                #
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Prices
              </th>
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">Action</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {
              listPackages.length > 0 ?
                listPackages.map((pack, i) => (
                  <tr key={`packages-${pack.id}`} className="bg-slate-100 border-b hover:bg-slate-200">
                    <td className="px-6 py-4">{i + 1}</td>
                    <th scope="row" className="px-6 py-4 font-medium text-slate-800 whitespace-nowrap">{pack.name}</th>
                    <td className="px-6 py-4">{USD.format(pack.prices)}</td>
                    <td className="px-6 py-4 text-right flex flex-row gap-4 justify-end">
                      <button onClick={() => handleEditPackage(pack)} className="text-amber-400 font-bold uppercase">edit</button>
                      <button onClick={() => handleDeletePackage(pack.id)} className="text-red-400 font-bold uppercase">delete</button>
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
      <button onClick={handleShowModal} className="self-end my-4 cursor-pointer px-4 py-2 bg-emerald-600 hover:bg-emerald-400 border-2 border-solid border-emerald-600 hover:border-emerald-400 rounded-lg text-white font-bold">Add Package</button>
      {
        isModalShow &&
          <ModalPackage 
            setIsModalShow={setIsModalShow}
            setPackageData={setPackageData}
            setListPackages={setListPackages}
            packageData={packageData}
            listPackages={listPackages}
          />
      }
    </div>
  );
}
import { useAuth } from "../hooks/useAuthContext";

export default function ModalPackage({ setIsModalShow, setPackageData, setListPackages, packageData, listPackages }) {
  const { user } = useAuth();

  const handleModalClose = () => {
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
      <div className="relative bg-slate-100 rounded-lg p-16">
        <button onClick={handleModalClose} className="absolute top-2 right-4">Close</button>
        <h1 className="mb-8">Add Package</h1>
        <form className="flex flex-col gap-4" onSubmit={handleOnSubmit}>
          <div className="flex flex-col items-start gap-1">
            <label htmlFor="name">Name</label>
            <input type="text" name="name" value={packageData.name} onChange={handleOnChangeInput} className="bg-white px-4 py-2 rounded-md border border-slate-500" />
          </div>
          <div className="flex flex-col items-start gap-2">
            <label htmlFor="prices">Prices</label>
            <input type="number" name="prices" value={packageData.prices} onChange={handleOnChangeInput} min={0} className="bg-white px-4 py-2 rounded-md border border-slate-500" />
          </div>
          <input type="submit" value={packageData.id === '' ? 'Add Package' : 'Update Package'}className="uppercase bg-blue-400 rounded-md px-2 py-1 mt-2" />
        </form>
      </div>
    </div>
  );
}
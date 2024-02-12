import { useAuth } from "../hooks/useAuthContext";

export default function Login() {
  const { login } = useAuth();

  const handleOnLogin = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('username', e.target.username.value);
    formData.append('password', e.target.password.value);

    let res = await fetch('http://127.0.0.1:8000/api/auth/login', {
      method: 'POST',
      body: formData,
    });
    let cred = await res.json();
    
    await login(cred);
  }

  return (
    <div id="login-page" className="h-fit flex flex-row justify-center items-center">
      <div className="basis-1/2 overflow-hidden">
        <img className="w-[100vw] h-[calc(100vh-76px)]" src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="illustration" />
      </div>
      <div className="basis-1/2 flex flex-col justify-center items-start px-32">
        <h1 className="text-4xl font-semibold text-slate-800 mb-2">Log In</h1>
        <p className="text-lg text-slate-800 mb-8">Please fill your credentials</p>
        <form onSubmit={(e) => handleOnLogin(e)} className="flex flex-col gap-6 w-full">
          <input type="text" name="username" placeholder="Username" className="text-lg bg-slate-200 border-2 border-slate-400 hover:border-emerald-400 focus:outline-emerald-400 rounded-md px-6 py-3" />
          <input type="password" name="password" placeholder="Password" className="text-lg bg-slate-200 border-2 border-slate-400 hover:border-emerald-400 focus:outline-emerald-400 rounded-md px-6 py-3" />
          <input type="submit" value="Login" className="cursor-pointer px-6 py-3 bg-emerald-600 hover:bg-emerald-400 border-2 border-solid border-emerald-600 hover:border-emerald-400 rounded-lg text-white font-bold place-self-end text-lg tracking-wider mt-2"/>
        </form>
      </div>
    </div>
  );
}
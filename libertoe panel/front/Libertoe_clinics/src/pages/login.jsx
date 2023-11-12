import { useState } from "react";
import { useContext } from "react";
import logo from "../assets/img/libertoe-logo-C.png";
import { UserContext } from "../context/provider";
import { netCall } from "../lib/netcall";

const LoginPage = () => {

  const {setUserData ,setIsLoggedIn} = useContext(UserContext);
  const [userName, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const submit = async () =>{
    const body = {email: userName, password: password}
    const responce = await netCall("login", "post", body)
    console.log(responce);
    if(responce.status === 200){
      localStorage.setItem("token", responce.data.token)
      setUserData(responce.data)
      setIsLoggedIn(true)
    }

  }
  return (
    <>
      <div className="w-full h-full flex flex-col justify-center items-center">
        <div className="flex justify-center items-end w-1/2" >
          <img className="max-w-96 w-1/2 min-w-[200px]" src={logo} />
          <p className="text-2xl text-[#017067] " >Seller</p>
        </div>
        <div className=" min-w-[300px] min-h-[300px] w-1/3 h-1/3 rounded-3xl shadow-[0_0px_50px_-12px_rgb(0,0,0,0.25)] flex flex-col justify-evenly items-center gap-5 ">
          <div className=" w-full flex flex-col justify-center items-center gap-5 ">
            <div className="w-[90%] flex flex-col items-end gap-2 ">
              <p>نام کاربری</p>
              <input value={userName} onChange={(e) => setUsername(e.target.value)} className="w-full border rounded-lg h-9 border-slate-300 focus:border-slate-400 outline-none pl-2 shadow-inner duration-300 ease-in-out" type="text" />
            </div>
            <div className="w-[90%] flex flex-col items-end gap-2 ">
              <p>رمز عبور</p>
              <input value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border rounded-lg h-9 border-slate-300 focus:border-slate-400 outline-none pl-2  shadow-inner duration-300 ease-in-out" type="password" />
            </div>
          </div>
          <div className=" w-[80%] " >
            <button onClick={() => submit()} className=" w-full h-8 rounded-lg border bg-[#017067] text-white " >ورود</button>
          </div>
        </div>
      </div>
    </>
  );
};
export default LoginPage;

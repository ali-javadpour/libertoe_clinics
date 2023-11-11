const LoginPage = () => {
  return (
    <>
      <div className="w-full h-full bg-red-300 flex flex-col justify-center items-center">
        <p className="text-3xl">Libertoe</p>
        <div className=" min-w-[300px] min-h-[300px] w-1/3 h-1/3 bg-slate-300 flex flex-col justify-evenly items-center gap-5 ">
          <div className=" w-full flex flex-col justify-center items-center gap-5 ">
            <div className="w-[90%] flex flex-col items-end gap-2 ">
              <p>نام کاربری</p>
              <input className="w-full" type="text" />
            </div>
            <div className="w-[90%] flex flex-col items-end gap-2 ">
              <p>رمز عبور</p>
              <input className="w-full" type="password" />
            </div>
          </div>
          <div>
            <button>ورود</button>
          </div>
        </div>
      </div>
    </>
  );
};
export default LoginPage;

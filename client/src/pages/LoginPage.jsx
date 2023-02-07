import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { baseUrl } from "../requests";
import { useNavigate } from "react-router-dom";
import { userLogin } from "../../store/reducers/authActions";
export default function LoginPage() {
  const [userName, setUserName] = useState("demo@mail.com");
  const [password, setPassword] = useState("demo1234");
  const { loading, userInfo, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  React.useEffect(() => {
    if (userInfo) {
      navigate("/profile");
    }
  }, [navigate, userInfo]);
  const handleLogin = () => {
    dispatch(userLogin({ email: userName, password }));
  };

  return (
    <div className={styles.pageContainer}>
      <img
        src="/auth-img.png"
        alt="authImage"
        className="hidden md:block h-[380px]"
      />
      <main className={styles.container}>
        <div className="flex items-center gap-4 text-primary font-semibold text-3xl mx-auto w-fit mb-4">
          <img src="/logo.svg" alt="logo" className="h-8" />
          <h2>Doot</h2>
        </div>
        <div className="mx-auto max-w-sm  ">
          <div className="flex flex-col gap-2 text-center my-4">
            <h2 className="text-gray-700 font-normal text-3xl">
              Welcome Back!
            </h2>
            <h4 className="text-gray-700 font-light">
              Sign in to continue to Doot .
            </h4>
          </div>
          <div className="flex flex-col gap-4">
            <label className="text-gray-600 font-normal">Username</label>
            <input
              className={styles.input}
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="admin"
            />
            <label className="text-gray-600 font-normal">Password</label>
            <input
              className={styles.input}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="admin"
            />
            <div className="flex gap-2">
              <input
                type="checkbox"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="admin"
              />
              <label className="text-gray-600 font-normal">Remember Me</label>
            </div>
            <button onClick={handleLogin} className={styles.button}>
              Log In
            </button>
          </div>
          <p className="text-gray-500 text-center my-6">
            Don't have an account ?{" "}
            <Link to="/auth-register">
              <span className="underline text-primary">Register</span>
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
const styles = {};
styles.pageContainer = `h-screen w-screen bg-[#4FAD6D] px-[4%] flex items-center`;
styles.container = `bg-[#FEFEFF] w-full px-[8%] py-12 md:w-[70%] md:mx-0 md:ml-auto rounded-lg `;
styles.input = `p-2 border-gray-400 outline-gray-600 border-solid border-[0.5px] focus:outline-none`;
styles.button = `w-full bg-primary py-3 text-white `;

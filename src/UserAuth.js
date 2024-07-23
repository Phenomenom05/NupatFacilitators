import React, { useState } from "react";
import axios from "./axiosConfig"; // Import the axios instance
import { useNavigate } from "react-router-dom";

const UserAuth = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleAuth = async () => {
    try {
      const url = isLogin
        ? "/api/token/"
        : "http://davidphenom.pythonanywhere.com/create-account/";

      const body = isLogin
        ? { username, password }
        : { username, password1: password };

      const response = await axios.post(url, body, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.data.access) {
        throw new Error("Authentication failed");
      }

      const { access, refresh } = response.data;
      localStorage.setItem("authToken", access);
      localStorage.setItem("refreshToken", refresh);

      console.log(response.data);
      navigate("/create-exam");
    } catch (error) {
      console.error(
        "Authentication Error:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div>
      <h2>{isLogin ? "Login" : "Register"}</h2>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button onClick={handleAuth}>{isLogin ? "Login" : "Register"}</button>
      <p onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? "Create an account" : "Already have an account?"}
      </p>
    </div>
  );
};

export default UserAuth;

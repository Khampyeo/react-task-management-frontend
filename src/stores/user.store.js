import React, { createContext, useState } from "react";
import AuthService from "../services/auth.service";

// Tạo Context để lưu trữ thông tin người dùng
export const UserContext = createContext();

// Provider để cung cấp thông tin người dùng cho ứng dụng
export function UserProvider(props) {
  const [username, setUsername] = useState(null);

  const authService = new AuthService();

  const signin = async (username, password) => {
    const result = await authService.signin(username, password);
    setUsername(result);
  };

  const signup = async (username, password) => {
    return authService.signup(username, password);
  };

  const signout = () => {
    setUsername(null);
    authService.removeToken();
  };

  const context = {
    username,
    signin,
    signup,
    signout,
  };

  return (
    <UserContext.Provider value={context}>
      {props.children}
    </UserContext.Provider>
  );
}

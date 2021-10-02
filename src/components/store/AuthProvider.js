import AuthContext from './auth-context';
import { useState } from 'react';

const AuthProvider = (props) => {
  const [token, setToken] = useState(null);
  const [nickname, setNickname] = useState('');
  const isLoggedIn = !!token;

  const loginHandler = (token, email) => {
    setToken(token);
    setNicknameHandler(email);
  };

  const logoutHandler = () => {
    setToken(null);
  };

  const setNicknameHandler = (email) => {
    const splitted = email.split('@');
    const formattedUsername =
      splitted[0].toUpperCase()[0] + splitted[0].slice(1).toLowerCase();
    setNickname(formattedUsername);
  };

  const contextValue = {
    token: token,
    username: nickname,
    isLoggedIn: isLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

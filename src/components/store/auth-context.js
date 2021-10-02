import { createContext } from 'react';

const AuthContext = createContext({
  token: '',
  username: '',
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

export default AuthContext;

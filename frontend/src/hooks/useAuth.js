import { useContext } from 'react';
import jwtDecode from 'jwt-decode';

import AuthContext from '../auth/context';
import authStorage from '../auth/storage';

export default useAuth = () => {
  const { user, setUser } = useContext(AuthContext);

  const logIn = (authToken) => {
    const user = jwtDecode(authToken).identity;
    setUser(user);
    authStorage.storeToken(authToken);
  };

  const logOut = () => {
    setUser(null);
    authStorage.removeToken();
  };

  return { user, logIn, logOut };
};

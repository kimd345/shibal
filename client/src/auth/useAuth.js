import { useContext } from 'react';
import jwtDecode from 'jwt-decode';

import AuthContext from './context';
import authStorage from './storage';
import { actions } from '../redux/ducks';
import { useDispatch } from 'react-redux';

export default useAuth = () => {
  const { user, setUser } = useContext(AuthContext);
  const dispatch = useDispatch();

  const logIn = (authToken) => {
    const user = jwtDecode(authToken).identity;
    setUser(user);
    dispatch(actions.setUser(user));
    authStorage.storeToken(authToken);
  };

  const logOut = () => {
    setUser(null);
    dispatch(actions.setUser({}));
    authStorage.removeToken();
  };

  return { user, logIn, logOut };
};

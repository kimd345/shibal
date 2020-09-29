import { useContext } from 'react';
import { useDispatch } from 'react-redux';
import jwtDecode from 'jwt-decode';

import AuthContext from '../auth/context';
import authStorage from '../auth/storage';
import { actions } from '../redux/ducks';

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

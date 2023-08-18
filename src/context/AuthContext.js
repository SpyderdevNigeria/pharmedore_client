import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [fetching, setFetching] = useState(true);
  const url = process.env.REACT_APP_SERVER_URL;

  const login = (userData) => {
    setUser(userData);
    setFetching(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('retailerPH');
    localStorage.removeItem('wholesalerPH');
    localStorage.removeItem('Admin')
  };

  useEffect(() => {
    setFetching(true);
    const retailUser = JSON.parse(localStorage.getItem('retailerPH'));
    const wholesalerUser = JSON.parse(localStorage.getItem('wholesalerPH'));
    const admin = JSON.parse(localStorage.getItem('Admin'));

    if (retailUser) {
      const fetchRetailerData = async () => {
        try {
          const res = await fetch(`${url}/users/getRetailer/${retailUser.email}`);
          const data = await res.json();
          if (res.ok) {
            setUser(data);
            localStorage.setItem('retailerPH', JSON.stringify(data));
            setFetching(false)
          } else { throw new Error(data.message) }
        } catch (error) { 
          setUser(retailUser) 
          setFetching(false)
        }
      };

      fetchRetailerData();
    } else if (wholesalerUser) {
      const fetchWholesalerData = async () => {
        try {
          const res = await fetch(`${url}/users/getWholesaler/${wholesalerUser.email}`);
          const data = await res.json();
          if (res.ok) {
            setUser(data);
            localStorage.setItem('wholesalerPH', JSON.stringify(data));
            setFetching(false)
          } else { throw new Error(data.message) }
        } catch (error) { 
          setUser(wholesalerUser) 
          setFetching(false)
        }
      }
        
        fetchWholesalerData();
      }

      else if (admin) {
        setUser(admin);
        setFetching(false)
      } else {
        setUser(null);
        setFetching(false)
      }
  }, [url]);



  return (
    <AuthContext.Provider value={{ user, fetching, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);

import { useContext, useEffect } from "react";
import { authContext } from "../auth.context";
import { GetMe, login, Logout, register } from "../services/auth.api";

export function useAuth() {
  const Context = useContext(authContext);
  const { user, setUser, loading, setLoading } = Context;

  const loginHandler = async ({ email, password }) => {
    setLoading(true);
    try {
      const data = await login({ email, password });
      setUser(data.user);
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };
  const registerHandler = async ({ username, email, password }) => {
    setLoading(true);
    try {
      const data = await register({ username, email, password });
      setUser(data.user);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  const logoutHandler = async () => {
    setLoading(true);
    try {
      const data = await Logout();
      setUser(null);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };
  useEffect(() => {
    const getAndSetUser = async () => {
      try {
        const data = await GetMe();
        setUser(data.user);
      } catch (err) {
      } finally {
        setLoading(false);
      }
    };
    getAndSetUser();
  }, []);
  return { user, loading, loginHandler, logoutHandler, registerHandler };
}

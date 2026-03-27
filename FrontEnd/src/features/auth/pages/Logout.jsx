import { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router";

const Logout = () => {
  const { loading, logoutHandler } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const performLogout = async () => {
      await logoutHandler();
      navigate("/login");
    };
    performLogout();
  }, [logoutHandler, navigate]);

  if (loading) {
    return (
      <main>
        <h1>Loading...</h1>
      </main>
    );
  }
  return (
    <main>
      <h1>Logged out</h1>
    </main>
  );
};

export default Logout;

import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}/api/auth`,
  withCredentials: true,
});

const token = localStorage.getItem("token");

export async function register({ username, email, password }) {
  try {
    const response = await api.post("/register", {
      username,
      email,
      password,
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function login({ email, password }) {
  try {
    const response = await api.post("/login", {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function Logout() {
  try {
    const response = await api.get("/logout");
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function GetMe() {
  try {
    const response = await api.get("/get-me", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

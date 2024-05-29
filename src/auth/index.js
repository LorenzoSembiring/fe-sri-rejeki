// src/auth/index.js
import axios from 'axios';

export async function checkAdmin() {
  const token = localStorage.getItem("token");
  if (token) {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/auth/authenticated-user`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.data.data.role !== "admin") {
        return false;
      }
      return true;
    } catch (error) {
      return false;
    }
  } else {
    return false;
  }
}

import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

export function Login({ onLogin }) {
  function handleSuccess(response) {
    const decoded = jwtDecode(response.credential);
    axios
      .post(`${import.meta.env.VITE_API_URL}/api/auth/google`, decoded)
      .then((res) => {
        localStorage.setItem("token", res.data.token); // optional
        onLogin(res.data);
      })
      .catch((err) => {
        console.log("Login failed:", err);
      });
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-sm text-center">
        <h4 className="mb-3">Login with Google</h4>
        <GoogleLogin onSuccess={handleSuccess} onError={() => console.log("Google Login Error")} />
      </div>
    </div>
  );
}

import { useState } from "react";
import API from "../services/api";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("buyer");

  const handleRegister = async () => {
    try {
      console.log(name, email, password, role);

      const res = await API.post("/auth/register", {
        name,
        email,
        password,
        role,
      });

      alert("Registered Successfully");
      window.location.href = "/login";
    } catch (err) {
      alert(err.response?.data?.msg || "Register Failed");
    }
  };

  return (
    <div style={{ padding: "50px" }}>
      <h2>Register</h2>

      <input placeholder="Name" onChange={(e)=>setName(e.target.value)} />
      <br /><br />

      <input placeholder="Email" onChange={(e)=>setEmail(e.target.value)} />
      <br /><br />

      <input type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} />
      <br /><br />

      <select onChange={(e)=>setRole(e.target.value)}>
        <option value="buyer">Buyer</option>
        <option value="seller">Seller</option>
      </select>

      <br /><br />

      <button onClick={handleRegister}>Register</button>
    </div>
  );
}

export default Register;
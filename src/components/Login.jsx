import React, { useState } from "react";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // เคลียร์ error เดิมก่อน

    if (!email || !password) {
      setError("กรุณากรอกอีเมลและรหัสผ่าน");
      return;
    }

    try {
      setLoading(true); // เริ่มโหลด
      await login(email, password);
      navigate("/topp7/admin");
    } catch (err) {
      setError("เข้าสู่ระบบไม่สำเร็จ: " + err.message);
    } finally {
      setLoading(false); // ไม่ว่าผลจะสำเร็จ/ล้มเหลว ก็หยุดโหลด
    }
  };

  return (
    <div>
      <h2>เข้าสู่ระบบ</h2>

      {error && <p style={{ color: "red" }}>{error}</p>} {/* ✅ ข้อความ error แดง */}

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="อีเมล"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
        />
        <input
          type="password"
          placeholder="รหัสผ่าน"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
        />
        <button type="submit" disabled={loading}>
          {loading ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
        </button>
      </form>
    </div>
  );
}

export default Login;

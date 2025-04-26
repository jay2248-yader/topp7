import React, { useEffect } from "react";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";

function Admin() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [currentUser, navigate]);

  if (!currentUser) {
    return null; // รอ redirect
  }

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <p>Welcome {currentUser.email}</p>

      {/* ปุ่มเพิ่มหัวข้อ */}
      <button
        onClick={() => navigate("/add-topic")}
        style={{ marginTop: 16 }}
      >
        เพิ่มหัวข้อ
      </button>
    </div>
  );
}

export default Admin;

"use client";

import { useEffect, useState } from "react";
import { getToken } from "firebase/app-check";
import { app, appCheck } from "@/utils/firebase";

export default function Home() {
  const [status, setStatus] = useState("Initializing...");
  const [token, setToken] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: ""
  });
  const [submitStatus, setSubmitStatus] = useState("");

  useEffect(() => {
    const getAppCheckToken = async () => {
      try {
        if (appCheck) {
          const appCheckToken = await getToken(appCheck, true);
          setToken(appCheckToken.token);
          setStatus("✅ App Check Ready");
          console.log("Token:", appCheckToken.token);
        } else {
          setStatus("⚠️ App Check not initialized");
        }
      } catch (error) {
        console.error("Token error:", error);
        setStatus("❌ Error: " + error.message);
      }
    };

    getAppCheckToken();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus("Submitting...");
    
    try {
      // Current token lein
      const appCheckToken = await getToken(appCheck, true);
      
      console.log("Form Data:", formData);
      console.log("App Check Token:", appCheckToken.token);
      
      // Agar backend API hai to yahan call karein
      // const response = await fetch('/api/submit', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     ...formData,
      //     appCheckToken: appCheckToken.token
      //   })
      // });
      
      setSubmitStatus("✅ Form submitted successfully!");
      setFormData({ name: "", email: "" });
      
      setTimeout(() => setSubmitStatus(""), 3000);
      
    } catch (error) {
      console.error("Submit error:", error);
      setSubmitStatus("❌ Error: " + error.message);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div style={{ maxWidth: "500px", margin: "0 auto", padding: "20px" }}>
      <h1>KidsBazaar</h1>
      
      {/* Status Card */}
      <div style={{
        padding: "10px",
        backgroundColor: status.includes("✅") ? "#d4edda" : "#f8d7da",
        borderRadius: "8px",
        marginBottom: "20px",
        border: "1px solid #ddd"
      }}>
        <strong>🔐 App Check Status:</strong> {status}
        {token && (
          <div style={{ 
            fontSize: "12px", 
            marginTop: "5px",
            wordBreak: "break-all",
            color: "#666"
          }}>
            Token: {token.substring(0, 50)}...
          </div>
        )}
      </div>
      
      {/* Form */}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>
            Name:
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "4px"
            }}
          />
        </div>
        
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>
            Email:
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "4px"
            }}
          />
        </div>
        
        <button
          type="submit"
          style={{
            backgroundColor: "#4CAF50",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            width: "100%"
          }}
        >
          Submit
        </button>
        
        {submitStatus && (
          <div style={{
            marginTop: "15px",
            padding: "10px",
            backgroundColor: submitStatus.includes("✅") ? "#d4edda" : "#f8d7da",
            borderRadius: "4px",
            textAlign: "center"
          }}>
            {submitStatus}
          </div>
        )}
      </form>
    </div>
  );
}
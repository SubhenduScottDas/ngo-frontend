import { useState, CSSProperties } from "react";
import axios from "axios";

const Register = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [goalAmount, setGoalAmount] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/api/causes", {
        name,
        description,
        goalAmount,
      });
      alert("Cause registered successfully");
    } catch (error) {
      console.error("Error registering cause:", error);
      alert("Failed to register cause");
    }
  };

  return (
    <div style={containerStyle}>
      <h1>Register Cause</h1>
      <form onSubmit={handleSubmit} style={formStyle}>
        <input
          type="text"
          placeholder="Cause Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={inputStyle}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          style={textareaStyle}
        />
        <input
          type="number"
          placeholder="Goal Amount"
          value={goalAmount}
          onChange={(e) => setGoalAmount(e.target.value)}
          required
          style={inputStyle}
        />
        <button type="submit" style={buttonStyle}>Register Cause</button>
      </form>
    </div>
  );
};

const containerStyle: CSSProperties = { textAlign: "center", marginTop: "50px" };
const formStyle: CSSProperties = { display: "inline-block", textAlign: "left" };
const inputStyle: CSSProperties = {
  display: "block",
  width: "100%",
  padding: "10px",
  margin: "10px 0",
  border: "1px solid #ddd",
  borderRadius: "5px",
  color: "black",
};
const textareaStyle: CSSProperties = {
  ...inputStyle,
  height: "100px",
};
const buttonStyle: CSSProperties = {
  backgroundColor: "#4CAF50",
  color: "white",
  padding: "10px 15px",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

export default Register;

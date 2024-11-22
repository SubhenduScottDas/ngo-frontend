import { useState } from "react";
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
    <div>
      <h1>Register Cause</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Cause Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Goal Amount"
          value={goalAmount}
          onChange={(e) => setGoalAmount(e.target.value)}
          required
        />
        <button type="submit">Register Cause</button>
      </form>
    </div>
  );
};

export default Register;

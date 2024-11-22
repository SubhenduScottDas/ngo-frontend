import { useState } from "react";
import axios from "axios";

const CreateCause = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [goalAmount, setGoalAmount] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setError(null);
      setSuccess(null);

      const response = await axios.post("http://localhost:8000/api/causes/create", {
        name,
        description,
        goalAmount: parseFloat(goalAmount),
      });

      setSuccess(response.data.message);
      setName("");
      setDescription("");
      setGoalAmount("");
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to create cause.");
    }
  };

  return (
    <div>
      <h1>Create a New Cause</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Cause Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div>
          <label>Goal Amount (ETH):</label>
          <input
            type="number"
            value={goalAmount}
            onChange={(e) => setGoalAmount(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create Cause</button>
      </form>
    </div>
  );
};

export default CreateCause;

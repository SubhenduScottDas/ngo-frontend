import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";

const UpdateCause = () => {
  const router = useRouter();
  const { causeId } = router.query;

  const [cause, setCause] = useState<any>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [goalAmount, setGoalAmount] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (!causeId) return;

    axios
      .get(`http://localhost:8000/api/causes/${causeId}`)
      .then((response) => {
        setCause(response.data);
        setName(response.data.name);
        setDescription(response.data.description);
        setGoalAmount(response.data.goalAmount);
      })
      .catch(() => {
        setError("Failed to fetch cause details.");
      });
  }, [causeId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setError(null);
      setSuccess(null);

      await axios.put(`http://localhost:8000/api/causes/update/${causeId}`, {
        name,
        description,
        goalAmount: parseFloat(goalAmount),
      });

      setSuccess("Cause updated successfully.");
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to update cause.");
    }
  };

  return (
    <div>
      <h1>Update Cause</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
      {cause && (
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
          <button type="submit">Update Cause</button>
        </form>
      )}
    </div>
  );
};

export default UpdateCause;

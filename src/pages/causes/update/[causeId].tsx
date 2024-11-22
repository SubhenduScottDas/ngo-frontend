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
    <div className="container">
      <h1 className="header">Update Cause</h1>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
      {cause && (
        <form onSubmit={handleSubmit}>
          <div className="formGroup">
            <label className="label">Cause Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="input"
            />
          </div>
          <div className="formGroup">
            <label className="label">Description:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="textarea"
            ></textarea>
          </div>
          <div className="formGroup">
            <label className="label">Goal Amount (ETH):</label>
            <input
              type="number"
              value={goalAmount}
              onChange={(e) => setGoalAmount(e.target.value)}
              required
              className="input"
            />
          </div>
          <button type="submit" className="button">
            Update Cause
          </button>
        </form>
      )}
      <style jsx>{`
        .container {
          padding: 20px;
          max-width: 600px;
          margin: auto;
        }

        .header {
          text-align: center;
        }

        .error {
          color: red;
          text-align: center;
        }

        .success {
          color: green;
          text-align: center;
        }

        .formGroup {
          margin-bottom: 15px;
        }

        .label {
          display: block;
          margin-bottom: 5px;
        }

        .input,
        .textarea {
          width: 100%;
          padding: 8px;
          border: 1px solid #ccc;
          border-radius: 4px;
          color: black;
        }

        .textarea {
          height: 100px;
        }

        .button {
          padding: 10px 20px;
          background-color: #007BFF;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default UpdateCause;

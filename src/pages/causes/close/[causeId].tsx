import { useRouter } from "next/router";
import { useState } from "react";
import axios from "axios";

const CloseCause = () => {
  const router = useRouter();
  const { causeId } = router.query;

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleClose = async () => {
    try {
      setError(null);
      setSuccess(null);

      await axios.put(`http://localhost:8000/api/causes/close/${causeId}`);

      setSuccess("Cause closed successfully.");
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to close cause.");
    }
  };

  return (
    <div>
      <h1>Close Cause</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
      <button onClick={handleClose}>Close Cause</button>
    </div>
  );
};

export default CloseCause;

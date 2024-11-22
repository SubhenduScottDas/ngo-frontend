import { useState, useEffect } from "react";
import Link from 'next/link';
import axios from "axios";
import { Cause } from "../types/cause"; // Import the Cause type

const Index = () => {
  const [causes, setCauses] = useState<Cause[]>([]); // Default empty array
  const [loading, setLoading] = useState(true);     // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/causes") // Fetch causes from the backend
      .then((response) => {
        setCauses(response.data);  // Populate causes on success
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load causes. Please try again later.");
        setLoading(false);
        console.error(err);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;  // Display loading message
  }

  if (error) {
    return <div>{error}</div>;  // Display error message
  }

  return (
    <div>
      <h1>Available Causes</h1>
      {/* Add navigation for creating a new cause */}
      <Link href="/causes/create">
        <button style={buttonStyle}>Create New Cause</button>
      </Link>

      {causes.length === 0 ? (
        <div>No causes available at the moment.</div>
      ) : (
        <ul>
          {causes.map((cause) => (
            <li key={cause.id} style={cardStyle}>
              <h2>{cause.name}</h2>
              <p>{cause.description}</p>
              <p>
                <strong>Goal:</strong> {cause.goalAmount} ETH | <strong>Raised:</strong> {cause.fundsRaised} ETH
              </p>
              {/* Donation button */}
              <Link href={`/donate/${cause.id}`}>
                <button style={buttonStyle}>Donate Now</button>
              </Link>
              {/* Update cause button */}
              <Link href={`/causes/update/${cause.id}`}>
                <button style={buttonStyle}>Update Cause</button>
              </Link>
              {/* Close cause button */}
              <Link href={`/causes/close/${cause.id}`}>
                <button style={dangerButtonStyle}>Close Cause</button>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// Basic styling for buttons and cards
const buttonStyle = {
  backgroundColor: "#4CAF50",
  color: "white",
  padding: "10px 15px",
  margin: "5px",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

const dangerButtonStyle = {
  ...buttonStyle,
  backgroundColor: "#FF5733",
};

const cardStyle = {
  border: "1px solid #ddd",
  padding: "10px",
  margin: "10px 0",
  borderRadius: "5px",
};

export default Index;

import { useState, useEffect, CSSProperties } from "react";
import { ethers } from "ethers";
import { useRouter } from "next/router";
import { Cause } from "../../types/cause"; 

const Donate = () => {
  const [amount, setAmount] = useState("");
  const [cause, setCause] = useState<Cause | null>(null); // Initialize cause with Cause type or null
  const router = useRouter();
  const { causeId } = router.query;

  useEffect(() => {
    if (causeId) {
        // Fetch the cause details from the backend
      fetch(`http://localhost:8000/api/causes/${causeId}`)
        .then((res) => res.json())
        .then((data) => setCause(data))
        .catch((err) => console.error(err));
    }
  }, [causeId]);

  const handleDonation = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      alert("Please enter a valid donation amount");
      return;
    }

    const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
    if (!contractAddress) {
      console.error("Contract address is not defined in environment variables");
      alert("Contract address is not configured");
      return;
    }

    try {
      const provider = new ethers.JsonRpcProvider(process.env.NEXT_PUBLIC_INFURA_URL);
      const signer = provider.getSigner(); // Assuming the user has MetaMask connected
      const contract = new ethers.Contract(contractAddress, [
        "function donate(uint _causeId) public payable",
      ], await signer);

      const tx = await contract.donate(causeId, { value: ethers.parseEther(amount) });
      await tx.wait();

      alert("Donation successful!");
    } catch (error) {
      console.error("Error donating:", error);
      alert("Donation failed!");
    }
  };

  if (!cause) return <div style={loadingStyle}>Loading...</div>;

  return (
    <div style={containerStyle}>
      <h1>Donate to {cause.name}</h1>
      <p>{cause.description}</p>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter donation amount (ETH)"
        style={inputStyle}
      />
      <button onClick={handleDonation} style={buttonStyle}>Donate</button>
    </div>
  );
};

const containerStyle: CSSProperties = { textAlign: "center", marginTop: "50px" };
const inputStyle: CSSProperties = {
  padding: "10px",
  margin: "10px 0",
  width: "200px",
  color: "black",
};
const buttonStyle: CSSProperties = {
  padding: "10px 20px",
  backgroundColor: "#4CAF50",
  color: "white",
  border: "none",
  cursor: "pointer",
  borderRadius: "5px",
};
const loadingStyle: CSSProperties = { textAlign: "center", marginTop: "50px", fontSize: "18px" };

export default Donate;

import { useState, useEffect } from "react";
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
        .then(res => res.json())
        .then(data => setCause(data))
        .catch(err => console.error(err));
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
        "function donate(uint _causeId) public payable"
      ], await signer);

      const tx = await contract.donate(causeId, { value: ethers.parseEther(amount) });
      await tx.wait();

      alert("Donation successful!");
    } catch (error) {
      console.error("Error donating:", error);
      alert("Donation failed!");
    }
  };

  if (!cause) return <div>Loading...</div>;

  return (
    <div>
      <h1>Donate to {cause.name}</h1>
      <p>{cause.description}</p>
      <input 
        type="number" 
        value={amount} 
        onChange={(e) => setAmount(e.target.value)} 
        placeholder="Enter donation amount (ETH)" 
      />
      <button onClick={handleDonation}>Donate</button>
    </div>
  );
};

export default Donate;

import React, { useState } from 'react';
import { ethers } from 'ethers';
import { contractAbi, contractAddress, datetoSol } from '../Constant/constant';


const AdminScreen = (props) => {
// const [showVest, SetVest] = useState(false);

 return(
    <div className="flext flex-col bg-gray-100 flex items-center justify-center h-screen">
    <div className="text-center">
      <h1 className="text-5xl font-bold mb-8 text-purple-700">Welcome {props.data['name']}</h1>
      <h1 className="text-3xl font-bold mb-8 text-gray-700">Your token is {props.data['token']}</h1>
      <h1 className="text-2xl mb-8 text-gray-700">Vest your token</h1>
      </div>
      <Form uid={props.data['add']} tokenName={props.data['token']}/>
  </div>
 );
}


function Form(uid, tokenName) {
    const [stakeholders, setStakeholders] = useState([]);
    const [time, setTime] = useState('');
    const [tokens, setTokens] = useState('');
    const [whitelistIds, setWhitelistIds] = useState([]);
    const [newWhitelistId, setNewWhitelistId] = useState('');
  
    const handleStakeholderChange = (e) => {
      const { value } = e.target;
      if (stakeholders.includes(value)) {
        setStakeholders(stakeholders.filter(item => item !== value));
      } else {
        setStakeholders([...stakeholders, value]);
      }
    };
  
    const handleWhitelistIdChange = (e) => {
      setNewWhitelistId(e.target.value);
    };
  
    const handleAddWhitelistId = () => {
      if (newWhitelistId.trim() !== '') {
        setWhitelistIds([...whitelistIds, newWhitelistId]);
        setNewWhitelistId('');
      }
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      // Handle form submission
    var times = datetoSol(time);
      console.log({
        stakeholders,
        times,
        tokens,
        whitelistIds,   
      });

      // Reset form fields
     VestToken(times);
    };

    async function VestToken(times){
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        var uiid = uid['uid'];
        var NameToken = uid['tokenName'];
          await provider.send("eth_requestAccounts", []);
          const signer = provider.getSigner();
          const contractInstance = new ethers.Contract (
            contractAddress, contractAbi, signer
          );
          console.log(uiid);
          const tx = await contractInstance.vest(stakeholders,times,tokens,NameToken,whitelistIds);
          await tx.wait();
          setStakeholders([]);
          setTime('');
          setTokens('');
          setWhitelistIds([]);
          setNewWhitelistId('');
      }
  
    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md w-1/2">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Set Stakeholders:
            <select multiple value={stakeholders} onChange={handleStakeholderChange} className="form-multiselect mt-1 block w-full">
              <option value="Community">Community</option>
              <option value="Investors">Investors</option>
              <option value="Pre-Sale Buyers">Pre-Sale Buyers</option>
              <option value="Founders">Founders</option>
            </select>
          </label>
        </div>
        <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Set Date and Time:
          <input type="datetime-local" value={time} onChange={(e) => setTime(e.target.value)} className="form-input mt-1 block w-full" />
        </label>
      </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Number of Tokens:
            <input type="number" value={tokens} onChange={(e) => setTokens(e.target.value)} className="form-input mt-1 block w-full" />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Whitelist IDs:
            <input type="text" value={newWhitelistId} onChange={handleWhitelistIdChange} className="form-input mt-1 block w-full" />
            <button type="button" onClick={handleAddWhitelistId} className="bg-blue-500 text-white px-4 py-2 rounded-md ml-2">Add</button>
          </label>
          <ul>
            {whitelistIds.map((id, index) => (
              <li key={index}>{id}</li>
            ))}
          </ul>
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">Submit</button>
      </form>
    );
  }

// export default Form;


export default AdminScreen;
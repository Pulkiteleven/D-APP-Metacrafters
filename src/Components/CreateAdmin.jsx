import React, { useState } from 'react';
import { ethers } from 'ethers';
import { contractAbi, contractAddress } from '../Constant/constant';


const CreateNewAdmin = (props) => {
  const [name, setName] = useState('');
  const [token, setToken] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log("Name:", name);
    console.log("Token:", token);
    createAdmin();
  };

  async function createAdmin(){
    console.log(props.account);
    var uid = props.account;
    const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const contractInstance = new ethers.Contract (
        contractAddress, contractAbi, signer
      );

      const tx = await contractInstance.addAdmin(
        uid,name,token);
        // {props.eoa};
       
      await tx.wait();
      props.moa();
      // props.moa;
  }

  return (
    <div className='bg-gray-100 flex items-center justify-center h-screen'>
    <form className="max-w-md mx-auto mt-8" onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name:</label>
        <input
          type="text"
          id="name"
          className="border border-gray-300 rounded px-4 py-2 w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="token" className="block text-gray-700 font-bold mb-2">Token Name:</label>
        <input
          type="text"
          id="token"
          className="border border-gray-300 rounded px-4 py-2 w-full"
          value={token}
          onChange={(e) => setToken(e.target.value)}
        />
      </div>

      <div className="text-center">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </button>
      </div>
    </form>
    </div>
  );

}

export default CreateNewAdmin;
import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { contractAbi, contractAddress, formatDate, solToDate } from '../Constant/constant';


const UserScreen = (props) => {
 const [tokenValue, setTokenValue] = useState(props.data['token']);
 
 async function ClaimTokens(val){
    const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const contractInstance = new ethers.Contract (
        contractAddress, contractAbi, signer
      );
      var uiid = props.data['add'];
      var value = val;
      const tx = await contractInstance.claim(uiid,value);
      await tx.wait();
      setTokenValue(tokenValue+val);
    console.log('hello');
    console.log(tokenValue);
      
  }

 const increaseToken  = (val) =>{
    ClaimTokens(val);
 }
 return(
    <div className="flext flex-col bg-gray-100 flex items-center justify-center h-screen">
    <div className="text-center">
      <h1 className="text-5xl font-bold mb-8 text-purple-700">Welcome {props.data['name']}</h1>
      <h1 className="text-3xl font-bold mb-8 text-gray-700">Your StakeHolder is {props.data['holder']}</h1>
      <h1 className="text-2xl mb-8 text-gray-700">You have {tokenValue} Tokens</h1>
      </div>
      <AllTokens uid={props.data['add']} holder={props.data['holder']} claim={increaseToken}/>
  </div>
 );
}

const AllTokens = (props) =>{
    const [futureTokens, setFutureTokens] = useState([]);
    const [nowTokens, setNowTokens] = useState([]);

    useEffect(() => {
        getTokens();
    }, []);
    async function getTokens(){
        const provider = new ethers.providers.Web3Provider(window.ethereum);
          await provider.send("eth_requestAccounts", []);
          const signer = provider.getSigner();
          const contractInstance = new ethers.Contract (
            contractAddress, contractAbi, signer
          );
          
          try{
          const TokeData = await contractInstance.getAllToken();
          console.log(TokeData);
          var userAddress = props.uid;
          var userholder = props.holder;
        //   console.log(userAddress, userholder);

            const upcomingTokens = TokeData.map((token, index) =>{
                var times = solToDate(token[1].toNumber());
                
                const tokenTime = new Date(times);
                
                const today = new Date();
                if(tokenTime > today){
                if(token[3].includes(userholder) || token[4].includes(userAddress)){
                    console.log(token); 
                    return {
                        index:index,
                        by:token[0],
                        time:tokenTime,
                        value:token[2].toNumber(),
                        }
                }
            }
            });

            

            const AvailableTokens = TokeData.map((token, index) => {
                var times = solToDate(token[1].toNumber());
                const tokenTime = new Date(times);
                const today = new Date();
                
                // Check if token[0] is defined and not an empty string
                if (typeof token[0] !== 'undefined' && token[0] !== '') {
                    if (tokenTime < today) {
                        if (token[3].includes(userholder) || token[4].includes(userAddress)) {
                            console.log(token);
                            return {
                                index: index,
                                by: token[0],
                                time: tokenTime,
                                value: token[2].toNumber(),
                            }
                        }
                    }
                }
            });
            
            const ATo = AvailableTokens.filter((value) => value !== undefined);
            const UTo = upcomingTokens.filter((value) => value !== undefined);

            // console.log(upcomingTokens.length);
            // console.log(upcomingTokens);
            setFutureTokens(UTo);
            setNowTokens(ATo);


            console.log(futureTokens);
            console.log(nowTokens);
          
          
          }
        catch(err){
          
        }
      }

      return (
        <div className="flext flex-col bg-gray-100 flex items-center justify-center h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-8 text-purple-700">Available Tokens</h1>
          <table className="m-4 border-collapse border w-full">
    <thead>
        <tr>
            <th className="p-3 border">Token Name</th>
            <th className="p-3 border">Token Value</th>
            <th className="p-3 border">Token Date</th>
            <th className="p-3 border">Claim</th>
        </tr>
    </thead>
    <tbody>
        {nowTokens.map((tokens, index) => (
            <tr key={index}>
                <td className="p-3 border">{tokens.by}</td>
                <td className="p-3 border">{tokens.value}</td>
                <td className="p-3 border">{formatDate(tokens.time)}</td>
                <td className="p-3 border">
                    <button
                        onClick={() => {
                            console.log(tokens); 
                            props.claim(tokens.value);// This will log tokens when the button is clicked
                        }}
                        className="w-32 bg-purple-800 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                    >
                        Claim
                    </button>
                </td>
            </tr>
        ))}
    </tbody>
</table>


          <h1 className="text-2xl font-bold mb-8 text-purple-700">Upcoming Tokens</h1>
          <table className="w-full border-collapse border">
    <thead>
        <tr className="bg-gray-200">
            <th className="p-3 border">Token Name</th>
            <th className="p-3 border">Token Value</th>
            <th className="p-3 border">Available Date</th>
        </tr>
    </thead>
    <tbody>
        {futureTokens.map((tokens, index) => (
            <tr key={index}>
                <td className="p-3 border">{tokens.by}</td>
                <td className="p-3 border">{tokens.value}</td>
                <td className="p-3 border">{formatDate(tokens.time)}</td>
            </tr>
        ))}
    </tbody>
</table>

          </div>
      </div>
      );
}

export default UserScreen;
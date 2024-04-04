import logo from './logo.svg';
import './App.css';
import Login from './Components/login';
import CreateNewUser from './Components/CreateUser';
import { ethers } from 'ethers';
import { useState, useEffect } from 'react';
import { contractAbi, contractAddress } from './Constant/constant';
import AdminScreen from './Components/Admin';
import UserScreen from './Components/User';
import CreateNewAdmin from './Components/CreateAdmin';

function App() {
  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [oneUser, setOneUser] = useState(null);
  const [oneAdmin, setOneAdmin] = useState(null);
  const [newUser, setNewUser] = useState(false);
  const [newAdmin, setNewAdmin] = useState(false);
  const [oldUser, setOldUser] = useState(false);
  const [oldAdmin, setOldAdmin] = useState(false);

  // useEffect( () => {
  //   if (window.ethereum) {
  //     window.ethereum.on('accountsChanged', handleAccountsChanged);
  //   }

  //   return() => {
  //     if (window.ethereum) {
  //       window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
  //     }
  //   }
  // });

  function makeOldUser(){
    getUsers();
    // setOldUser(true);
    // setNewUser(false);
  }

  function makeOldAdmin (){
    getAdmin();
  }


  if(isConnected){
    if(newUser){
      return (<div>
        <CreateNewUser account={account} mos={makeOldUser}/>
      </div>);
    }
    else if (newAdmin){
      return (<div>
        <CreateNewAdmin account = {account} moa={makeOldAdmin}/>
      </div>);
    }
    else if(oldUser){
      return (<div>
        <UserScreen data={oneUser}/>
      </div>)
    }
    else{
      return (<div>
        <AdminScreen data={oneAdmin}/>
      </div>);
    }
  }
  else{
    return (<div>
      <Login connectAdmin={connectToMetamaskAdmin} connectUser={connectToMetamask} />;
    </div>);
  }



  async function connectToMetamask(){
    if(window.ethereum){
      try{
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(provider);
        await provider.send("eth_requestAccounts",[]);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
        console.log("Metamask Connected : " + address);
        
        // if(isAdmin){
        // getAdmin(address);
        // }
        // else{
          getUsers(address);
        // }
      }
      catch(err){
        console.error(err);
      }
    }
    else{
      console.error("Metamask is not detected");
    }
  }
  
  async function connectToMetamaskAdmin(){
    if(window.ethereum){
      try{
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(provider);
        await provider.send("eth_requestAccounts",[]);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
        console.log("Metamask Connected : " + address);
        
        // if(isAdmin){
        // getAdmin(address);
        // }
        // else{
          getAdmin(address);
        // }
      }
      catch(err){
        console.error(err);
      }
    }
    else{
      console.error("Metamask is not detected");
    }
  }

  async function getUsers(uid){
    const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const contractInstance = new ethers.Contract (
        contractAddress, contractAbi, signer
      );
      // console.log("account is" + uid);
      try{
      const userData = await contractInstance.getUser(uid);
      setIsConnected(true);
     

      if(userData[1] == ''){
        setNewUser(true);
      }
      else{
        var UserMap = {
          'name': userData[0],
          'add': userData[1],
          'holder': userData[2],
          'token': userData[3].toNumber(),
        };
        setOneUser(UserMap);
        setOldUser(true);
      }
      console.log(userData);
      }
    catch(err){
      console.log("No User");
      setIsConnected(true);
      setNewUser(true);
    }
  }

  async function getAdmin(uid){
    const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const contractInstance = new ethers.Contract (
        contractAddress, contractAbi, signer
      );
      console.log("account is" + uid);
      try{
      const userData = await contractInstance.getAdmin(uid);
      setIsConnected(true);
      if(userData[1] == ''){
        setNewAdmin(true);
      }
      else{
        var UserMap = {
          'name': userData[0],
          'add': userData[1],
          'token': userData[2],
        };
        setOneAdmin(UserMap);
        setOldAdmin(true);
      }
      console.log(userData);
      }
    catch(err){
      console.log("No User");
      setIsConnected(true);
      setNewAdmin(true);
    }
  }
}

export default App;

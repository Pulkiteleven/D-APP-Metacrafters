import React from "react";

const Login = (props) => {
    return (
        <div className="bg-gray-100 flex items-center justify-center h-screen">
    <div className="text-center">
      <h1 className="text-5xl font-bold mb-8 text-purple-700">Welcome to D-APP</h1>
      <h1 className="text-3xl font-bold mb-8 text-gray-700">Select your login type</h1>
      <div className="flex flex-col items-center space-y-4">
        <button 
        onClick={props.connectAdmin}
        className="w-32 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Admin
        </button>
        <button 
        onClick={props.connectUser}
        className="w-32 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          User
        </button>
      </div>
    </div>
  </div>
    );
}

export default Login
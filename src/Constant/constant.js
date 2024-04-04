const contractAddress = "0x77ABC5c1cF6292044b3C31B44a1563F3B517260E";

const contractAbi = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "ad",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "token",
				"type": "string"
			}
		],
		"name": "addAdmin",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "ad",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "holder",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			}
		],
		"name": "addUser",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"name": "allAdmin",
		"outputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "add",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "token",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "allTokens",
		"outputs": [
			{
				"internalType": "string",
				"name": "by",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "time",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "val",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"name": "allUsers",
		"outputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "add",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "holder",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "tokens",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "user",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "val",
				"type": "uint256"
			}
		],
		"name": "claim",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "id",
				"type": "string"
			}
		],
		"name": "getAdmin",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "add",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "token",
						"type": "string"
					}
				],
				"internalType": "struct Hehe.Admin",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAllToken",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "by",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "time",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "val",
						"type": "uint256"
					},
					{
						"internalType": "string[]",
						"name": "holders",
						"type": "string[]"
					},
					{
						"internalType": "string[]",
						"name": "whiteList",
						"type": "string[]"
					}
				],
				"internalType": "struct Hehe.Token[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "id",
				"type": "string"
			}
		],
		"name": "getUser",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "add",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "holder",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "tokens",
						"type": "uint256"
					}
				],
				"internalType": "struct Hehe.User",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string[]",
				"name": "holders",
				"type": "string[]"
			},
			{
				"internalType": "uint256",
				"name": "time",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "val",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "admin",
				"type": "string"
			},
			{
				"internalType": "string[]",
				"name": "white",
				"type": "string[]"
			}
		],
		"name": "vest",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
];

function datetoSol(dateTime) {
    const [dateStr, timeStr] = dateTime.split('T');
    const [year, month, day] = dateStr.split('-').map(Number);
    const [hour, minute] = timeStr.split(':').map(Number);
    

    const unixTimestamp = new Date(year, month - 1, day, hour, minute).getTime() / 1000;
    return unixTimestamp;

}

function solToDate(unixTimestamp) {
    const date = new Date(unixTimestamp * 1000);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    const hour = ('0' + date.getHours()).slice(-2);
    const minute = ('0' + date.getMinutes()).slice(-2);

    return `${year}-${month}-${day}T${hour}:${minute}`;
}

function formatDate(date) {
    const options = {
        hour: '2-digit',
        minute: '2-digit',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    };
    return new Intl.DateTimeFormat('en-US', options).format(date);
}



export {contractAddress,contractAbi,datetoSol,solToDate,formatDate};
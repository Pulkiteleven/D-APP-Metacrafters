// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract Hehe {
    struct User {
        string name;
        string add;
        string holder;
        uint256 tokens;  // Corrected from string to uint256
    }

    
    // constructor(string memory _name, uint256 _age) {
    //     myPerson = Person(_name, _age);
    // }

    struct Admin {
        string name;
        string add;
        string token;
    }

    struct Token {
        string by;
        uint256 time;  // Added for vesting period
        uint256 val;
        string[] holders;
        string[] whiteList;
    }

    mapping (string => User) public allUsers;
    mapping (string => Admin) public  allAdmin;

    // User[] public users;
    // Admin[] public admins;
    Token[] public allTokens;

   function getUser(string memory id) public view returns (User memory) {
    return allUsers[id];
    }

    function getAdmin(string memory id) public  view returns (Admin memory){
        return  allAdmin[id];
    }

    function getAllToken() public  view  returns (Token[] memory){
        return allTokens;
    }
    
    function addUser(string memory ad, string memory holder, string memory name) public {
        allUsers[ad] = User({
            name: name,
            add: ad,
            holder: holder,
            tokens: 0  // Corrected from string to uint256
        });
        
    }

    function addAdmin(string memory ad, string memory name, string memory token) public {
        allAdmin[ad] = Admin({
            name:name,
            add:ad,
            token:token
        });
    }

    function vest(string[] memory holders, uint256 time, uint256 val, string memory admin, string[] memory white) public {
        allTokens.push(Token({
            by: admin,
            time: time,  // Added for vesting period
            val: val,
            holders: holders,  // Corrected to use holders array
            whiteList: white
        }));
    }

    function claim(string memory user, uint val) public {
        allUsers[user].tokens += val;
    }
}

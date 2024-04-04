async function main() {
    const HEHE = await ethers.getContractFactory("Hehe");
  
    // Start deployment, returning a promise that resolves to a contract object
    const HEHE_ = await HEHE.deploy();
    console.log("Contract address:", HEHE_.address);
  
  
  }
  
  main()
   .then(() => process.exit(0))
   .catch(error => {
     console.error(error);
     process.exit(1);
   });
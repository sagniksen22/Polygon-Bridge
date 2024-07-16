// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.

require('dotenv').config();
const { ethers } = require("hardhat");

const nftAddress = "0x473f0778f72aa0e7b086D0048639B0Ea475245B9";
const networkAddress = 'https://polygon-amoy-bor-rpc.publicnode.com';
const privateKey = process.env.PRIVATE_KEY;
const provider = new ethers.providers.JsonRpcProvider(networkAddress);
const wallet = new ethers.Wallet(privateKey, provider);

async function main() {

  const nftContract = await ethers.getContractFactory("NFT");
  const nft = nftContract.attach(nftAddress);
  console.log("You have: " + await nft.balanceOf(wallet.address) + " nfts");  
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
const hre = require("hardhat");
const fxRootContractABI = require("../fxRootContractABI.json");
const tokenContractJSON = require("../artifacts/contracts/MyNFT.sol/MyNFT.json");

const tokenAddress = "0xFF216B2b99AfBb9CbEAd90C0891592C8333B3A27";// update
const FxERC721RootTunnel = "0x9E688939Cb5d484e401933D850207D6750852053";
const walletAddress = "0x0D53f8320766e9384846Da681dbd51db9D1Ef228";

async function main() {
  const contract = await hre.ethers.getContractFactory("MyNFT"); // Replace "MyNFT" with your actual NFT contract name
  const tokenContract = await hre.ethers.getContractAt(tokenContractJSON.abi, tokenAddress);
  const fxContract = await hre.ethers.getContractAt(fxRootContractABI, FxERC721RootTunnel);

  const approveTx = await tokenContract.approve(FxERC721RootTunnel, 1);
  await approveTx.wait();

  console.log('Approval confirmed');

  const nftAddresses = [tokenAddress]; // Add more NFT contract addresses if needed
  const tokenIds = [1];

  async function depositNFTs(fxContract, nftAddresses, tokenIds, walletAddress) {
    for (let i = 0; i < nftAddresses.length; i++) {
      const nftAddress = nftAddresses[i];
      const tokenId = tokenIds[i];
      const depositTx = await fxContract.deposit(nftAddress, walletAddress, tokenId, "0x6556");
      await depositTx.wait();
    }
  }

  await depositNFTs(fxContract, nftAddresses, tokenIds, walletAddress);

  console.log("Tokens deposited");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

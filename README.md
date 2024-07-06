# Polygon-Bridge

To accomplish the tasks you outlined, we'll break it down step by step:

### Step 1: Generate a 5-item collection using DALL-E 2 or Midjourney

Let's assume we have generated 5 unique images using DALL-E 2 or Midjourney. These images will be stored on IPFS using pinata.cloud.

### Step 2: Store items on IPFS using pinata.cloud

Assuming you have the images ready, you would upload each image to IPFS via pinata.cloud and obtain their respective IPFS URLs.

### Step 3: Deploy an ERC721 Contract to the   Ethereum Testnet

We'll deploy an ERC721 contract to the Ethereum Testnet. This contract will have a `promptDescription` function that returns the prompt used to generate the images.

### Step 4: Map Your NFT Collection using Polygon network token mapper

Mapping your ERC721 tokens to Polygon network (Matic) helps in interoperability and lower transaction costs. This step isn't strictly necessary but can be useful.

### Step 5: Write a Hardhat script to batch mint all NFTs (ERC721)

Hardhat is a development environment that facilitates Ethereum smart contract development. We'll write a script to mint all 5 NFTs in one go.

### Step 6: Write a Hardhat script to batch transfer all NFTs from Ethereum to Polygon Mumbai using the FxPortal Bridge

FxPortal Bridge allows cross-chain transfers between Ethereum and Polygon Mumbai (testnet). We'll write another script to transfer all 5 NFTs from Ethereum ( ) to Polygon Mumbai using the bridge.

### Implementation Details

#### 1. Smart Contract Deployment (ERC721)

Assuming you have a Solidity smart contract (`MyNFT.sol`) for ERC721 with the necessary functions:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract MyNFT is ERC721 {
    string[] private prompts; // Store prompts used for each token

    constructor() ERC721("MyNFT", "MNFT") {}

    function mintNFT(address to, string memory prompt) external {
        uint256 tokenId = totalSupply();
        _mint(to, tokenId);
        prompts.push(prompt);
    }

    function promptDescription(uint256 tokenId) external view returns (string memory) {
        require(tokenId < prompts.length, "Token ID does not exist");
        return prompts[tokenId];
    }
}
```

#### 2. Hardhat Scripts

Create two Hardhat scripts (`mintNFTs.js` and `transferNFTs.js`):

**mintNFTs.js**:

```javascript
const { ethers } = require("hardhat");

async function main() {
    const MyNFT = await ethers.getContractFactory("MyNFT");
    const contract = await MyNFT.deploy();
    await contract.deployed();

    // Mint NFTs with respective prompts
    const prompts = ["Prompt 1", "Prompt 2", "Prompt 3", "Prompt 4", "Prompt 5"];
    for (let i = 0; i < prompts.length; i++) {
        await contract.mintNFT("0xAddressToReceiveNFT", prompts[i]);
    }

    console.log("NFTs minted successfully!");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
```

**transferNFTs.js**:

```javascript
const { ethers } = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();
    const bridgeAddress = ""; // Address of FxPortal Bridge
    const MyNFT = await ethers.getContractFactory("MyNFT");
    const contract = await MyNFT.attach("ContractAddress"); // Replace with deployed contract address

    // Transfer all NFTs to Polygon using FxPortal Bridge
    const numTokens = 5; // Number of tokens to transfer
    for (let i = 0; i < numTokens; i++) {
        const tokenId = i;
        await contract.safeTransferFrom(deployer.address, bridgeAddress, tokenId);
    }

    console.log("NFTs transferred to Polygon successfully!");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
```

### Notes:

- Replace placeholders (`0xAddressToReceiveNFT`, `ContractAddress`, `bridgeAddress`) with actual addresses.
- Ensure you have Hardhat set up with necessary plugins (`@nomiclabs/hardhat-ethers`, `@openzeppelin/hardhat-upgrades`, etc.).
- For IPFS storage, replace placeholder with actual IPFS URLs where images are stored.

These scripts assume familiarity with Ethereum development, Hardhat, and the concepts of IPFS and blockchain bridges. Adjustments may be needed based on specific contract implementations and environment setups.

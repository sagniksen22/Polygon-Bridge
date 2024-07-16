const fs = require('fs');
const path = require('path');
console.log(__dirname);

for (let i = 1; i <= 5; i++) {

  // Creates a JSON object for each NFT
  const json = {
      name: `harsh NFT #${i}`,
      description: ` earth future #${i}`,
      image: `https://gateway.pinata.cloud/ipfs/QmRcRbuxFscuRB1TAZLrK1HkS4uQwDuoUDnrwUEaRVovw5/${i}.jpeg`
  };

  // Writes the JSON object to a file
  fs.writeFileSync(
    path.join(__dirname, 'collection', String(i)),
    JSON.stringify(json)
  );
}

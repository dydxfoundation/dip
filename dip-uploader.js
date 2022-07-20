#!/usr/bin/env node
const bs58 = require('bs58');
const fs = require('fs')
const fetch = require('node-fetch')
const { execSync } = require('child_process');
const { exit } = require('process');

const { PINATA_KEY, PINATA_SECRET } = process.env;

const pinataEndpoint = 'https://api.pinata.cloud/pinning/pinJSONToIPFS'

async function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const rawJsonDips = JSON.parse(fs.readFileSync('./content/ipfs-dips/all-dips.json').toString());
const jsonDips = Object.values(rawJsonDips);

async function main() {
  dipNumbers = jsonDips.map((jsonDip) => jsonDip.DIP - 1).sort((a, b) => a - b)

  for (let x = 0; x < dipNumbers.length; x++) {
    const id = dipNumbers[x].toString();

    delete Object.assign(jsonDips[id], { 'description': jsonDips[id]['content'] })['content'];
    
    try {
      const res = await fetch(pinataEndpoint, {
        method: 'POST',
        body: JSON.stringify({
          pinataOptions: { cidVersion: 0 },
          pinataContent: jsonDips[id],
        }),
        headers: {
          'Content-Type': 'application/json',
          pinata_api_key: PINATA_KEY,
          pinata_secret_api_key: PINATA_SECRET,
        },
      })

      if (!res.ok) {
        throw Error(await res.text());
      }

      const result = await res.json()

      if (result.error) throw { message: result.error }

      const hash = result.IpfsHash
      const encodedHash = `0x${bs58
        .decode(hash)
        .slice(2)
        .toString('hex')
        }`
      jsonDips[id].ipfsHash = hash
      jsonDips[id].encodeIpfsHash = encodedHash
      const dipId = jsonDips[id].DIP - 1
      console.log(`${jsonDips[id].title}: ✅ Success!`)
      console.log(` IPFS hash: ${hash}`)
      console.log(` Encoded IPFS hash (for proposal creation): ${encodedHash}`)
      console.log(` See the file here: https://gateway.pinata.cloud/ipfs/${hash}`)
      fs.writeFileSync(
        `./content/ipfs-dips/${jsonDips[id].basename}-Ipfs-hashes.json`,
        JSON.stringify({ dip: dipId.toString(), hash, encodedHash }, null, 2)
      )
      fs.writeFileSync(
        `./content/ipfs-dips/all-dips.json`,
        JSON.stringify(jsonDips, null, 2)
      )
      await delay(250);
      execSync(`curl -s https://gateway.pinata.cloud/ipfs/${hash} > tmp && curl -sF file='@./tmp' https://api.thegraph.com/ipfs/api/v0/add`, (err, stdout, stderr) => {
        if (err) {
          throw new Error(stderr)
        }
        console.log(stdout)
      });
      await delay(250);
    } catch (error) {
      console.error(`Error during main loop: ${error}`)
      throw error;
    }
  }
}


(async () => {
  try {
    await main();
  } catch (e) {
    console.error(`Exiting [dip-uploader] process due next error: \n ${error}`)
    exit(1)
  }
})();

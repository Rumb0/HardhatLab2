import { ethers } from "hardhat";

async function main() {
  const initialSupply = ethers.utils.parseEther("1337");

  const KekiToken = await ethers.getContractFactory("KekiToken");
  const kekiToken= await KekiToken.deploy(initialSupply);

  await kekiToken.deployed();

  console.log(`Token deployed to ${kekiToken.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

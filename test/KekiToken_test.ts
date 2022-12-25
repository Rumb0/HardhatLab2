import { assert, expect } from "chai";
import { ethers } from "hardhat";
const { time, loadFixture } = require("@nomicfoundation/hardhat-network-helpers");

describe("Token contract", function () {

  async function deployTokenFixture() {
    const initialSupply = ethers.utils.parseEther("200");
    const KekiToken = await ethers.getContractFactory("KekiToken");
    const kekiToken = await KekiToken.deploy(initialSupply);
    await kekiToken.deployed();

    return kekiToken;
  }

  it("Should be able to transfer payment for mems", async function() {
    const kekiToken = await loadFixture(deployTokenFixture);
    const [owner, addr1, addr2] = await ethers.getSigners();

    await kekiToken.transfer(addr1.address, 50);
    expect(await kekiToken.balanceOf(addr1.address)).to.equal(50);

    await kekiToken.connect(addr1).transfer(addr2.address, 50);
    expect(await kekiToken.balanceOf(addr2.address)).to.equal(50);
  });


  it("Should fail if there is not enough keks for meme", async function () {
    const kekiToken = await loadFixture(deployTokenFixture);
    const [owner, addr1, addr2] = await ethers.getSigners();

    const initialOwnerBalance = await kekiToken.balanceOf(owner.address);

    await expect(
      kekiToken.connect(addr1).transfer(owner.address, 1)
    ).to.be.revertedWith("ERC20: transfer amount exceeds balance");

    expect(await kekiToken.balanceOf(owner.address)).to.equal(
      initialOwnerBalance
    );
  });


  it("Should fail if meme-map by address doesn't work", async function () {
    const kekiToken = await loadFixture(deployTokenFixture);
    const [owner, addr1, addr2] = await ethers.getSigners();
    const initialOwnerBalance = await kekiToken.balanceOf(owner.address);

    const expectedMemeAddres = "0x1100000000000000000000000000000000000011"
    const expectedMemeID = 0;
    const expectedMemeO = await kekiToken.newMeme(expectedMemeAddres, false);
    
    const actualMeme = await kekiToken.getMemeByAddress(expectedMemeAddres);

    expect(actualMeme.ID).to.equal(expectedMemeID);
  });


  it("Should fail if meme-map by ID doesn't work", async function () {
    const kekiToken = await loadFixture(deployTokenFixture);

    const expectedMemeAddres = "0x1100000000000000000000000000000000000011"
    const expectedMemeID = 0;

    const expectedMemeO = await kekiToken.newMeme(expectedMemeAddres, true);
    const actualMeme = await kekiToken.getMemeByID(expectedMemeID);

    expect(actualMeme.memeAddress).to.equal(expectedMemeAddres);
  });
});

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract KekiToken is ERC20 {
    constructor(uint256 initialSupply) ERC20("KekiToken", "KEK") {
        _mint(msg.sender, initialSupply);

        memes.push() = Meme({
            ID: 1,
            isLaughable: false,
            memeAddress: address(0x0),
            memeScore: bytes4(0x0)
        });
    }

    struct Meme {
        int ID;
        bool isLaughable;
        address memeAddress;
        bytes4 memeScore;
    }

    uint memeIDlast;
    Meme[] public memes;
    mapping(address => Meme) public memeAddresses;
    mapping(uint => Meme) public memeIDs;

    function newMeme(address targetAddress, bool isLaughable) public returns (uint memeID) {
        memeID = memeIDlast++;

        Meme storage c = memeIDs[memeID] = memeAddresses[targetAddress];
        c.ID = int(memeID);
        c.memeAddress = targetAddress;
        c.isLaughable = isLaughable;

        memes.push(c);
    }

    function getMemeByID(uint memeID) public view returns (Meme memory targetMeme) {
        targetMeme = memeIDs[memeID];
    }

    function getMemeByAddress(address memeAddress) public view returns (Meme memory targetMeme) {
        targetMeme = memeAddresses[memeAddress];
    }
}

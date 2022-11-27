// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract NFT is ERC721Enumerable, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private currentTokenId;

    string public baseTokenURI;

    constructor(string memory _name, string memory _symbol, string memory _tokenURI) ERC721(_name, _symbol) {
        baseTokenURI = _tokenURI;
    }

    function mint(address _to) public payable {
        currentTokenId.increment();
        uint256 newItemId = currentTokenId.current();

        _safeMint(_to, newItemId);
    }

    function _baseURI() internal view override returns (string memory) {
        return baseTokenURI;
    }

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");

        return baseTokenURI;
    }


    function walletOfOwner(address _owner) public view returns (uint256[] memory) {
        uint256 ownerTokenCount = balanceOf(_owner);
        uint256[] memory tokenIds = new uint256[](ownerTokenCount);

        for (uint256 i; i < ownerTokenCount; i++) {
            tokenIds[i] = tokenOfOwnerByIndex(_owner, i);
        }

        return tokenIds;
    }

    function withdraw() public payable onlyOwner {
        require(payable(msg.sender).send(address(this).balance));
    }
}

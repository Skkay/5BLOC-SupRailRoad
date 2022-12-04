// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract PrivilegeCard is ERC721Enumerable, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private currentTokenId;

    string public baseTokenURI;
    uint256 public cost;
    uint256 public quantity;
    uint8 public discount;

    constructor(string memory _name, string memory _symbol, string memory _tokenURI, uint256 _cost, uint _quantity, uint8 _discount) ERC721(_name, _symbol) {
        require(_discount >= 0 || _discount <= 100, 'The discount must be between 0 and 100 (inclusive)');

        baseTokenURI = _tokenURI;
        cost = _cost;
        quantity = _quantity;
        discount = _discount;
    }

    function _baseURI() internal view override returns (string memory) {
        return baseTokenURI;
    }

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");

        return baseTokenURI;
    }

    function mint(address _to) public payable {
        require(msg.value >= cost);
        require(totalSupply() <= quantity);

        currentTokenId.increment();
        uint256 newItemId = currentTokenId.current();

        _safeMint(_to, newItemId);
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

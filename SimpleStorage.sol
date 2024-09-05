// SPDX-License-Identifier: MIT
pragma solidity 0.8.0;

contract SimpleStorage {
    uint256 private data;

    event DataStored(uint256 indexed data);
    //uint256[] listOfFavoriteNumbers;
    struct Person {
        uint256 favoriteNumber;
        string name;
    }

    // Person public pat = Person({ favoriteNumber: 7, name: "Patry" });
    // Person public mariah = Person({ favoriteNumber: 15, name: "Mariah" });
    Person[] public listOfPeople;

    function store(uint256 _data) public {
        data = _data;
        emit DataStored(_data);
    }

    function retrieve() public view returns (uint256) {
        return data;
    }

    function addPerson(string memory _name, uint256 _favoriteNumber) public {
        listOfPeople.push(
            Person({ name: _name, favoriteNumber: _favoriteNumber })
        );
    }
}

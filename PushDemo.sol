// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

contract PushDemo {

    event MessageUpdated(string message);

    string public message;

    constructor() {
        message = "default message";
    }

    function setMessage(string memory _message) public {
        message = _message;
        emit MessageUpdated(_message);
    }

}
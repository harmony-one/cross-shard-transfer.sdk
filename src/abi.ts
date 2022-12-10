export const abi = [
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint64",
                "name": "toShardID",
                "type": "uint32"
            }
        ],
        "name": "crossShardTransfer",
        "outputs": [] as any,
        "stateMutability": "payable",
        "type": "function"
    }
] as any;
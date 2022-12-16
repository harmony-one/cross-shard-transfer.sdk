import Web3 from 'web3';
import { Contract } from 'web3-eth-contract';
import {IHmyCrossShardParams, SendTxCallback, WALLET_TYPE} from './interfaces';
import { abi } from './abi';

export class HmyCrossShard {
    private gasLimit = 6721900;
    private gasPrice = 10000000000;

    web3: Web3;
    contract: Contract;
    walletType: WALLET_TYPE;
    fromAddress: string;

    constructor(params: IHmyCrossShardParams) {
        this.gasLimit = params?.gasLimit || this.gasLimit;
        this.gasPrice = params?.gasPrice || this.gasPrice;

        this.walletType = params.walletType;

        if (params.walletType === WALLET_TYPE.INTERNAL) {
            this.web3 = new Web3(params.rpcUrl);

            const hmyMasterAccount = this.web3.eth.accounts.privateKeyToAccount(params.privateKey);
            this.web3.eth.accounts.wallet.add(hmyMasterAccount);
            this.web3.eth.defaultAccount = hmyMasterAccount.address;

            this.fromAddress = hmyMasterAccount.address;
        } else {
            //@ts-ignore
            this.web3 = new Web3(window.ethereum);
        }

        this.contract = new this.web3.eth.Contract(
            abi,
            '0x00000000000000000000000000000000000000F9'
        );
    }

    public transfer = async (value: string | number, toAddress: string, shardId: 0 | 1, sendTxCallback?: SendTxCallback) => {
        let fromAddress;

        if (this.walletType === WALLET_TYPE.METAMASK) {
            // @ts-ignore
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            fromAddress = accounts[0];
        } else {
            fromAddress = this.fromAddress;
        }

        const networkGasPrice = await this.web3.eth.getGasPrice();

        const gasPrice = Math.max(this.gasPrice, Number(networkGasPrice));

        const res = await this.contract.methods.crossShardTransfer(value, toAddress, shardId).send({
            value: value,
            from: fromAddress,
            gasLimit: this.gasLimit,
            gasPrice,
        }).on('transactionHash', sendTxCallback);

        return res;
    }

    getBalance = async (address?: string) => {
        let addressHex = address;

        if (!addressHex) {
            if (this.walletType === WALLET_TYPE.METAMASK) {
                // @ts-ignore
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                addressHex = accounts[0];
            } else {
                addressHex = this.fromAddress;
            }
        }

        return this.web3.eth.getBalance(addressHex);
    }
}
interface IHmyCrossShardParamsBase {
    gasLimit?: number;
    gasPrice?: number;
}

export enum WALLET_TYPE {
    METAMASK = 'metamask',
    INTERNAL = 'internal',
}

interface IHmyCrossShardParamsMetamsk extends IHmyCrossShardParamsBase {
    walletType: WALLET_TYPE.METAMASK;
}

interface IHmyCrossShardParamsInternal extends IHmyCrossShardParamsBase {
    walletType: WALLET_TYPE.INTERNAL;
    rpcUrl: string;
    privateKey: string;
}

export type IHmyCrossShardParams = IHmyCrossShardParamsMetamsk | IHmyCrossShardParamsInternal;

export type SendTxCallback = (txHash: string) => void;
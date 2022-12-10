import { BigNumber } from 'bignumber.js';

export const mulDecimals = (
    amount: string | number,
    decimals: string | number,
) => {
    if (!Number(decimals)) {
        return amount;
    }

    return new BigNumber(amount).multipliedBy(`1e${decimals}`)
};
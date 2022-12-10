const { HmyCrossShard } = require('../lib');

const hmyCrossShard_0 = new HmyCrossShard({
    walletType: 'internal',
    privateKey: '444...',
    rpcUrl: 'https://api.s0.pops.one'
});

const hmyCrossShard_1 = new HmyCrossShard({
    walletType: 'internal',
    privateKey: '444...',
    rpcUrl: 'https://api.s1.b.hmny.io'
});

const test = async () => {
    console.log('balance shard 0: ', await hmyCrossShard_0.getBalance());
    const tx_1 = await hmyCrossShard_0.transfer('0.1', '0x431E2eE66080A1d13B82F947B5...', 1);
    console.log(tx_1);

    console.log('balance shard 1: ', await hmyCrossShard_1.getBalance());
    const tx_2 = await hmyCrossShard_1.transfer('0.1', '0x431E2eE66080A1d13B82F947B5...', 0);
    console.log(tx_2);
}

test();
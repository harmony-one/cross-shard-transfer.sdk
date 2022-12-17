const { HmyCrossShard } = require('../lib');

const hmyCrossShard_0 = new HmyCrossShard({
    walletType: 'metamask'
});

const test = async () => {
    console.log('balance shard 0: ', await hmyCrossShard_0.getBalance());
    const tx_1 = await hmyCrossShard_0.transfer('0.1' * 1e18, '0x431E2eE66080A1d13B82F947B5...', 1);
    console.log(tx_1);
}

test();
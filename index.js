// var Wallet = require('ethereumjs-wallet');
// const EthWallet = Wallet.default.generate();
// console.log("address: " + EthWallet.getAddressString());
// console.log("privateKey: " + EthWallet.getPrivateKeyString());

const address = "0xd4bfd95c239dc6c7afa6ed9ec88b914e9fc54673";
const BN = require('bn.js');
const TorusStorageLayer = require("@tkey/storage-layer-torus").default;
const sss = require('shamirs-secret-sharing')
global.FormData = require('form-data');
global.fetch = require('node-fetch');

// const pk = BN("818bd9fdca4746143f834308b1d3c61a9a1abf721320fa3744a188a744633c78");
const pk = "818bd9fdca4746143f834308b1d3c61a9a1abf721320fa3744a188a744633c78"
const tkeyCore = require('@tkey/core')
// console.log('tkeyCore',tkeyCore);
const UccServiceProvider = require('./UccServiceProvider');
const serviceProvider = new UccServiceProvider({ postboxKey: pk });
const storageLayer = new TorusStorageLayer({ hostUrl: "https://metadata.tor.us", enableLogging: true });
const tkey = new tkeyCore.default({ serviceProvider, storageLayer, enableLogging: true });

tkey._setKey(pk)
tkey.initialize().then(async (result) => {
    // const res = await tkey._initializeNewKey();
    console.log('done', result);
    console.log('x', result.pubKey.x.toString('hex'));
    console.log('y', result.pubKey.y.toString('hex'));
    const _sh = [
        "db8c99704f59fae5b5f4ea59aa7771ef5cf9e1bd8ef468ea448f9ebf161f9f94",
        "f38142c85d15534a85e69033540d039827d544022d79504f3d61aec0175ac6e2"
    ]
    console.log('sss', sss.combine(_sh).toString('hex'))
    process.exit(1);
}).catch((err) => {

    process.exit(1);
});



return;

// const testKey = async () =>{
//     const enc = await tkey.encrypt('tes')
//     console.log('tkey',enc);
//     console.log('tkey',(await tkey.decrypt(enc)).toString());
// }

// tkey._initializeNewKey();
// testKey();

// const sss = require('shamirs-secret-sharing')
// const secret = Buffer.from(pk)
// const shares = sss.split(secret, { shares: 10, threshold: 4 })
// const recovered = sss.combine(shares.slice(3, 7))

// const sh = [
//     '08046ce5b0fc562fd21211c55811ba785bee1e1cccc77f8589c80848f5d915ba8fe862e0a0649662194d2734d244f2152d973d383f4ccb7c1c5396dfc15d875505483c0ab4064d28efd2305cacb631e1283e1da9a05ad21b5dcbe7cab01de8b1957a1cfa0c2cf90f146366bd33591a8d1e7fd9b771c9757f0d46cd26400f7489b88eff50819a4871cd43a8bd1a25a027c5b5',
//     '08029dd7e61c4a9b407ab6f71723453d1ea546c73f88f357e2c9492a658943dcb0bf7c38ff7876310383516541fecbdc7c2b3a46913f9c7f1a6b7070a6273195111c4654164ae3352e069c0f797c9fd4534a92ecc6c12cbaa79211faea86241b69d70f545abb3ea5f4575a6ae3df7f582a6c1ce72842f669b6fcfdea86d7f8d41d38324737b4ec30069064ce075ae6cecd12',
//     '0809d74328c5c03faccd542c202475dfb2833bd0be47073dd8770bc6f8d7ff5cfc6ac3b6c6cebb2f9485dff238f4eced49c9207685dc080dfec8738fb06be20b202b440a99ade5f71ba08b53d0fe4f9108c2a54b4a9b2adeda8d546e90948c38f779c2f4f86a3252c3da9d62b18b1203eedeeffcdfc9973e074026bf518e3dc6a6ded5e1e079883d09c34d0518dff8178eb2',
//     '0808a79aa0d715c602381084079880ca4173443141d76fde4ebdd7b1e3665ec28a5014cd3d18ecf0e2c09ca7e9aff91966efa583f0762743e19df9b59d9be01d6b4e9291ecdd6ed89194eecb07f156308c0e3815c32d17e2316bd60834b543224440b8a9c2a439faa6ba1adb6a35082ba6c5d9cf7e114b8c0bee9264ac261d3abbab92e493db6f00feaf3da577174b405f68',
// ]


// shares.forEach(element => {
//     console.log('shares', element.toString('hex'));
// });
// console.log('recovered', recovered.toString());
// console.log('recovered2', sss.combine(sh).toString());




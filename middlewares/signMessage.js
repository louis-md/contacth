// module.exports = function signMessage(req, res, next) {
//     return next();
//     var msg = 0x506c65617365207369676e2074686973206d6573736167652e205468616e6b732120436f6e7461637468207465616d2e;
//     var from = web3.eth.accounts[0];
//     if (!from) return connectMetamask();

//     console.log('CLICKED, SENDING PERSONAL SIGN REQ');
//     var params = [from, msg];
//     var eth = new Eth(web3.currentProvider);

//     eth.personal_sign(msg, from)
//     .then((signed) => {
//         console.log('Signed!  Result is: ', signed);
//         console.log('Recovering...');

//         return eth.personal_ecRecover(msg, signed);
//     })
//     .then((recovered) => {

//         if (recovered === from) {
//         console.log('Ethjs recovered the message signer!');
//         } else {
//         console.log('Ethjs failed to recover the message signer!');
//         console.dir({ recovered });
//         }
//     })
// };

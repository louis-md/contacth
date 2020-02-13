document.addEventListener('DOMContentLoaded', () => {
  console.log('script.js loaded successfully');
}, false);

// const axiosCall = axios.create({
//   baseURL: "http://localhost:3000"
// });

var connectButton = document.getElementById("connectButton");
var ethjsPersonalSignButton = document.getElementById("ethjsPersonalSignButton");

function connect() {
  console.log("Function connect() called");
  if (typeof ethereum !== "undefined") {
    ethereum.enable().catch(console.error);
  } 
}

connectButton.addEventListener("click", function() {
  connect();
  console.log("Connect button clicked")
});

ethjsPersonalSignButton.addEventListener("click", function(event) {

  event.preventDefault();
  var from = web3.eth.accounts[0];
  if (!from) return connect();
  web3.personal.sign(web3.fromUtf8("Please sign this message. Thanks! Contacth team"), web3.eth.coinbase, console.log);
  //   var provider
  // if (typeof window.ethereum !== 'undefined') {
  //   console.log("Ethereum user detected. You can now use the provider.");
  //   provider = window['ethereum'];
  //   console.log(`The provider is ${provider}`)
  // }
  // 
  // axiosCall
  // .get("/metamask", {
  //   params: {
  //     provider: provider,
  //     from: web3.eth.accounts[0],
  //     msg: 0x506c65617365207369676e2074686973206d6573736167652e205468616e6b732120436f6e7461637468207465616d2e,
  //   }
  // })
  // // .then(response => {console.log(displayData(response.data.records))})
  // .then((signed) => {
  //   console.log('Signed!  Result is: ', signed)
  //   console.log('Recovering...')
  //   axiosCall
  //   .get("/metamask", {
  //     params: {
  //       msg: web3.eth.accounts[0],
  //       signed: signed,
  //     }
  //   })
  //   .then((recovered) => {
  //     if (recovered === from) {
  //       console.log('Ethjs recovered the message signer!')
  //     } else {
  //       console.log('Ethjs failed to recover the message signer!')
  //       console.dir({ recovered })
  //     }
  //   })
  //   .catch(apiErr => console.log(apiErr));
  // })
});

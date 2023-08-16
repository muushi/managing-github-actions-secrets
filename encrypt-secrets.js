require('dotenv').config()
const sodium = require('libsodium-wrappers')

if (!process.env.SECRET_UNENCRYPTED) {
  console.log("no SECRET_UNENCRYPTED specified");
  process.exit();
}

//Check if libsodium is ready and then proceed.
sodium.ready.then(() => {
  // Convert the secret and key to a Uint8Array.
  let binkey = sodium.from_base64(process.env.REPOSITORY_PUBLICKEY, sodium.base64_variants.ORIGINAL)
  let binsec = sodium.from_string(process.env.SECRET_UNENCRYPTED)
  // Encrypt the secret using libsodium
  let encBytes = sodium.crypto_box_seal(binsec, binkey)
  // Convert the encrypted Uint8Array to Base64
  let output = sodium.to_base64(encBytes, sodium.base64_variants.ORIGINAL)
  // Print the output
  console.log(output)
});
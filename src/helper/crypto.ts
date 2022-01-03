import * as elliptic from "elliptic";
const ec = new elliptic.ec("secp256k1");

export function generatePair() {
  let pair = ec.genKeyPair();
  return {
    publicKey: pair.getPublic("hex"),
    privateKey: pair.getPrivate("hex")
  };
}

export function sign(message:string, privateKey: string) {
  try {
    let pair = ec.keyFromPrivate(privateKey, "hex");
    return pair.sign(message).toDER("hex");
  } catch (error) {
    return "invalid signature";
  }
}

export function verifySignature(message:string, signature:string, publicKey:string) {
  try {
    let pair = ec.keyFromPublic(publicKey, "hex");
    return ec.verify(message, signature, pair);
  } catch (error) {
    return false;
  }
}
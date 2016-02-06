/* global CryptoJS */
import DS from 'ember-data';

function getKey() {
    return CryptoJS.enc.Hex.parse('000102030405060708090a0b0c0d0e0f');
}

function getIv() {
    return CryptoJS.enc.Hex.parse('101112131415161718191a1b1c1d1e1f');
}

export default DS.Transform.extend({
  deserialize(serialized) {
    const key = getKey();
    const iv = getIv();
    const crypto = CryptoJS.AES.decrypt(serialized, key, { iv: iv });
    return crypto.toString(CryptoJS.enc.Utf8);
  },

  serialize(deserialized) {
    const key = getKey();
    const iv = getIv();
    const crypto = CryptoJS.AES.encrypt(deserialized, key, { iv: iv });
    return crypto.ciphertext.toString(CryptoJS.enc.Base64);
  }
});

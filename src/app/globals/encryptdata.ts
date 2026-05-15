import * as CryptoJS from 'crypto-js';
import {encrypt_key, iv_key} from "./global-variable";
// import * as forge from 'node-forge'
import {Router} from "@angular/router";

// import {cipher, hmac, pkcs5, random, util} from "node-forge";

export function EncryptData(data: any): string {
    if (data == "") {
        return ""
    }
    return CryptoJS.AES.encrypt(data, encrypt_key).toString();
}

export function encryptsUsingAES256(request: any): string {
    //CryptoJS.enc.Utf8.parse(encrypt_key);
    //let _iv = CryptoJS.enc.Utf8.parse(encrypt_key);
    // let encrypted : any = "";

    let _key = CryptoJS.enc.Utf8.parse(encrypt_key);
    let _iv = CryptoJS.enc.Utf8.parse(encrypt_key);

    let encrypted = CryptoJS.AES.encrypt(
        request, _iv, {
            keySize: 16,
            iv: _iv,
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        });
    return encrypted.toString();
}


export function Decryptdata(ciphertext: any): string {
    if (ciphertext == "") {
        return ""
    }
    try {
        let bytes = CryptoJS.AES.decrypt(ciphertext, encrypt_key);
        return bytes.toString(CryptoJS.enc.Utf8) || "";
    } catch (e) {
        console.error('Decrypt error:', e);
        return "";
    }
}

export function Encrypt_object(data: any): string {
    if (data == "") {
        return ""
    }
    return CryptoJS.AES.encrypt(data, encrypt_key, {
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
        iv: CryptoJS.enc.Utf8.parse(iv_key),
        keySize: 32
    }).toString();
}

export function Decrypt_object(cipherdata: any): any {
    if (cipherdata == "") {
        return ""
    }
    let bytes = CryptoJS.AES.decrypt(cipherdata, encrypt_key);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
}

// export function encryptUsingAES256(request: any): string {
//   //CryptoJS.enc.Utf8.parse(encrypt_key);
//   //let _iv = CryptoJS.enc.Utf8.parse(encrypt_key);
//   // let encrypted : any = "";
//
//   let _key = CryptoJS.enc.Utf8.parse(encrypt_key);
//   let _iv = CryptoJS.enc.Utf8.parse(encrypt_key);
//
//   let encrypted = CryptoJS.AES.encrypt(
//     JSON.stringify(request), _iv, {
//       keySize: 16,
//       iv: _iv,
//       mode: CryptoJS.mode.ECB,
//       padding: CryptoJS.pad.Pkcs7
//     });
//   return encrypted.toString();
// }


// new by vishal
export function encryptUsingAES256(request: any, router?: Router): string {

    const secretkey = sessionStorage.getItem("securitykey");
    if (!secretkey) {
        throw new Error("Secret key not found");
    }

    let _iv = CryptoJS.enc.Utf8.parse(secretkey);

    let encrypted = CryptoJS.AES.encrypt(
        JSON.stringify(request), _iv, {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        });
    return encrypted.toString();
}

// export function encryptUsingAES256(data: any) {
//     return data;
//
//     const publicKeyPem = `
// -----BEGIN PUBLIC KEY-----
//   MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA2KI5gtGFPvNNVDVXRuUD
// SaJLnwIgiVfuZggI8fPIum2cEBpdlu4tuDYoSRUxP2U6sulzpo3q1blkmB3QN2Lm
// cZ/8vkJqrL2HWVIc76UqZX4PXx2LDgfRN+KCjPq2ihj3uBBOIWSsgt9xTDnCthbS
// yWvvILklLIS0LwwL4IkSr/gd4PVgON+GOiAlbeH3LYs79HPV7kp2X0sjAmiLTxal
// Q9np54L6248OlYr2Rbh1k3RbSHTENkdrzqEDA+UpMs16sFykpKGhiLQPZuA9TZet
// yRnZRnT5ffbbYUQczYb1a6FAMT1rsC5Q7HyLsZ/Jkz7OZnsTTlHtu2YNd4nl+R13
// TwIDAQAB
// -----END PUBLIC KEY-----
// `;
//
//
//     // forge.pki.
//     const publicKey = forge.pki.publicKeyFromPem(publicKeyPem);
//
//     let input = JSON.stringify(data);
//     const byteLength = new TextEncoder().encode(input).length;
//
//     console.log("Payload size (bytes):", byteLength);
//
//     // Encrypt using RSA-OAEP + SHA256
//     const encrypted = publicKey.encrypt(input, 'RSA-OAEP', {
//         md: forge.md.sha256.create(),
//         mgf1: {
//             md: forge.md.sha256.create()
//         }
//     });
//
//
//     return forge.util.encode64(encrypted);
//
// }

export function decryptUsingAES256(data: any): string {
    //let _key = CryptoJS.enc.Utf8.parse(encrypt_key);
    // let _iv = CryptoJS.enc.Utf8.parse(encrypt_key);

    let decrypted = CryptoJS.AES.decrypt(
        data, encrypt_key, {
            //keySize: 16,
            //iv: _iv,
            mode: CryptoJS.mode.ECB,
        }).toString(CryptoJS.enc.Utf8);

    return decrypted
}


// export function GCM_encryptData(plainText: string): string {
//
//   //let associatedData = "0f3f056e5a7a4a4f3a82a1034b283c6e";
//   let secretKey = "f0ae60f1adcd4f28e89189689cbe3afe";
//   let iv = random.getBytesSync(12);
//
//   let hmacSha1 = hmac.create();
//   hmacSha1.start("sha1", secretKey);
//   hmacSha1.update(plainText);
//
//   let salt = random.getBytesSync(16);
//   let derivedKey = pkcs5.pbkdf2(secretKey, salt, 65536, 16);
//
//   const cipherGCM = cipher.createCipher("AES-GCM", derivedKey);
//   cipherGCM.start({
//     iv: iv, // should be a 12-byte binary-encoded string or byte buffer
//     //additionalData: associatedData, // optional
//     tagLength: 128 // optional, defaults to 128 bits
//   });
//   let myrandom = random.getBytesSync(16)
//   cipherGCM.update(util.createBuffer(myrandom));
//   cipherGCM.finish();
//
//   return cipherGCM.output.data;
// }

// export function GCM_decryptData(encryptedText: string): string {
//   let decodedData = util.decode64(encryptedText);
//   //let associatedData = "0f3f056e5a7a4a4f3a82a1034b283c6e";
//   let secretKey = "f0ae60f1adcd4f28e89189689cbe3afe";
//
//   let iv = random.getBytesSync(12);
//
//   let hmacSha1 = hmac.create();
//   hmacSha1.start("sha1", secretKey);
//   hmacSha1.update(decodedData);

//
//   let salt = random.getBytesSync(16);
//   let derivedKey = pkcs5.pbkdf2(secretKey, salt, 65536, 16);

//
//   let decipher = cipher.createDecipher("AES-GCM", derivedKey);
//   decipher.start({
//     iv: iv,
//     //additionalData: associatedData, // optional
//     tagLength: 128, // optional, defaults to 128 bits
//     tag: this.authenticatedTag // authentication tag from encryption
//   });
//   let myrandom = random.getBytesSync(16)
//   decipher.update(util.createBuffer(myrandom));
//   decipher.finish();
//
//   //let pass = decipher.finish();
//
//   //if(pass){
//   //}
//
//   return decipher.output.data
// }

export function encrypt(txt: string): string {
    return CryptoJS.AES.encrypt(txt, encrypt_key).toString();
}

export function decrypt(txtToDecrypt: string) {
    return CryptoJS.AES.decrypt(txtToDecrypt, encrypt_key).toString(CryptoJS.enc.Utf8);
}

export function generate16DigitNumber(): string {
    let result = '';
    for (let i = 0; i < 16; i++) {
        result += Math.floor(Math.random() * 10);
    }
    return result;
}


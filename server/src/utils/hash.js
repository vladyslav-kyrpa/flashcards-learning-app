import argon2 from "argon2";

export async function getHash(value) {
    return await argon2.hash(value);
}

export async function verifyHash(hash, value) {
    return await argon2.verify(hash, value);
}

export default { getHash, verifyHash };
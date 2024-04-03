import crypto from "crypto";

const e = Math.pow(2, 52);
const salt = "0000000000000000000fa3b65e43e4240d71762a5bf397d5304b2596d116859c";


export const get_result = function(game_hash) {
    const hmac = crypto.createHmac('sha256', game_hash);
    hmac.update(salt);
    const h = hmac.digest('hex');
    const modValue = BigInt(`0x${h}`) % 33n;
    if (modValue === 0n) {
        return 1;
    }
    const truncatedH = parseInt(h.substring(0, 13), 16);
    return (((100 * e - truncatedH) / (e - truncatedH)) / 100).toFixed(2);
}
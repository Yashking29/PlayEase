import crypto from 'crypto';

export const generateRandomHash =  function () {
    // const randomData = Math.random().toString(); // Generate random data
    // const hash = crypto.createHash('sha256'); // Create a hash object using SHA-256 algorithm
    // hash.update(randomData); // Update the hash object with the random data
    // return hash.digest('hex'); // Generate the hash in hexadecimal format
    const randomValue = Math.random().toString(36).substring(2);
    const timestamp = Date.now();
    return `${randomValue}-${timestamp}`;
}
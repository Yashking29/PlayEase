// gameLogic.js
const startGame = (callback) => {
    let multiplier = 1.0;
    const targetMultiplier = 3.0;
    const incrementInterval = 100; // Increment interval in milliseconds
    const incrementAmount = 0.1; // Increment amount

    const intervalId = setInterval(() => {
        multiplier += incrementAmount;
        callback(multiplier.toFixed(2));
        if (multiplier >= targetMultiplier) {
            stopGame(intervalId);
        }
    }, incrementInterval);

    return intervalId;
};

const stopGame = (intervalId) => {
    clearInterval(intervalId);
};

export { startGame, stopGame };

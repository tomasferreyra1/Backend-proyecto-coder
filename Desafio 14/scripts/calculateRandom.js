process.on('message', cant => {
    console.log(`We arrived to random calculate ${cant}`);
    const numbers = {};
    for(let i = 0;i < cant; i++) {
        const randomNum = Math.floor(Math.random()*1000);
        if (!numbers[randomNum]) {
            numbers[randomNum] = 0;
        }
        numbers[randomNum]++;
    }
    console.log(numbers);
    process.send(numbers);
});

process.send('ready');


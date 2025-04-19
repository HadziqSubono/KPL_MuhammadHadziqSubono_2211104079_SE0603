const readline = require('readline');
const BankTransferConfig = require('./bankTransferConfig');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const config = new BankTransferConfig().config;

function ask(question) {
    return new Promise(resolve => rl.question(question, resolve));
}

async function main() {
    const lang = config.lang;
    const threshold = config.transfer.threshold;
    const lowFee = config.transfer.low_fee;
    const highFee = config.transfer.high_fee;
    const methods = config.methods;
    const confirmationText = config.confirmation;

    // 1. Input nominal uang
    const moneyInput = await ask(
        lang === 'en' 
            ? 'Please insert the amount of money to transfer: ' 
            : 'Masukkan jumlah uang yang akan di-transfer: '
    );

    const amount = parseInt(moneyInput);
    const fee = amount <= threshold ? lowFee : highFee;
    const total = amount + fee;

    // 2. Tampilkan biaya transfer
    if (lang === 'en') {
        console.log(`Transfer fee = ${fee}`);
        console.log(`Total amount = ${total}`);
    } else {
        console.log(`Biaya transfer = ${fee}`);
        console.log(`Total biaya = ${total}`);
    }

    // 3. Pilih metode transfer
    console.log(lang === 'en' ? 'Select transfer method:' : 'Pilih metode transfer:');
    methods.forEach((method, index) => {
        console.log(`${index + 1}. ${method}`);
    });

    await ask(lang === 'en' ? 'Your choice (number): ' : 'Pilih nomor metode: ');

    // 4. Konfirmasi transaksi
    const confirmInput = await ask(
        lang === 'en' 
            ? `Please type "${confirmationText.en}" to confirm the transaction: `
            : `Ketik "${confirmationText.id}" untuk mengkonfirmasi transaksi: `
    );

    const validConfirm = lang === 'en' ? confirmationText.en : confirmationText.id;

    if (confirmInput === validConfirm) {
        console.log(lang === 'en' ? 'The transfer is completed' : 'Proses transfer berhasil');
    } else {
        console.log(lang === 'en' ? 'Transfer is cancelled' : 'Transfer dibatalkan');
    }

    rl.close();
}

main();
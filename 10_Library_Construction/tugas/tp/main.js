const { AkarPersamaanKuadrat, HasilKuadrat } = require('./aljabarLibraries');

// Contoh penggunaan
const akar = AkarPersamaanKuadrat([1, -3, -10]); // x² - 3x - 10 = 0
console.log('Akar persamaan kuadrat:', akar);    // Output: [5, -2]

const kuadrat = HasilKuadrat([2, -3]);           // (2x - 3)²
console.log('Hasil kuadrat:', kuadrat);          // Output: [4, -12, 9]

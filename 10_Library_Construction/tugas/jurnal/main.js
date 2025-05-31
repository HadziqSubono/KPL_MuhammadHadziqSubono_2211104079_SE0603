// Impor library
const { FPB, KPK, Turunan, Integral } = require('./matematikaLibraries');

// Contoh penggunaan fungsi-fungsi
console.log('FPB(60, 45):', FPB(60, 45)); // Output: 15
console.log('KPK(12, 8):', KPK(12, 8));   // Output: 24

const fungsi = [1, 4, -12, 9];
console.log('Turunan([1, 4, -12, 9]):', Turunan(fungsi)); 
// Output: "3x^2 + 8x - 12"

const fungsi2 = [4, 6, -12, 9];
console.log('Integral([4, 6, -12, 9]):', Integral(fungsi2)); 
// Output: "1.00x^4 + 2.00x^3 - 6.00x^2 + 9.00x + C"

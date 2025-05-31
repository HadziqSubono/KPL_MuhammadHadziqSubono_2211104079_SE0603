// Library Matematika

function FPB(a, b) {
    while (b !== 0) {
        [a, b] = [b, a % b];
    }
    return Math.abs(a);
}

function KPK(a, b) {
    return Math.abs(a * b) / FPB(a, b);
}

function Turunan(persamaan) {
    const turunan = [];
    const n = persamaan.length;
    for (let i = 0; i < n - 1; i++) {
        const coef = persamaan[i] * (n - i - 1);
        if (coef === 0) continue;
        const pangkat = n - i - 2;
        const str = pangkat === 0 ? `${coef}` :
                    pangkat === 1 ? `${coef}x` : `${coef}x^${pangkat}`;
        turunan.push(str);
    }
    return turunan.join(' + ').replace(/\+\s-\s/g, '- ');
}

function Integral(persamaan) {
    const hasil = [];
    const n = persamaan.length;
    for (let i = 0; i < n; i++) {
        const pangkat = n - i;
        const coef = (persamaan[i] / pangkat).toFixed(2);
        const str = pangkat === 1 ? `${coef}x` : `${coef}x^${pangkat}`;
        hasil.push(str);
    }
    hasil.push('C');
    return hasil.join(' + ').replace(/\+\s-\s/g, '- ');
}

// Ekspor fungsi-fungsi
module.exports = { FPB, KPK, Turunan, Integral };

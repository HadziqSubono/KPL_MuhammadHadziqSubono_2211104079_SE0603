function AkarPersamaanKuadrat([a, b, c]) {
    const diskriminan = b * b - 4 * a * c;
    if (diskriminan < 0) return ["Akar imajiner"];
    const akar1 = (-b + Math.sqrt(diskriminan)) / (2 * a);
    const akar2 = (-b - Math.sqrt(diskriminan)) / (2 * a);
    return [akar1, akar2];
}

function HasilKuadrat([a, b]) {
    // (ax + b)^2 = a^2x^2 + 2abx + b^2
    const a2 = a * a;
    const ab2 = 2 * a * b;
    const b2 = b * b;
    return [a2, ab2, b2];
}

module.exports = { AkarPersamaanKuadrat, HasilKuadrat };

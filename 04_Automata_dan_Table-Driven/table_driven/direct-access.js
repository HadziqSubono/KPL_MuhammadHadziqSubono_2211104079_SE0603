function getDaysPerMonth(month) {
    const daysPerMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    // Check if the month is valid (1-12)  
    if (month < 1 || month > 12) {
        throw new Error('Invalid month. Please enter a month between 1 and 12.');
    }

    //dikurangi 1 karena index mulai dari 0, sedangkan bulan januari masuknya ke bulan 1.
    return daysPerMonth[month - 1]; 
}

console.log(getDaysPerMonth(2)); // Output: 28  
console.log(getDaysPerMonth(4)); // Output: 30  
console.log(getDaysPerMonth(12)); // Output: 31  
// console.log(getDaysPerMonth(13)); // Throws an error
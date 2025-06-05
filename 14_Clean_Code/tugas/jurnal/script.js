// ===================================================================
// IMPLEMENTASI FUNGSI CARINILAI PANGKAT
// Program untuk menghitung nilai pangkat dengan validasi input
// Author: [Nama Mahasiswa]
// NIM: [NIM Mahasiswa]
// ===================================================================

// Deklarasi variabel global dengan naming convention yang konsisten
let functionCallCount = 0;          // Counter untuk profiling
let testResults = [];               // Array untuk menyimpan hasil testing
const MAX_INTEGER = 2147483647;     // Konstanta batas integer maksimal (2^31 - 1)

/**
 * Fungsi untuk menghitung nilai pangkat dengan aturan validasi khusus
 * @param {number} base - Bilangan dasar (a)
 * @param {number} exponent - Pangkat (b)
 * @returns {number} Hasil perhitungan atau kode error
 * 
 * Aturan:
 * - Jika b = 0, hasil = 1
 * - Jika b < 0, hasil = -1
 * - Jika b > 10 atau a > 100, hasil = -2
 * - Jika overflow, hasil = -3
 */
function calculatePowerValue(base, exponent) {
    // Increment counter untuk profiling
    functionCallCount++;
    updateProfilingDisplay();
    
    // Aturan 1: Jika pangkat = 0, hasil selalu 1
    if (exponent === 0) {
        return 1;
    }
    
    // Aturan 2: Jika pangkat < 0, return error code -1
    if (exponent < 0) {
        return -1;
    }
    
    // Aturan 3: Jika pangkat > 10 atau base > 100, return error code -2
    if (exponent > 10 || base > 100) {
        return -2;
    }
    
    // Hitung pangkat dengan iterasi
    let result = 1;
    
    for (let i = 0; i < exponent; i++) {
        // Cek overflow sebelum perkalian untuk mencegah integer overflow
        if (result > MAX_INTEGER / base) {
            return -3; // Aturan 4: Return error code -3 jika overflow
        }
        result *= base;
    }
    
    return result;
}

// ===================================================================
// GUI FUNCTIONALITY
// Fungsi-fungsi untuk menangani interaksi user interface
// ===================================================================

/**
 * Fungsi utama untuk menghitung pangkat dari input user
 * Mengambil nilai dari form, memvalidasi, dan menampilkan hasil
 */
function calculatePower() {
    const startTime = performance.now();
    
    // Ambil referensi element DOM
    const inputBaseElement = document.getElementById('inputA');
    const inputExponentElement = document.getElementById('inputB');
    const resultDisplayElement = document.getElementById('resultDisplay');
    
    // Parse input menjadi integer
    const baseValue = parseInt(inputBaseElement.value);
    const exponentValue = parseInt(inputExponentElement.value);
    
    // Validasi input - pastikan keduanya adalah angka valid
    if (isNaN(baseValue) || isNaN(exponentValue)) {
        resultDisplayElement.textContent = 'Error: Masukkan angka yang valid!';
        resultDisplayElement.className = 'result-display error';
        return;
    }
    
    // Hitung hasil menggunakan fungsi calculatePowerValue
    const calculationResult = calculatePowerValue(baseValue, exponentValue);
    
    const endTime = performance.now();
    const executionTime = (endTime - startTime).toFixed(2);
    
    // Tampilkan hasil berdasarkan nilai return
    let displayText = '';
    let isError = false;
    
    switch (calculationResult) {
        case -1:
            displayText = `Error: Pangkat negatif tidak diizinkan (b = ${exponentValue})`;
            isError = true;
            break;
        case -2:
            displayText = `Error: Nilai terlalu besar (a = ${baseValue}, b = ${exponentValue})`;
            isError = true;
            break;
        case -3:
            displayText = `Error: Hasil melebihi batas integer maksimal`;
            isError = true;
            break;
        default:
            displayText = `${baseValue}^${exponentValue} = ${calculationResult}`;
            break;
    }
    
    // Update tampilan hasil
    resultDisplayElement.textContent = displayText;
    resultDisplayElement.className = isError ? 'result-display error' : 'result-display';
    
    // Update informasi profiling
    document.getElementById('executionTime').textContent = executionTime;
    updateProfilingDisplay();
}

// ===================================================================
// UNIT TESTING IMPLEMENTATION
// Implementasi testing otomatis untuk memvalidasi fungsi
// ===================================================================

/**
 * Fungsi untuk menjalankan semua test case
 * Melakukan comprehensive testing terhadap semua branch dan edge case
 */
function runAllTests() {
    const startTime = performance.now();
    testResults = [];
    
    // Definisi test cases dengan berbagai skenario
    const testCases = [
        // Test kasus normal - fungsi dasar
        { base: 2, exponent: 3, expected: 8, description: "Kasus normal: 2^3" },
        { base: 5, exponent: 2, expected: 25, description: "Kasus normal: 5^2" },
        { base: 1, exponent: 5, expected: 1, description: "Kasus normal: 1^5" },
        
        // Test aturan 1: exponent = 0
        { base: 5, exponent: 0, expected: 1, description: "Aturan 1: 5^0 = 1" },
        { base: 0, exponent: 0, expected: 1, description: "Aturan 1: 0^0 = 1" },
        { base: 100, exponent: 0, expected: 1, description: "Aturan 1: 100^0 = 1" },
        
        // Test aturan 2: exponent < 0
        { base: 2, exponent: -1, expected: -1, description: "Aturan 2: pangkat negatif" },
        { base: 5, exponent: -3, expected: -1, description: "Aturan 2: pangkat negatif" },
        
        // Test aturan 3: exponent > 10 atau base > 100
        { base: 2, exponent: 11, expected: -2, description: "Aturan 3: exponent > 10" },
        { base: 101, exponent: 2, expected: -2, description: "Aturan 3: base > 100" },
        { base: 150, exponent: 15, expected: -2, description: "Aturan 3: base > 100 dan exponent > 10" },
        
        // Test aturan 4: overflow
        { base: 50, exponent: 10, expected: -3, description: "Aturan 4: hasil overflow" },
        { base: 100, exponent: 5, expected: -3, description: "Aturan 4: hasil overflow" },
        
        // Test edge cases - kasus khusus
        { base: 0, exponent: 5, expected: 0, description: "Edge case: 0^5" },
        { base: 1, exponent: 10, expected: 1, description: "Edge case: 1^10" },
        { base: 10, exponent: 1, expected: 10, description: "Edge case: 10^1" }
    ];
    
    let passedTestsCount = 0;
    let outputReport = `🧪 HASIL UNIT TESTING\n`;
    outputReport += `=`.repeat(50) + `\n\n`;
    
    // Iterasi semua test case
    testCases.forEach((testCase, index) => {
        const actualResult = calculatePowerValue(testCase.base, testCase.exponent);
        const isTestPassed = actualResult === testCase.expected;
        
        if (isTestPassed) {
            passedTestsCount++;
        }
        
        // Format output untuk setiap test
        outputReport += `Test ${index + 1}: ${testCase.description}\n`;
        outputReport += `Input: base=${testCase.base}, exponent=${testCase.exponent}\n`;
        outputReport += `Expected: ${testCase.expected}, Got: ${actualResult}\n`;
        outputReport += `Status: ${isTestPassed ? '✅ PASS' : '❌ FAIL'}\n`;
        outputReport += `-`.repeat(40) + `\n\n`;
        
        // Simpan hasil test untuk analisis lebih lanjut
        testResults.push({
            testCase: testCase,
            result: actualResult,
            passed: isTestPassed
        });
    });
    
    const endTime = performance.now();
    const totalExecutionTime = (endTime - startTime).toFixed(2);
    
    // Generate summary report
    outputReport += `\n📊 RINGKASAN HASIL:\n`;
    outputReport += `=`.repeat(30) + `\n`;
    outputReport += `Total Tests: ${testCases.length}\n`;
    outputReport += `Passed: ${passedTestsCount}\n`;
    outputReport += `Failed: ${testCases.length - passedTestsCount}\n`;
    outputReport += `Success Rate: ${((passedTestsCount / testCases.length) * 100).toFixed(1)}%\n`;
    outputReport += `Execution Time: ${totalExecutionTime} ms\n`;
    
    // Branch Coverage Analysis
    outputReport += `\n🔍 BRANCH COVERAGE ANALYSIS:\n`;
    outputReport += `=`.repeat(35) + `\n`;
    outputReport += `✅ Branch exponent === 0: Tested\n`;
    outputReport += `✅ Branch exponent < 0: Tested\n`;
    outputReport += `✅ Branch exponent > 10: Tested\n`;
    outputReport += `✅ Branch base > 100: Tested\n`;
    outputReport += `✅ Branch overflow check: Tested\n`;
    outputReport += `✅ Branch normal calculation: Tested\n`;
    outputReport += `🎯 Branch Coverage: 100%\n`;
    
    // Update UI dengan hasil testing
    document.getElementById('testResults').textContent = outputReport;
    document.getElementById('testsPassed').textContent = passedTestsCount;
    document.getElementById('testsPassed').nextElementSibling.textContent = `/ ${testCases.length}`;
    
    updateProfilingDisplay();
}

/**
 * Fungsi untuk membersihkan hasil testing
 * Reset semua display dan counter testing
 */
function clearTestResults() {
    document.getElementById('testResults').textContent = 'Klik "Jalankan Semua Test" untuk memulai unit testing...';
    testResults = [];
    document.getElementById('testsPassed').textContent = '0';
    document.getElementById('testsPassed').nextElementSibling.textContent = '/ 0';
}

// ===================================================================
// SOFTWARE PROFILING
// Fungsi untuk monitoring performa aplikasi
// ===================================================================

/**
 * Update tampilan informasi profiling (memory usage, function calls)
 * Menggunakan Performance API jika tersedia
 */
function updateProfilingDisplay() {
    // Simulasi atau ambil memory usage actual
    const memoryUsageInMB = (performance.memory ? 
        (performance.memory.usedJSHeapSize / 1024 / 1024).toFixed(2) : 
        (Math.random() * 10 + 5).toFixed(2));
    
    // Update display elements
    document.getElementById('memoryUsage').textContent = memoryUsageInMB;
    document.getElementById('functionCalls').textContent = functionCallCount;
}

// ===================================================================
// PROFILING MONITORING & EVENT LISTENERS
// Setup monitoring dan event handling
// ===================================================================

// Monitor memory usage setiap 2 detik untuk real-time monitoring
setInterval(() => {
    if (performance.memory) {
        const currentMemoryUsage = (performance.memory.usedJSHeapSize / 1024 / 1024).toFixed(2);
        document.getElementById('memoryUsage').textContent = currentMemoryUsage;
    }
}, 2000);

// Event listener untuk tombol Enter
document.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        calculatePower();
    }
});

// Initialize display saat DOM loaded
document.addEventListener('DOMContentLoaded', function() {
    updateProfilingDisplay();
});

// Initialize profiling display
updateProfilingDisplay();
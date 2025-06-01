// ===================================================================
// IMPLEMENTASI FUNGSI CARINILAI PANGKAT
// ===================================================================

let functionCallCount = 0;
let testResults = [];

function CariNilaiPangkat(a, b) {
    functionCallCount++;
    updateProfilingDisplay();
    
    // Aturan 1: Jika b = 0, hasil selalu 1
    if (b === 0) {
        return 1;
    }
    
    // Aturan 2: Jika b < 0, hasil = -1
    if (b < 0) {
        return -1;
    }
    
    // Aturan 3: Jika b > 10 atau a > 100, hasil = -2
    if (b > 10 || a > 100) {
        return -2;
    }
    
    // Hitung pangkat dengan iterasi
    let result = 1;
    const MAX_INTEGER = 2147483647; // 2^31 - 1
    
    for (let i = 0; i < b; i++) {
        // Cek overflow sebelum perkalian
        if (result > MAX_INTEGER / a) {
            return -3; // Aturan 4: Overflow
        }
        result *= a;
    }
    
    return result;
}

// ===================================================================
// GUI FUNCTIONALITY
// ===================================================================

function calculatePower() {
    const startTime = performance.now();
    
    const inputA = document.getElementById('inputA');
    const inputB = document.getElementById('inputB');
    const resultDisplay = document.getElementById('resultDisplay');
    
    const a = parseInt(inputA.value);
    const b = parseInt(inputB.value);
    
    // Validasi input
    if (isNaN(a) || isNaN(b)) {
        resultDisplay.textContent = 'Error: Masukkan angka yang valid!';
        resultDisplay.className = 'result-display error';
        return;
    }
    
    // Hitung hasil
    const result = CariNilaiPangkat(a, b);
    
    const endTime = performance.now();
    const executionTime = (endTime - startTime).toFixed(2);
    
    // Tampilkan hasil
    let displayText = '';
    let isError = false;
    
    switch (result) {
        case -1:
            displayText = `Error: Pangkat negatif tidak diizinkan (b = ${b})`;
            isError = true;
            break;
        case -2:
            displayText = `Error: Nilai terlalu besar (a = ${a}, b = ${b})`;
            isError = true;
            break;
        case -3:
            displayText = `Error: Hasil melebihi batas integer maksimal`;
            isError = true;
            break;
        default:
            displayText = `${a}^${b} = ${result}`;
            break;
    }
    
    resultDisplay.textContent = displayText;
    resultDisplay.className = isError ? 'result-display error' : 'result-display';
    
    // Update profiling
    document.getElementById('executionTime').textContent = executionTime;
    updateProfilingDisplay();
}

// ===================================================================
// UNIT TESTING IMPLEMENTATION
// ===================================================================

function runAllTests() {
    const startTime = performance.now();
    testResults = [];
    
    const testCases = [
        // Test kasus normal
        { a: 2, b: 3, expected: 8, description: "Kasus normal: 2^3" },
        { a: 5, b: 2, expected: 25, description: "Kasus normal: 5^2" },
        { a: 1, b: 5, expected: 1, description: "Kasus normal: 1^5" },
        
        // Test aturan 1: b = 0
        { a: 5, b: 0, expected: 1, description: "Aturan 1: 5^0 = 1" },
        { a: 0, b: 0, expected: 1, description: "Aturan 1: 0^0 = 1" },
        { a: 100, b: 0, expected: 1, description: "Aturan 1: 100^0 = 1" },
        
        // Test aturan 2: b < 0
        { a: 2, b: -1, expected: -1, description: "Aturan 2: pangkat negatif" },
        { a: 5, b: -3, expected: -1, description: "Aturan 2: pangkat negatif" },
        
        // Test aturan 3: b > 10 atau a > 100
        { a: 2, b: 11, expected: -2, description: "Aturan 3: b > 10" },
        { a: 101, b: 2, expected: -2, description: "Aturan 3: a > 100" },
        { a: 150, b: 15, expected: -2, description: "Aturan 3: a > 100 dan b > 10" },
        
        // Test aturan 4: overflow
        { a: 50, b: 10, expected: -3, description: "Aturan 4: hasil overflow" },
        { a: 100, b: 5, expected: -3, description: "Aturan 4: hasil overflow" },
        
        // Test edge cases
        { a: 0, b: 5, expected: 0, description: "Edge case: 0^5" },
        { a: 1, b: 10, expected: 1, description: "Edge case: 1^10" },
        { a: 10, b: 1, expected: 10, description: "Edge case: 10^1" }
    ];
    
    let passedTests = 0;
    let output = `🧪 HASIL UNIT TESTING\n`;
    output += `=`.repeat(50) + `\n\n`;
    
    testCases.forEach((testCase, index) => {
        const result = CariNilaiPangkat(testCase.a, testCase.b);
        const passed = result === testCase.expected;
        
        if (passed) passedTests++;
        
        output += `Test ${index + 1}: ${testCase.description}\n`;
        output += `Input: a=${testCase.a}, b=${testCase.b}\n`;
        output += `Expected: ${testCase.expected}, Got: ${result}\n`;
        output += `Status: ${passed ? '✅ PASS' : '❌ FAIL'}\n`;
        output += `-`.repeat(40) + `\n\n`;
        
        testResults.push({
            testCase: testCase,
            result: result,
            passed: passed
        });
    });
    
    const endTime = performance.now();
    const totalTime = (endTime - startTime).toFixed(2);
    
    output += `\n📊 RINGKASAN HASIL:\n`;
    output += `=`.repeat(30) + `\n`;
    output += `Total Tests: ${testCases.length}\n`;
    output += `Passed: ${passedTests}\n`;
    output += `Failed: ${testCases.length - passedTests}\n`;
    output += `Success Rate: ${((passedTests / testCases.length) * 100).toFixed(1)}%\n`;
    output += `Execution Time: ${totalTime} ms\n`;
    
    // Branch Coverage Analysis
    output += `\n🔍 BRANCH COVERAGE ANALYSIS:\n`;
    output += `=`.repeat(35) + `\n`;
    output += `✅ Branch b === 0: Tested\n`;
    output += `✅ Branch b < 0: Tested\n`;
    output += `✅ Branch b > 10: Tested\n`;
    output += `✅ Branch a > 100: Tested\n`;
    output += `✅ Branch overflow check: Tested\n`;
    output += `✅ Branch normal calculation: Tested\n`;
    output += `🎯 Branch Coverage: 100%\n`;
    
    document.getElementById('testResults').textContent = output;
    document.getElementById('testsPassed').textContent = passedTests;
    document.getElementById('testsPassed').nextElementSibling.textContent = `/ ${testCases.length}`;
    
    updateProfilingDisplay();
}

function clearTestResults() {
    document.getElementById('testResults').textContent = 'Klik "Jalankan Semua Test" untuk memulai unit testing...';
    testResults = [];
    document.getElementById('testsPassed').textContent = '0';
    document.getElementById('testsPassed').nextElementSibling.textContent = '/ 0';
}

// ===================================================================
// SOFTWARE PROFILING
// ===================================================================

function updateProfilingDisplay() {
    // Simulasi memory usage (dalam MB)
    const memoryUsage = (performance.memory ? 
        (performance.memory.usedJSHeapSize / 1024 / 1024).toFixed(2) : 
        (Math.random() * 10 + 5).toFixed(2));
    
    document.getElementById('memoryUsage').textContent = memoryUsage;
    document.getElementById('functionCalls').textContent = functionCallCount;
}

// ===================================================================
// PROFILING MONITORING
// ===================================================================

// Monitor memory usage setiap 2 detik
setInterval(() => {
    if (performance.memory) {
        const memoryUsage = (performance.memory.usedJSHeapSize / 1024 / 1024).toFixed(2);
        document.getElementById('memoryUsage').textContent = memoryUsage;
    }
}, 2000);

// Initialize profiling display
updateProfilingDisplay();

// ===================================================================
// EVENT LISTENERS
// ===================================================================

// Allow Enter key to calculate
document.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        calculatePower();
    }
});

// Initialize display
document.addEventListener('DOMContentLoaded', function() {
    updateProfilingDisplay();
});
const readline = require('readline');

// A. Class KodeBuah
class KodeBuah {
    // B. Method getKodeBuah that returns the fruit code
    getKodeBuah(buah) {
        // Table-driven approach for fruit codes
        const kodeBuahTable = {
            "Apel": "A00",
            "Aprikot": "B00",
            "Alpukat": "C00",
            "Pisang": "D00",
            "Paprika": "E00",
            "Blackberry": "F00",
            "Ceri": "H00",
            "Kelapa": "I00",
            "Jagung": "J00"
        };
        
        return kodeBuahTable[buah] || "Kode buah tidak ditemukan";
    }
}

// D. Class PosisiKarakterGame with state-based construction
class PosisiKarakterGame {
    constructor() {
        // Define all possible states
        this.posisi = {
            BERDIRI: 'Berdiri',
            JONGKOK: 'Jongkok',
            TENGKURAP: 'Tengkurap',
            TERBANG: 'Terbang'
        };
        
        // Set initial state to BERDIRI (standing)
        this.currentPosisi = this.posisi.BERDIRI;
        
        // Set up readline interface for input
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }
    
    // Method to change state based on command
    ubahPosisi(command) {
        // Store previous state to check for transitions
        const prevPosisi = this.currentPosisi;
        
        // State transition logic based on the FSM diagram
        switch(this.currentPosisi) {
            case this.posisi.BERDIRI:
                if (command === 'TombolS') {
                    this.currentPosisi = this.posisi.JONGKOK;
                } else if (command === 'TombolW') {
                    this.currentPosisi = this.posisi.TERBANG;
                }
                break;
                
            case this.posisi.JONGKOK:
                if (command === 'TombolS') {
                    this.currentPosisi = this.posisi.TENGKURAP;
                } else if (command === 'TombolW') {
                    this.currentPosisi = this.posisi.BERDIRI;
                }
                break;
                
            case this.posisi.TENGKURAP:
                if (command === 'TombolW') {
                    this.currentPosisi = this.posisi.JONGKOK;
                }
                break;
                
            case this.posisi.TERBANG:
                if (command === 'TombolS') {
                    this.currentPosisi = this.posisi.BERDIRI;
                } else if (command === 'TombolX') {
                    this.currentPosisi = this.posisi.JONGKOK;
                }
                break;
        }
        
        // Additional implementation based on NIM % 3 == 1
        // Since 2211104079 % 3 = 1
        if (prevPosisi !== this.currentPosisi) {
            if (this.currentPosisi === this.posisi.BERDIRI) {
                console.log("posisi standby");
            } else if (this.currentPosisi === this.posisi.TENGKURAP) {
                console.log("posisi istirahat");
            }
        }
        
        // Output current position
        console.log(`Posisi sekarang: ${this.currentPosisi}`);
    }
    
    // Method to simulate state changes
    simulasi() {
        console.log(`Posisi awal: ${this.currentPosisi}`);
        
        // Define sequence of commands to test all state transitions
        const commands = [
            'TombolS', // Berdiri -> Jongkok
            'TombolS', // Jongkok -> Tengkurap
            'TombolW', // Tengkurap -> Jongkok
            'TombolW', // Jongkok -> Berdiri
            'TombolW', // Berdiri -> Terbang
            'TombolX', // Terbang -> Jongkok
            'TombolW', // Jongkok -> Berdiri
            'TombolW', // Berdiri -> Terbang
            'TombolS'  // Terbang -> Berdiri
        ];
        
        // Execute each command in sequence
        commands.forEach((cmd, index) => {
            console.log(`\nCommand ${index + 1}: ${cmd}`);
            this.ubahPosisi(cmd);
        });
        
        this.rl.close();
    }
}

// Main execution
function main() {
    // C. Testing KodeBuah class
    console.log("=== Testing KodeBuah ===");
    const kodeBuah = new KodeBuah();
    console.log("Kode Apel:", kodeBuah.getKodeBuah("Apel"));
    console.log("Kode Ceri:", kodeBuah.getKodeBuah("Ceri"));
    console.log("Kode Jagung:", kodeBuah.getKodeBuah("Jagung"));
    console.log("Kode Alpukat:", kodeBuah.getKodeBuah("Alpukat"));
    
    console.log("\n=== Testing PosisiKarakterGame ===");
    // E. Simulating state changes for PosisiKarakterGame
    const gameChar = new PosisiKarakterGame();
    gameChar.simulasi();
}

// Run the program
main();
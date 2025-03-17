const readline = require('readline');

// A. Class KodePos
class KodePos {
    // B. Method getKodePos that returns the postal code
    getKodePos(kelurahan) {
        // Table-driven approach for postal codes
        const kodePosTable = {
            "Batununggal": 40266,
            "Kujangsari": 40287,
            "Mengger": 40267,
            "Wates": 40256,
            "Cijaura": 40287,
            "Jatisari": 40286,
            "Margasari": 40286,
            "Sekejati": 40286,
            "Kebonwaru": 40272,
            "Maleer": 40274,
            "Samoja": 40273
        };
        
        return kodePosTable[kelurahan] || "Kode pos tidak ditemukan";
    }
}

// A. Class DoorMachine with state-based construction
class DoorMachine {
    constructor() {
        // Define all possible states
        this.states = {
            TERKUNCI: 'Terkunci',
            TERBUKA: 'Terbuka'
        };
        
        // B. Set initial state to TERKUNCI (locked)
        this.currentState = this.states.TERKUNCI;
        console.log("State awal:", this.currentState);
        
        // Set up readline interface for input
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }
    
    // Method to change state based on command
    changeState(command) {
        // Store previous state to check if transition happened
        const prevState = this.currentState;
        
        // State transition logic based on the FSM diagram
        switch(this.currentState) {
            case this.states.TERKUNCI:
                if (command === 'BukaPintu') {
                    this.currentState = this.states.TERBUKA;
                }
                break;
                
            case this.states.TERBUKA:
                if (command === 'KunciPintu') {
                    this.currentState = this.states.TERKUNCI;
                }
                break;
        }
        
        // C & D. Display messages based on state transitions
        if (prevState !== this.currentState) {
            if (this.currentState === this.states.TERKUNCI) {
                console.log("Pintu terkunci");
            } else if (this.currentState === this.states.TERBUKA) {
                console.log("Pintu tidak terkunci");
            }
        }
        
        // Output current state
        console.log(`State sekarang: ${this.currentState}`);
    }
    
    // E. Method to simulate state changes
    simulasi() {
        // Define sequence of commands to test all state transitions
        const commands = [
            'BukaPintu',   // Terkunci -> Terbuka
            'BukaPintu',   // Should stay Terbuka (no change)
            'KunciPintu',  // Terbuka -> Terkunci
            'KunciPintu',  // Should stay Terkunci (no change)
            'BukaPintu'    // Terkunci -> Terbuka
        ];
        
        // Execute each command in sequence
        commands.forEach((cmd, index) => {
            console.log(`\nCommand ${index + 1}: ${cmd}`);
            this.changeState(cmd);
        });
        
        this.rl.close();
    }
}

// Main execution - C & E
function main() {
    // C. Testing KodePos class
    console.log("=== Testing KodePos ===");
    const kodePos = new KodePos();
    
    console.log("Kode Pos Batununggal:", kodePos.getKodePos("Batununggal"));
    console.log("Kode Pos Kujangsari:", kodePos.getKodePos("Kujangsari"));
    console.log("Kode Pos Mengger:", kodePos.getKodePos("Mengger"));
    console.log("Kode Pos Kebonwaru:", kodePos.getKodePos("Kebonwaru"));
    console.log("Kode Pos Maleer:", kodePos.getKodePos("Maleer"));
    
    // E. Simulating state changes for DoorMachine
    console.log("\n=== Testing DoorMachine ===");
    const doorMachine = new DoorMachine();
    doorMachine.simulasi();
}

// Run the program
main();
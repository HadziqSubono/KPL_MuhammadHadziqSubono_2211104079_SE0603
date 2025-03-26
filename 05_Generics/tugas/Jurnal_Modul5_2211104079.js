// 1. Create a class named "Penjumlahan"
class Penjumlahan {
    // 2-5. Add a method named "JumlahTigaAngka" with three generic parameters
    JumlahTigaAngka(a, b, c) {
        // 6. Using a dynamic variable to allow mathematical operations
        let result = a + b + c;
        return result;
    }
}

// 9-11. Create a class named "SimpleDataBase"
class SimpleDataBase {
    // 10. Properties: storedData and inputDates
    constructor() {
        // 11a. Initialize storedData as an empty list
        this.storedData = [];
        this.inputDates = [];
    }

    // 11b. Method to add new data and current time
    AddNewData(data) {
        this.storedData.push(data);
        this.inputDates.push(new Date());
    }

    // 11c. Method to print all data
    PrintAllData() {
        for (let i = 0; i < this.storedData.length; i++) {
            console.log(`Data ${i+1} berisi: ${this.storedData[i]}, yang disimpan pada waktu UTC: ${this.inputDates[i].toUTCString()}`);
        }
    }
}

// Main function
function main() {
    // Create an instance of Penjumlahan
    const penjumlahan = new Penjumlahan();
    
    // 8. Call JumlahTigaAngka with three inputs based on NIM: 2211104079
    // Since the NIM ends with 9, the input type should be long (which in JavaScript is handled as Number)
    
    // Extract 2-digit numbers from NIM: "22", "11", "10"
    const num1 = 22;
    const num2 = 11;
    const num3 = 10;
    
    // Calculate the sum
    const sum = penjumlahan.JumlahTigaAngka(num1, num2, num3);
    console.log(`Hasil penjumlahan: ${sum}`);
    
    // Create SimpleDataBase instance
    const db = new SimpleDataBase();
    
    // Add three data items with the same values
    db.AddNewData(num1);
    db.AddNewData(num2);
    db.AddNewData(num3);
    
    // 12. Call PrintAllData()
    db.PrintAllData();
}

// Run the main function
main();
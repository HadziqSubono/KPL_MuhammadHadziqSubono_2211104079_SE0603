// STEP 1
// 1. Membuat class bernama "HaloGeneric"
class HaloGeneric {
    // 2. Menambahkan method "SapaUser" dengan generic parameter
    SapaUser(X) {
        console.log(`Halo user ${X}`);
    }
}

// STEP 2
// 1. Membuat class "DataGeneric" sesuai model
class DataGeneric {
    // Property "data" yang bertipe generic T
    constructor(data) {
        this.data = data;
    }
    
    // 2. Method PrintData
    PrintData() {
        console.log(`Data yang tersimpan adalah: ${this.data}`);
    }
}

// Fungsi utama
function main() {
    // STEP 1.3: Memanggil method SapaUser dengan input nama panggilan
    console.log("--- Step 1 ---");
    const haloObj = new HaloGeneric();
    haloObj.SapaUser("Hadziq"); // Ganti dengan nama panggilan Anda
    
    // STEP 2.3: Memanggil method PrintData setelah mengisi data dengan NIM
    console.log("\n--- Step 2 ---");
    const dataObj = new DataGeneric("2211104079"); // Menggunakan NIM Anda
    dataObj.PrintData();
}

// Menjalankan fungsi utama
main();
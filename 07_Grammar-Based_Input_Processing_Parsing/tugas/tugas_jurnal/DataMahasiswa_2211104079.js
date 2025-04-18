const fs = require('fs');

class DataMahasiswa_2211104079 {
    constructor() {
        this.data = null;
    }

    ReadJSON() {
        try {
            // Membaca file JSON
            const rawData = fs.readFileSync('./jurnal7_1_2211104079.json');
            
            // Parsing data JSON menjadi object
            this.data = JSON.parse(rawData);
            
            // Menampilkan hasil deserialisasi
            console.log("===== DATA MAHASISWA =====");
            console.log(`Nama Lengkap: ${this.data.firstName} ${this.data.lastName}`);
            console.log(`Jenis Kelamin: ${this.data.gender}`);
            console.log(`Usia: ${this.data.age} tahun`);
            
            console.log("\n===== ALAMAT =====");
            console.log(`Jalan: ${this.data.address.streetAddress}`);
            console.log(`Kota: ${this.data.address.city}`);
            console.log(`Provinsi: ${this.data.address.state}`);
            
            console.log("\n===== MATA KULIAH =====");
            this.data.courses.forEach((course, index) => {
                console.log(`${index + 1}. (${course.code}) ${course.name}`);
            });
            
            return this.data;
        } catch (error) {
            console.error("Terjadi kesalahan saat membaca file JSON:", error.message);
            return null;
        }
    }
}

// Contoh penggunaan
const dataMahasiswa = new DataMahasiswa_2211104079();
dataMahasiswa.ReadJSON();

module.exports = DataMahasiswa_2211104079;
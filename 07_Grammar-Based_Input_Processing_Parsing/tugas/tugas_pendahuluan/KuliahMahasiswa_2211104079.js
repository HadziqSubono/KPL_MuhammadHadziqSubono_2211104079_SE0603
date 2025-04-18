const fs = require('fs');

class KuliahMahasiswa_2211104079 {
    constructor() {
        this.data = null;
    }

    ReadJSON() {
        try {
            // Membaca file JSON
            const rawData = fs.readFileSync('./tp7_2_2211104079.json');
            
            // Parsing data JSON menjadi object
            this.data = JSON.parse(rawData);
            
            // Menampilkan hasil deserialisasi dengan format yang diminta
            console.log("Daftar mata kuliah yang diambil:");
            
            // Loop melalui setiap mata kuliah
            this.data.courses.forEach((course, index) => {
                console.log(`MK ${index + 1} ${course.code} - ${course.name}`);
            });
            
            return this.data;
        } catch (error) {
            console.error("Terjadi kesalahan saat membaca file JSON:", error.message);
            return null;
        }
    }
}

// Contoh penggunaan
const kuliahMahasiswa = new KuliahMahasiswa_2211104079();
kuliahMahasiswa.ReadJSON();

module.exports = KuliahMahasiswa_2211104079;
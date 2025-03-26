class SayaTubeVideo {
    // Atribut sesuai struktur class
    constructor(title) {
        // Prekondisi: Validasi judul video
        if (title === null) {
            throw new Error("Judul video tidak boleh null");
        }
        if (title.length > 100) {
            throw new Error("Judul video maksimal 100 karakter");
        }

        // Generate ID acak 5 digit
        this.id = Math.floor(10000 + Math.random() * 90000);
        this.title = title;
        this.playCount = 0;
    }

    // Method IncreasePlayCount dengan design by contract
    increasePlayCount(count) {
        // Prekondisi: Validasi jumlah penambahan play count
        if (count <= 0) {
            throw new Error("Penambahan play count harus positif");
        }
        if (count > 10000000) {
            throw new Error("Penambahan play count maksimal 10.000.000");
        }

        try {
            // Penanganan exception untuk overflow
            if (this.playCount + count > Number.MAX_SAFE_INTEGER) {
                throw new Error("Overflow: Jumlah play count melebihi batas integer");
            }
            
            this.playCount += count;
        } catch (error) {
            console.error(error.message);
        }
    }

    // Method untuk mencetak detail video
    printVideoDetails() {
        console.log(`Video ID: ${this.id}`);
        console.log(`Judul Video: ${this.title}`);
        console.log(`Play Count: ${this.playCount}`);
    }
}

// Fungsi utama untuk menguji class SayaTubeVideo
function main() {
    console.log("===== Pengujian SayaTubeVideo =====");

    // Membuat video dengan judul sesuai spesifikasi
    const video = new SayaTubeVideo("Tutorial Design By Contract – [Muhammad Hadziq Subono]");

    // Menampilkan detail video awal
    console.log("\nDetail Video Awal:");
    video.printVideoDetails();

    // Pengujian IncreasePlayCount
    console.log("\nPengujian Penambahan Play Count:");
    try {
        // Menambahkan play count
        video.increasePlayCount(5000000);
        console.log("Berhasil menambahkan 5.000.000 play count");
        video.printVideoDetails();

        // Pengujian batas maksimum penambahan
        console.log("\nPengujian Batas Maksimum Penambahan:");
        video.increasePlayCount(10000000);
        video.printVideoDetails();

        // Pengujian Overflow
        console.log("\nPengujian Overflow:");
        for (let i = 0; i < 10; i++) {
            video.increasePlayCount(Number.MAX_SAFE_INTEGER / 10);
            console.log(`Iterasi ${i + 1}: Play Count = ${video.playCount}`);
        }
    } catch (error) {
        console.error("Error:", error.message);
    }

    // Pengujian Prekondisi
    console.log("\nPengujian Prekondisi:");
    try {
        // Judul null
        const videoNull = new SayaTubeVideo(null);
    } catch (error) {
        console.error("Error (Judul Null):", error.message);
    }

    try {
        // Judul terlalu panjang
        const videoTooLong = new SayaTubeVideo("a".repeat(101));
    } catch (error) {
        console.error("Error (Judul Terlalu Panjang):", error.message);
    }
}

// Jalankan fungsi utama
main();
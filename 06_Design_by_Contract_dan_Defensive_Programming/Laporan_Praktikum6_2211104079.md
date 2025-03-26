# Laporan Tugas Jurnal Modul 6

## Identitas Mahasiswa
- **Nama:** Muhammad Hadziq Subono  
- **NIM:** 2211104079  
- **Kelas:** SE06-C 

## 1. Source Code

```javascript
class SayaTubeVideo {
    constructor(title) {
        // Pengujian Prekondisi
        if (title === null) {
            throw new Error("Judul video tidak boleh null");
        }
        if (title.length > 200) {
            throw new Error("Judul video maksimal 200 karakter");
        }

        this.id = Math.floor(10000 + Math.random() * 90000);
        this.title = title;
        this.playCount = 0;
    }

    increasePlayCount(count) {
        // Pengujian Prekondisi
        if (count < 0) {
            throw new Error("Penambahan play count tidak boleh negatif");
        }
        if (count > 25000000) {
            throw new Error("Penambahan play count maksimal 25.000.000");
        }

        try {
            // Pengujian Exception (Overflow)
            if (this.playCount + count > Number.MAX_SAFE_INTEGER) {
                throw new Error("Overflow: Jumlah play count melebihi batas integer");
            }
            this.playCount += count;
        } catch (error) {
            console.error(error.message);
        }
    }

    printVideoDetails() {
        console.log(`Video ID: ${this.id}`);
        console.log(`Judul: ${this.title}`);
        console.log(`Play Count: ${this.playCount}`);
    }
}

class SayaTubeUser {
    constructor(username) {
        // Pengujian Prekondisi
        if (username === null) {
            throw new Error("Username tidak boleh null");
        }
        if (username.length > 100) {
            throw new Error("Username maksimal 100 karakter");
        }

        this.username = username;
        this.uploadedVideos = [];
    }

    addVideo(video) {
        // Pengujian Prekondisi
        if (video === null) {
            throw new Error("Video tidak boleh null");
        }
        if (video.playCount >= Number.MAX_SAFE_INTEGER) {
            throw new Error("Play count video terlalu besar");
        }

        this.uploadedVideos.push(video);
    }

    getTotalVideoPlayCount() {
        return this.uploadedVideos.reduce((total, video) => total + video.playCount, 0);
    }

    printAllVideoPlaycount() {
        console.log(`User: ${this.username}`);
        
        // Postcondition: Print maksimal 8 video
        const videosToShow = this.uploadedVideos.slice(0, 8);
        
        videosToShow.forEach((video, index) => {
            console.log(`Video ${index + 1} judul: ${video.title}`);
        });
    }
}

// Fungsi untuk menguji berbagai skenario
function testSayaTube() {
    console.log("===== Pengujian Prekondisi, Exception, dan Postcondition =====");

    // Pengujian Konstruktor SayaTubeVideo dengan Prekondisi
    console.log("\n1. Pengujian Konstruktor Video:");
    try {
        // Judul null (seharusnya error)
        const videoNull = new SayaTubeVideo(null);
    } catch (error) {
        console.error("Error (Judul Null):", error.message);
    }

    try {
        // Judul terlalu panjang (seharusnya error)
        const videoTooLong = new SayaTubeVideo("a".repeat(201));
    } catch (error) {
        console.error("Error (Judul Terlalu Panjang):", error.message);
    }

    // Pengujian Konstruktor SayaTubeUser dengan Prekondisi
    console.log("\n2. Pengujian Konstruktor User:");
    try {
        // Username null (seharusnya error)
        const userNull = new SayaTubeUser(null);
    } catch (error) {
        console.error("Error (Username Null):", error.message);
    }

    try {
        // Username terlalu panjang (seharusnya error)
        const userTooLong = new SayaTubeUser("a".repeat(101));
    } catch (error) {
        console.error("Error (Username Terlalu Panjang):", error.message);
    }

    // Pengujian Exception Overflow
    console.log("\n3. Pengujian Overflow Play Count:");
    const overflowVideo = new SayaTubeVideo("Overflow Test Video");
    try {
        for (let i = 0; i < 10; i++) {
            overflowVideo.increasePlayCount(Number.MAX_SAFE_INTEGER / 10);
            console.log(`Iterasi ${i + 1}: Play Count = ${overflowVideo.playCount}`);
        }
    } catch (error) {
        console.error("Error (Overflow):", error.message);
    }

    // Pengujian Postcondition (Batasan Jumlah Video)
    console.log("\n4. Pengujian Postcondition (Batasan Jumlah Video):");
    const user = new SayaTubeUser("Muhammad Hadziq Subono");
    
    // Membuat lebih dari 8 video
    const films = [
        "Inception", "Shawshank Redemption", "Godfather", 
        "Interstellar", "The Matrix", "Pulp Fiction", 
        "Forrest Gump", "Fight Club", "Dark Knight", 
        "Schindler's List"
    ];

    films.forEach(film => {
        const video = new SayaTubeVideo(`Review Film ${film} oleh Muhammad Hadziq Subono`);
        video.increasePlayCount(1000000);
        user.addVideo(video);
    });

    console.log("Daftar Video yang Akan Ditampilkan:");
    user.printAllVideoPlaycount();
}

// Jalankan pengujian
testSayaTube();
```

## 2. Output

![Screenshot Output Jurnal Modul 6](img/ss_tugas_jurnal_modul6.png)

## 3. Penjelasan

Kode ini mengimplementasikan dua kelas utama, `SayaTubeVideo` dan `SayaTubeUser`, yang mensimulasikan platform berbagi video. Kelas `SayaTubeVideo` merepresentasikan video dengan validasi input dan mekanisme penanganan overflow play count. Kelas `SayaTubeUser` memungkinkan pengguna untuk mengunggah video dan menampilkan maksimal 8 video. Pengujian dilakukan untuk memastikan bahwa sistem menangani precondition, exception, dan postcondition dengan benar.

---

# Laporan Tugas Pendahuluan Modul 6

## Source Code
```javascript
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
```

## Output
![Screenshot Output Pendahuluan Modul 6](img/ss_tugas_pendahuluan_modul6.png)

## Penjelasan
Pada program ini, dibuat kelas `SayaTubeVideo` yang merepresentasikan sebuah video dalam aplikasi SayaTube. Berikut adalah penjelasan utama:

1. **Konstruktor**
   - Memastikan judul video tidak null dan tidak lebih dari 100 karakter.
   - Menghasilkan ID acak dengan 5 digit.

2. **Method `increasePlayCount`**
   - Memastikan penambahan play count harus positif dan tidak lebih dari 10.000.000.
   - Menangani kemungkinan overflow.

3. **Method `printVideoDetails`**
   - Menampilkan informasi video.

4. **Fungsi `main` untuk pengujian**
   - Membuat objek `SayaTubeVideo`.
   - Menguji peningkatan play count dalam batas normal dan overflow.
   - Menguji validasi prekondisi seperti judul null atau terlalu panjang.

Dari hasil output, terlihat bahwa program menangani validasi dengan baik serta menampilkan error saat terjadi kesalahan. Hal ini menunjukkan bahwa konsep **Design by Contract** diterapkan dengan benar dalam program ini.
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
        // Simulasi overflow dengan loop untuk mempercepat proses
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

    // Menampilkan video (akan dibatasi maksimal 8)
    console.log("Daftar Video yang Akan Ditampilkan:");
    user.printAllVideoPlaycount();
}

// Jalankan pengujian
testSayaTube();
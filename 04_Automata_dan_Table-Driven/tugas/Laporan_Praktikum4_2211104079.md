# Laporan Tugas Jurnal Modul 4

## Identitas Mahasiswa
- **Nama:** Muhammad Hadziq Subono  
- **NIM:** 2211104079  
- **Kelas:** SE06-C  

---

## 1. Source Code

### Jurnal_Modul4_2211104079.js
```javascript
const readline = require('readline');

// A. Class KodeBuah
class KodeBuah {
    getKodeBuah(buah) {
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

// D. Class PosisiKarakterGame
class PosisiKarakterGame {
    constructor() {
        this.posisi = {
            BERDIRI: 'Berdiri',
            JONGKOK: 'Jongkok',
            TENGKURAP: 'Tengkurap',
            TERBANG: 'Terbang'
        };
        this.currentPosisi = this.posisi.BERDIRI;
    }
    
    ubahPosisi(command) {
        switch(this.currentPosisi) {
            case this.posisi.BERDIRI:
                if (command === 'TombolS') this.currentPosisi = this.posisi.JONGKOK;
                else if (command === 'TombolW') this.currentPosisi = this.posisi.TERBANG;
                break;
            case this.posisi.JONGKOK:
                if (command === 'TombolS') this.currentPosisi = this.posisi.TENGKURAP;
                else if (command === 'TombolW') this.currentPosisi = this.posisi.BERDIRI;
                break;
            case this.posisi.TENGKURAP:
                if (command === 'TombolW') this.currentPosisi = this.posisi.JONGKOK;
                break;
            case this.posisi.TERBANG:
                if (command === 'TombolS') this.currentPosisi = this.posisi.BERDIRI;
                else if (command === 'TombolX') this.currentPosisi = this.posisi.JONGKOK;
                break;
        }
        console.log(`Posisi sekarang: ${this.currentPosisi}`);
    }
}

function main() {
    console.log("=== Testing KodeBuah ===");
    const kodeBuah = new KodeBuah();
    console.log("Kode Apel:", kodeBuah.getKodeBuah("Apel"));
    console.log("Kode Ceri:", kodeBuah.getKodeBuah("Ceri"));
    
    console.log("\n=== Testing PosisiKarakterGame ===");
    const gameChar = new PosisiKarakterGame();
    gameChar.ubahPosisi('TombolS');
    gameChar.ubahPosisi('TombolW');
}
main();
```

---

## 3. Screenshot Output

!([Screenshot Output](img/ss_tugas_jurnal_modul4.png))

---

## 4. Penjelasan

1. **Bagaimana konsep state machine diterapkan dalam program ini?**  
   Konsep state machine diterapkan dalam class `PosisiKarakterGame` dan `DoorMachine`, di mana setiap objek memiliki kondisi (state) yang berubah berdasarkan input tertentu. 

2. **Apa perbedaan utama antara tabel pemetaan (mapping table) dengan state machine?**  
   - Tabel pemetaan (mapping table) hanya memberikan hubungan antara suatu input dengan output tanpa mempertimbangkan kondisi sebelumnya.
   - State machine mempertimbangkan kondisi sebelumnya dalam menentukan transisi ke kondisi selanjutnya.

3. **Bagaimana cara kerja class `KodeBuah` dalam mendapatkan kode buah?**  
   Class `KodeBuah` memiliki metode `getKodeBuah()` yang menerima nama buah sebagai input dan mencocokkannya dengan objek pemetaan (`kodeBuahTable`). Jika ditemukan, akan mengembalikan kode buah yang sesuai.

4. **Bagaimana cara kerja class `PosisiKarakterGame` dalam mengubah posisi karakter?**  
   Class `PosisiKarakterGame` menggunakan metode `ubahPosisi()`, yang bekerja dengan mengevaluasi posisi saat ini dan mengubahnya sesuai dengan tombol yang ditekan, berdasarkan aturan yang telah didefinisikan.

---

# Laporan Tugas Pendahuluan Modul 4

## 1. Source Code

### TP\_Modul4\_2211104079.js

```javascript
const readline = require('readline');

// A. Class KodePos
class KodePos {
    getKodePos(kelurahan) {
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

// A. Class DoorMachine
class DoorMachine {
    constructor() {
        this.states = {
            TERKUNCI: 'Terkunci',
            TERBUKA: 'Terbuka'
        };
        this.currentState = this.states.TERKUNCI;
        console.log("State awal:", this.currentState);
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }
    
    changeState(command) {
        const prevState = this.currentState;
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
        if (prevState !== this.currentState) {
            console.log(this.currentState === this.states.TERKUNCI ? "Pintu terkunci" : "Pintu tidak terkunci");
        }
        console.log(`State sekarang: ${this.currentState}`);
    }
    
    simulasi() {
        const commands = [
            'BukaPintu',
            'BukaPintu',
            'KunciPintu',
            'KunciPintu',
            'BukaPintu'
        ];
        commands.forEach((cmd, index) => {
            console.log(`\nCommand ${index + 1}: ${cmd}`);
            this.changeState(cmd);
        });
        this.rl.close();
    }
}

// Main execution
function main() {
    console.log("=== Testing KodePos ===");
    const kodePos = new KodePos();
    console.log("Kode Pos Batununggal:", kodePos.getKodePos("Batununggal"));
    console.log("Kode Pos Kujangsari:", kodePos.getKodePos("Kujangsari"));
    console.log("Kode Pos Mengger:", kodePos.getKodePos("Mengger"));
    console.log("Kode Pos Kebonwaru:", kodePos.getKodePos("Kebonwaru"));
    console.log("Kode Pos Maleer:", kodePos.getKodePos("Maleer"));
    
    console.log("\n=== Testing DoorMachine ===");
    const doorMachine = new DoorMachine();
    doorMachine.simulasi();
}
main();
```

---

## 3. Screenshot Output

!([Screenshot Output](img/ss_tugas_pendahuluan_modul4.png))

---

## 4. Penjelasan

1. **Bagaimana konsep state machine diterapkan dalam program ini?**\
   Konsep state machine diterapkan dalam class `DoorMachine`, di mana objek memiliki kondisi (`Terkunci` atau `Terbuka`) yang berubah berdasarkan perintah tertentu (`BukaPintu`, `KunciPintu`).

2. **Apa perbedaan utama antara tabel pemetaan (mapping table) dengan state machine?**

   - Tabel pemetaan hanya memberikan hubungan antara suatu input dengan output tanpa mempertimbangkan kondisi sebelumnya.
   - State machine mempertimbangkan kondisi sebelumnya dalam menentukan transisi ke kondisi selanjutnya.

3. **Bagaimana cara kerja class ****`KodePos`**** dalam mendapatkan kode pos?**\
   Class `KodePos` memiliki metode `getKodePos()` yang menerima nama kelurahan sebagai input dan mencocokkannya dengan objek pemetaan (`kodePosTable`). Jika ditemukan, akan mengembalikan kode pos yang sesuai.

4. **Bagaimana cara kerja class ****`DoorMachine`**** dalam mengubah keadaan pintu?**\
   Class `DoorMachine` menggunakan metode `changeState()`, yang bekerja dengan mengevaluasi keadaan saat ini dan mengubahnya berdasarkan perintah yang diberikan.
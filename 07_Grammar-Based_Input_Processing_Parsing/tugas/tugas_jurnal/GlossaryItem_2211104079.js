const fs = require('fs');

class GlossaryItem_2211104079 {
    constructor() {
        this.data = null;
    }

    ReadJSON() {
        try {
            // Membaca file JSON
            const rawData = fs.readFileSync('./jurnal7_3_2211104079.json');
            
            // Parsing data JSON menjadi object
            this.data = JSON.parse(rawData);
            
            // Mengambil bagian GlossEntry saja
            const glossEntry = this.data.glossary.GlossDiv.GlossList.GlossEntry;
            
            // Menampilkan hasil deserialisasi dari GlossEntry
            console.log("======= GLOSS ENTRY DETAILS =======");
            console.log(`ID: ${glossEntry.ID}`);
            console.log(`Sort As: ${glossEntry.SortAs}`);
            console.log(`Term: ${glossEntry.GlossTerm}`);
            console.log(`Acronym: ${glossEntry.Acronym}`);
            console.log(`Abbreviation: ${glossEntry.Abbrev}`);
            
            console.log("\n----- Definition -----");
            console.log(`Description: ${glossEntry.GlossDef.para}`);
            
            console.log("\nSee Also:");
            glossEntry.GlossDef.GlossSeeAlso.forEach((item, index) => {
                console.log(`  ${index + 1}. ${item}`);
            });
            
            console.log(`\nGloss See: ${glossEntry.GlossSee}`);
            
            return glossEntry;
        } catch (error) {
            console.error("Terjadi kesalahan saat membaca file JSON:", error.message);
            return null;
        }
    }
}

// Contoh penggunaan
const glossaryItem = new GlossaryItem_2211104079();
glossaryItem.ReadJSON();

module.exports = GlossaryItem_2211104079;
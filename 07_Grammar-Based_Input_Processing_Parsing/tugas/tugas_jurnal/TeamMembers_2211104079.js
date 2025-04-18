const fs = require('fs');

class TeamMembers_2211104079 {
    constructor() {
        this.data = null;
    }

    ReadJSON() {
        try {
            // Membaca file JSON
            const rawData = fs.readFileSync('./jurnal7_2_2211104079.json');
            
            // Parsing data JSON menjadi object
            this.data = JSON.parse(rawData);
            
            // Menampilkan hasil deserialisasi dengan format yang diminta
            console.log("Team member list:");
            
            // Loop melalui setiap anggota tim
            this.data.members.forEach(member => {
                console.log(`${member.nim} ${member.firstName}${member.lastName} (${member.age} ${member.gender})`);
            });
            
            return this.data;
        } catch (error) {
            console.error("Terjadi kesalahan saat membaca file JSON:", error.message);
            return null;
        }
    }
}

// Contoh penggunaan
const teamMembers = new TeamMembers_2211104079();
teamMembers.ReadJSON();

module.exports = TeamMembers_2211104079;
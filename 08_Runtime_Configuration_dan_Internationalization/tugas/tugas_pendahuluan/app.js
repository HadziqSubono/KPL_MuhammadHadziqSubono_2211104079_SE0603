const fs = require('fs');
const readline = require('readline');
const path = require('path');

// Class CovidConfig
class CovidConfig {
  constructor() {
    this.configPath = path.join(__dirname, 'covid_config.json');
    this.defaultConfig = {
      satuan_suhu: 'celcius',
      batas_hari_deman: 14,
      pesan_ditolak: 'Anda tidak diperbolehkan masuk ke dalam gedung ini',
      pesan_diterima: 'Anda dipersilahkan untuk masuk ke dalam gedung ini'
    };

    this.config = this.loadConfig();
  }

  loadConfig() {
    try {
      if (fs.existsSync(this.configPath)) {
        const data = fs.readFileSync(this.configPath, 'utf8');
        return JSON.parse(data);
      } else {
        return this.defaultConfig;
      }
    } catch (err) {
      console.error('Gagal membaca konfigurasi, menggunakan default.');
      return this.defaultConfig;
    }
  }

  saveConfig() {
    fs.writeFileSync(this.configPath, JSON.stringify(this.config, null, 2));
  }

  ubahSatuan() {
    this.config.satuan_suhu = this.config.satuan_suhu === 'celcius' ? 'fahrenheit' : 'celcius';
    this.saveConfig();
    console.log(`Satuan suhu berhasil diubah menjadi ${this.config.satuan_suhu}`);
  }
}

// Fungsi untuk input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function askQuestion(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

// Program utama
(async function main() {
  const configHandler = new CovidConfig();
  const config = configHandler.config;

  // Contoh: ubah satuan suhu jika perlu
  // configHandler.ubahSatuan(); // Uncomment baris ini jika ingin mengubah satuan suhu

  const suhuInput = await askQuestion(`Berapa suhu badan anda saat ini? Dalam nilai ${config.satuan_suhu}: `);
  const suhu = parseFloat(suhuInput);

  const hariInput = await askQuestion('Berapa hari yang lalu (perkiraan) anda terakhir memiliki gejala demam? ');
  const hariDemam = parseInt(hariInput);

  rl.close();

  let suhuNormal = false;
  if (config.satuan_suhu === 'celcius') {
    suhuNormal = suhu >= 36.5 && suhu <= 37.5;
  } else if (config.satuan_suhu === 'fahrenheit') {
    suhuNormal = suhu >= 97.7 && suhu <= 99.5;
  }

  const hariCukup = hariDemam < config.batas_hari_deman;

  if (suhuNormal && hariCukup) {
    console.log(config.pesan_diterima);
  } else {
    console.log(config.pesan_ditolak);
  }
})();

const nilai = ["1,304.16", "$1,456.78", "1,094", "152", "123,45 €", "1 304,16", "Ae9f"];

function parseAngkaKetat(teks, lokal) {
  let regex, hasil = null;

  if (lokal === 'en-US') {
    // Format en-US: boleh ada koma ribuan, desimal titik
    regex = /^\$?(\d{1,3}(,\d{3})*|\d+)(\.\d+)?$/;
    if (regex.test(teks)) {
      // Hapus koma
      const bersih = teks.replace(/[^0-9.]/g, '');
      return parseFloat(bersih);
    }
  }

  if (lokal === 'fr-FR') {
    // Format fr-FR: spasi ribuan, koma sebagai desimal
    regex = /^(\d{1,3}( \d{3})*|\d+)(,\d+)?\s?€?$/;
    if (regex.test(teks)) {
      // Hapus spasi, ubah koma ke titik
      const bersih = teks.replace(/\s/g, '').replace(',', '.').replace(/[^\d.]/g, '');
      return parseFloat(bersih);
    }
  }

  throw new Error("Tidak bisa parse");
}

// Proses setiap nilai
for (const data of nilai) {
  try {
    const angka = parseAngkaKetat(data, 'en-US');
    console.log(`en-US: ${data} --> ${angka}`);
  } catch {
    console.log(`en-US: Unable to parse '${data}'.`);
    try {
      const angka = parseAngkaKetat(data, 'fr-FR');
      console.log(`fr-FR: ${data} --> ${angka}`);
    } catch {
      console.log(`fr-FR: Unable to parse '${data}'.`);
    }
  }
  console.log();
}
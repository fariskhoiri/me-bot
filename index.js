const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3000;

// Agar bisa membaca data dari Fonnte
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/webhook', async (req, res) => {
    // Fonnte mengirim data di req.body
    const payload = req.body;

    // Selalu balas secepatnya ke Fonnte agar tidak timeout
    res.status(200).send({ status: true, message: 'Webhook received' });

    // Ekstrak data dari Fonnte
    const nomorPengirim = payload.sender;
    const teksMasuk = payload.message ? payload.message.trim().toLowerCase() : "";

    // Jika tidak ada nomor atau pesan kosong, hentikan proses
    if (!nomorPengirim || !teksMasuk) return;

    console.log(`[Pesan masuk] dari: ${nomorPengirim} | isi: "${payload.message}"`);

    const kataKunciValid = ['halo', 'p', 'info', 'nda', 'nan', 'her'];

    // Logika penyaringan
    // Jika kata kunci yang diketik tidak sesuai di dalam kataKunciValid, maka abaikan
    if (!kataKunciValid.includes(teksMasuk)) {
        console.log(`[DIABAIKAN] pesan "${payload.message}" dari ${nomorPengirim} diabaikan oleh bot.`);
        return;
    }

    // Logika jawaban untuk pesan spesifik
    let teksBalasan = "";

    if (teksMasuk === 'her' || teksMasuk === 'p' || teksMasuk === 'nda' || teksMasuk === 'nan') {
        teksBalasan = "Hai, saya adalah bot dari pemilik nomor ini. Mungkin dia akan slow respon jadi silahkan tinggalkan pesan dan saya akan memberitahu dia untuk segera membalasnya.";
    } else if (teksMasuk === 'info') {
        teksBalasan = "Bot ini dikonfigurasi hanya membalas pesan tertentu saja.";
    }

    // Tembak API fonnte untuk kirim pesan
    try {
        console.log(`[Mengirim balasan] ke ${nomorPengirim}...`);

        await axios.post('https://api.fonnte.com/send', {
            target: nomorPengirim,
            message: teksBalasan,
        }, {
            headers: {
                'Authorization': 'wGMRVUtt3Jd1wqyymp3u'
            }
        });

        console.log("Pesan sukses terkirim!");
    } catch (error) {
        console.error("Gagal mengirim pesan:", error.message);
    }
});

app.listen(PORT, () => {
    console.log(`Server webhook Fonnte aktif di port ${PORT}`);
});
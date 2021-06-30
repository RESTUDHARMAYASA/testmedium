//menyediakan layanan ke mongodb
const mongoose = require("mongoose");

const dataAnggotaScema = mongoose.Schema({
    Nama: {
        type: String,
        required: true
    },
    NIM: {
        type: String,
        required: true
    },
    Fakultas: {
        type: String,
        required: true
    },
    Jabatan: {
        type: String,
        required: true
    },
}, {
    collection: "dataAnggota"
})

module.exports = mongoose.model("DataAnggota", dataAnggotaScema);

//setiap penginstalan masuk ke folder node_modules
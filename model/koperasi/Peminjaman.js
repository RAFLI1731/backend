const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  tanggal: {
    type: String,
  },
  namaPeminjam: {
    type: String,
  },
  keterangan: {
    type: String,
  },
  jumlah: {
    type: Number,
    default: 0,
  },
  bunga: {
    type: String,
  },
  total: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("peminjaman", UserSchema);

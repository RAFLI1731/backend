const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  namaPersediaan: {
    type: String,
  },
  kuantitas: {
    type: String,
  },
  satuan: {
    type: String,
  },
  harga: {
    type: Number,
    default: 0,
  },
  total: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("stok", UserSchema);

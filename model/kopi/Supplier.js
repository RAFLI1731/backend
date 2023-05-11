const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  namaSupplier: {
    type: String,
  },
  keterangan: {
    type: String,
  },
  nomorTelepon: {
    type: String,
  },
  alamat: {
    type: String,
  },
});

module.exports = mongoose.model("supplier", UserSchema);

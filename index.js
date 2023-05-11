const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

const mongoURL = "mongodb://0.0.0.0:27017/srikandi";

mongoose
  .connect(mongoURL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Berhasil Konek ke database");
  })
  .catch(() => {
    console.log("Gagal konek");
  });

const directory = path.join(__dirname, "/statics/");
app.use(express.static(directory));
app.use(cors());

app.use(
  bodyParser.json({
    extended: true,
    limit: "20mb",
  })
);

app.use(
  bodyParser.urlencoded({
    extended: true,
    limit: "20mb",
  })
);

//routes
app.use("/user", require("./routes/koperasi/User"));
app.use("/nasabah", require("./routes/koperasi/Nasabah"));
app.use("/pengeluaran", require("./routes/koperasi/Pengeluaran"));
app.use("/peminjaman", require("./routes/koperasi/Peminjaman"));
//kopi
app.use("/customer", require("./routes/kopi/Customer"));
app.use("/supplier", require("./routes/kopi/Supplier"));
app.use("/produk", require("./routes/kopi/Produk"));
app.use("/stok", require("./routes/kopi/Stok"));
app.use("/pembelian", require("./routes/kopi/Pembelian"));
app.use("/penjualan", require("./routes/kopi/Penjualan"));
app.use("/pengeluaran", require("./routes/kopi/Pengeluaran"));
app.use("/inventaris", require("./routes/kopi/Inventaris"));

app.get("/", (req, res) => {
  res.json("Welcome in Srikandi");
});

app.listen(5000, () => {
  console.log("Server telah dijalankan 5000");
});

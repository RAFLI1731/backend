const userModel = require("../../model/kopi/Produk");
const bcrypt = require("bcrypt");
const { requestResponse } = require("../../config");
const objectId = require("mongoose").Types.ObjectId;
const { deleteImage } = require("../../UploadConfig");

exports.tambah = (data) =>
  new Promise((resolve, reject) => {
    userModel
      .create(data)
      .then(() => resolve(requestResponse.berhasil("Berhasil Tambah Produk")))
      .catch((error) => reject(requestResponse.gagal("Error")));
    console.log(data);
  });

exports.getAll = () =>
  new Promise((resolve, reject) => {
    userModel
      .find({})
      .then((user) => {
        console.log(requestResponse.berhasil("berhasil get Produk"));
        resolve(requestResponse.suksesWithData(user));
      })
      .catch(() => reject(requestResponse.kesalahan));
  });

exports.getById = (id) =>
  new Promise((resolve, reject) => {
    userModel
      .find({
        _id: objectId(id),
      })
      .then((user) => {
        console.log(requestResponse.berhasil("berhasil get Produk"));
        resolve(requestResponse.suksesWithData(user));
      })
      .catch(() => reject(requestResponse.kesalahan));
  });

exports.delete = (id) =>
  new Promise((resolve, reject) => {
    console.log(id);
    userModel
      .findOne({
        _id: objectId(id),
      })
      .then((data) => {
        userModel
          .deleteOne({
            _id: objectId(id),
          })
          .then(() => {
            deleteImage(data.fotoProduk);
            console.log(requestResponse.berhasil("Berhasil Delete Produk"));
            resolve(requestResponse.berhasil("Berhasil Delete Produk"));
          })
          .catch(() => reject(requestResponse.serverError));
      });
  });

exports.edit = (data, id, changeImage) =>
  new Promise(async (resolve, reject) => {
    userModel
      .updateOne(
        {
          _id: objectId(id),
        },
        data
      )
      .then(() => {
        if (changeImage == true) {
          deleteImage(data.oldImage);
        }
        console.log(requestResponse.berhasil("Berhasil Edit Produk"));
        resolve(requestResponse.berhasil("Berhasil Edit Produk"));
      })
      .catch(() => reject(requestResponse.serverError));
  });

const userModel = require("../../model/koperasi/User");
const bcrypt = require("bcrypt");
const { requestResponse } = require("../../config");
const objectId = require("mongoose").Types.ObjectId;

exports.register = (data) =>
  new Promise((resolve, reject) => {
    userModel
      .findOne({
        username: data.username,
      })
      .then((user) => {
        if (user) {
          resolve(requestResponse.gagal("Username telah ada"));
        } else {
          bcrypt.hash(data.password, 10, (err, hash) => {
            data.password = hash;
            userModel
              .create(data)
              .then(() => {
                console.log(requestResponse.berhasil("Berhasil Registrasi"));
                resolve(requestResponse.berhasil("Berhasil Registrasi"));
              })
              .catch(() => {
                reject(requestResponse.kesalahan);
                console.log(requestResponse.kesalahan);
              });
          });
        }
      });
  });

exports.login = (data) =>
  new Promise((resolve, reject) => {
    userModel
      .findOne({
        username: data.username,
      })
      .then((user) => {
        if (user) {
          if (bcrypt.compareSync(data.password, user.password)) {
            console.log(requestResponse.suksesLogin(user));
            resolve(requestResponse.suksesLogin(user));
          } else {
            console.log(requestResponse.gagal("Password Salah"));
            reject(requestResponse.gagal("Password Salah"));
          }
        } else {
          console.log(requestResponse.gagal("Username Tidak terdaftar"));
          reject(requestResponse.gagal("Username Tidak terdaftar"));
        }
      });
  });

exports.getAllUser = () =>
  new Promise((resolve, reject) => {
    userModel
      .find({})
      .then((user) => {
        console.log(requestResponse.berhasil("berhasil get data"));
        resolve(requestResponse.suksesWithData(user));
      })
      .catch(() => reject(requestResponse.kesalahan));
  });

exports.delete = (id) =>
  new Promise((resolve, reject) => {
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
            resolve(requestResponse.berhasil("Berhasil Delete Data"));
          })
          .catch(() => reject(requestResponse.serverError));
      });
  });

const router = require("express").Router();
const userController = require("../../controller/kopi/Produk");
const uploadSetting = require("../../UploadConfig");
const fields = uploadSetting.upload.fields([
  {
    name: "fotoProduk",
    maxCount: 1,
  },
]);

router.post("/add", fields, (req, res) => {
  console.log(req.body);
  const imageName = uploadSetting.cekNull(req.files["fotoProduk"]);

  const data = Object.assign(JSON.parse(req.body.data), {
    fotoProduk: imageName,
  });
  console.log(data);
  userController
    .tambah(data)
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

router.get("/getAll", (req, res) => {
  userController
    .getAll()
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
  //   console.log(result);
});

router.get("/getbyid/:id", (req, res) => {
  //   console.log(req.params.id);
  userController
    .getById(req.params.id)
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

router.put("/edit/:id", fields, (req, res) => {
  const imageName = uploadSetting.cekNull(req.files["image"]);

  let data = JSON.parse(req.body.data);
  let changeImage = false;
  if (imageName) {
    changeImage = true;
    data = Object.assign(data, {
      image: imageName,
      oldImage: data.image,
    });
  }
  console.log(changeImage);
  userController
    .edit(data, req.params.id, changeImage)
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

router.delete("/delete/:id", (req, res) => {
  userController
    .delete(req.params.id)
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

module.exports = router;

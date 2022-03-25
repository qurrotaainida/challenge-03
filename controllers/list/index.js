const path = require("path");
const fs = require("fs");
const Cars = require("../../sources/cars");
const moment = require("moment");

exports.view = (req, res) => {
  const locals = {
    car: Cars,
    title: "List Car",
    layout: "./layouts/sidebar",
  };
  res.render("pages/list/index", locals);
};
exports.create = (req, res) => {
  const locals = {
    title: "Add New Car",
    layout: "./layouts/sidebar",
  };
  res.render("pages/list/form", locals);
};
exports.create_store = (req, res, next) => {
  const id = Cars.length > 0 ? Cars[Cars.length - 1].id + 1 : 1;
  if (!req.body.name) {
    req.toastr.error("Nama tidak boleh kosong");
    return res.redirect("/list");
  }
  if (!req.body.price) {
    req.toastr.error("Harga tidak boleh kosong");
    return res.redirect("/list");
  }
  if (!req.files || Object.keys(req.files).length === 0) {
    req.toastr.error("Gambar tidak boleh kosong");
    return res.redirect("/list");
  }
  const img = req.files.image;
  img.mv(path.join(__dirname, "../../vendor/upload/") + id + img.name);

  const startRent = moment(req.body.start_rent);
  const finishRent = moment(req.body.finish_rent);
  const updateAt = moment().toDate();
  const createdAt = moment().toDate();

  const uploaded = "/upload/" + id + img.name;
  Cars.push({
    id: id,
    name: req.body.name,
    price: req.body.price,
    image: uploaded,
    start_rent: startRent,
    finish_rent: finishRent,
    update_at: updateAt,
    created_at: createdAt,
  });
  req.toastr.success("Data Berhasil Disimpan");

  res.redirect("/list");
};
exports.update = (req, res) => {
  const locals = {
    title: "Update Car",
    layout: "./layouts/sidebar",
    dataUpdate: null,
  };
  const foundIndex = Cars.findIndex((x) => x.id === parseInt(req.params.id));
  locals.dataUpdate = Cars[foundIndex];
  res.render("pages/list/form", locals);
};
// UPDATE CAR FUNCTION
exports.update_store = (req, res, next) => {
  const foundIndex = Cars.findIndex((x) => x.id === parseInt(req.params.id));
  // VALIDATION
  if (!req.body.name) {
    req.toastr.error("Nama tidak boleh kosong");
    return res.redirect("/list");
  }
  if (!req.body.price) {
    req.toastr.error("Harga tidak boleh kosong");
    return res.redirect("/list");
  }
  // CHECK IF IMAGE CHANGE
  if (req.files) {
    if (Cars[foundIndex].image !== "/img/car.png") {
      fs.unlinkSync(
        path.join(__dirname, "../../vendor") + Cars[foundIndex].image
      );
    }
    const img = req.files.image;
    img.mv(
      path.join(__dirname, "../../vendor/upload/") +
        Cars[foundIndex].id +
        img.name
    );
    const uploaded = "/upload/" + Cars[foundIndex].id + img.name;
    Cars[foundIndex].image = uploaded;
  }

  // UPDATE DATA
  const startRent = moment(req.body.start_rent);
  const finishRent = moment(req.body.finish_rent);
  const updateAt = moment().toDate();

  Cars[foundIndex].name = req.body.name;
  Cars[foundIndex].price = req.body.price;
  Cars[foundIndex].start_rent = startRent;
  Cars[foundIndex].finish_rent = finishRent;
  Cars[foundIndex].updated_at = updateAt;

  req.toastr.success("Data Berhasil Diubah");
  res.redirect("/list");
};
exports.destroy = (req, res, next) => {
  const foundIndex = Cars.findIndex((x) => x.id === parseInt(req.params.id));
  if (Cars[foundIndex].image !== "/img/car.png") {
    fs.unlinkSync(
      path.join(__dirname, "../../vendor") + Cars[foundIndex].image
    );
  }
  Cars.splice(foundIndex, 1);

  req.toastr.info("Data Berhasil Dihapus");
  res.redirect("/list");
};

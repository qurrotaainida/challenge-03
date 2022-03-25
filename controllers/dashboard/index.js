const tables = require("../../sources/tables");

exports.view = (req, res) => {
  const locals = {
    title: "Dashboard",
    layout: "./layouts/sidebar",
    dataTable1: tables.table1,
    dataTable2: tables.table2,
  };

  res.render("pages/index", locals);
};

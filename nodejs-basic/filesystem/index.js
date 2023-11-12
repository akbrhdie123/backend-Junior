// TODO: tampilkan teks pada notes.txt pada console.

const fs = require("fs");

const { resolve } = require("path");

const bacadata = (error, data) => {
  if (error) {
    console.log("gagal membaca file berkas");
    return;
  }
  console.log(data);
};

fs.readFile(resolve(__dirname, "notes.txt"), "utf-8", bacadata);

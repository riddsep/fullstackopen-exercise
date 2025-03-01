const fs = require("node:fs");

// const data = fs.writeFileSync("data/tes.txt", "HELLO NODEJS");
// console.log(data);

fs.writeFile("data/tes.txt", "HELLO INI ASYNC", (error) => {
  if (error) throw error;
});

const data = fs.readFileSync("data/tes.txt", "utf8");
console.log(data);

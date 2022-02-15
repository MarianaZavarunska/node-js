const path = require("path");
const fs = require("fs");

const onlineUsers = [
  { name: "Andrii", age: 22, city: "Lviv" },
  { name: "Mariana", age: 18, city: "Lviv" },
];
const inPersonUsers = [{ name: "Ann", age: 25, city: "Kyiv" }];

for (const user of onlineUsers) {
  for (const key in index) {
    fs.appendFile(
      path.join(__dirname, "main", "online", "online.txt"),
      `${key}:${user[key]}`,
      (err) => {
        if (err) {
          console.log(err);
          throw err;
        }
      }
    );
  }
}

const path = require("path");
const fs = require("fs");

const onlineUsers = [
  { name: "Andrii", age: 22, city: "Lviv" },
  { name: "Mariana", age: 18, city: "Lviv" },
];
const inPersonUsers = [
  { name: "Ann", age: 25, city: "Kyiv" },
  { name: "Valera", age: 35, city: "Odessa" },
];

for (const user of onlineUsers) {
  for (const key in user) {
    fs.writeFileSync(
      path.join(__dirname, "main", "online", "online.txt"),
      `\n${key}:${user[key]};\n`,
      (err) => {
        if (err) {
          console.log(err);
          throw err;
        }
      }
    );
  }
}

for (const user of inPersonUsers) {
  for (const key in user) {
    fs.writeFileSync(
      path.join(__dirname, "main", "inPerson", "inPerson.txt"),
      `\n${key}:${user[key]};\n`,
      (err) => {
        if (err) {
          console.log(err);
          throw err;
        }
      }
    );
  }
}

function changeUsers() {
  for (const user of onlineUsers) {
    for (const key in user) {
      fs.appendFileSync(
        path.join(__dirname, "main", "inPerson", "inPerson.txt"),
        `\n${key}:${user[key]};\n`,
        (err) => {
          if (err) {
            console.log(err);
            throw err;
          }
        }
      );
    }
  }

  for (const user of inPersonUsers) {
    for (const key in user) {
      fs.appendFileSync(
        path.join(__dirname, "main", "online", "online.txt"),
        `\n${key}:${user[key]};\n`,
        (err) => {
          if (err) {
            console.log(err);
            throw err;
          }
        }
      );
    }
  }
}

changeUsers();

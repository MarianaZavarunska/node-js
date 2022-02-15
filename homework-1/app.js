const path = require("path");
const fs = require("fs");

//data

const onlineUsers = [
  { name: "Andrii", age: 22, city: "Lviv" },
  { name: "Mariana", age: 18, city: "Lviv" },
];
const inPersonUsers = [
  { name: "Ann", age: 25, city: "Kyiv" },
  { name: "Valera", age: 35, city: "Odessa" },
];

//folders

// fs.mkdir(path.join(__dirname, "main"), (err) => {
//   if (err) {
//     console.log(err);
//     throw err;
//   }
// });
// fs.mkdir(path.join(__dirname, "main", "online"), (err) => {
//   if (err) {
//     console.log(err);
//     throw err;
//   }
// });

// fs.mkdir(path.join(__dirname, "main", "inPerson"), (err) => {
//   if (err) {
//     console.log(err);
//     throw err;
//   }
// });

// paths

const pathOnline = path.join(__dirname, "main", "online", "online.txt");
const pathInPerson = path.join(__dirname, "main", "inPerson", "inPerson.txt");

// add data to files

// for (const user of onlineUsers) {
//   for (const key in user) {
//     fs.appendFile(pathOnline, `\n${key}:${user[key]};\n`, (err) => {
//       if (err) {
//         console.log(err);
//         throw err;
//       }
//     });
//   }
// }

// for (const user of inPersonUsers) {
//   for (const key in user) {
//     fs.appendFile(pathInPerson, `\n${key}:${user[key]};\n`, (err) => {
//       if (err) {
//         console.log(err);
//         throw err;
//       }
//     });
//   }
// }

// func

function exchangeFilesData() {
  fs.readFile(pathOnline, (err, dataOnline) => {
    if (err) {
      console.log(err);
      throw err;
    }

    if (dataOnline) {
      fs.readFile(pathInPerson, (err, dataInPerson) => {
        if (err) {
          console.log(err);
          throw err;
        }

        if (dataInPerson) {
          fs.writeFile(pathOnline, dataInPerson, (err) => {
            if (err) {
              console.log(err);
              throw err;
            }

            fs.writeFile(pathInPerson, dataOnline, (err) => {
              if (err) {
                console.log(err);
                throw err;
              }
            });
          });
        }
      });
    }
  });
}

exchangeFilesData();

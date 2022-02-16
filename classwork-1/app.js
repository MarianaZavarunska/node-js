const path = require("path");
const fs = require("fs");

// const rimraf = require("rimraf");

// condole.log("====Task 1====");

// 1. Спробуйте створити якийсь файл txt, прочитайте з нього дані і одразу, дані які ви отримали запишіть їх в інший файл.

// fs.mkdir(path.join(__dirname, "task-1"), (err) => {
//   if (err) {
//     console.log(err);
//     throw err;
//   }
// });

// fs.writeFile(
//   path.join(__dirname, "task-1", "file-1.txt"),
//   "NEW_DATA",
//   (err) => {
//     if (err) {
//       console.log(err);
//       throw err;
//     }

//     fs.readFile(path.join(__dirname, "task-1", "file-1.txt"), (err, data) => {
//       if (err) {
//         console.log(err);
//         throw err;
//       }

//       if (data) {
//         fs.writeFile(
//           path.join(__dirname, "task-1", "file-2.txt"),
//           `${data}`,
//           (err) => {
//             if (err) {
//               console.log(err);
//               throw err;
//             }
//           }
//         );
//       }
//     });
//   }
// );

// console.log("====Task 2====");

// 2. Створіть файл ( можете вручну ) заповніть його якимись даними
// Прочитайте його, скопіюйте всі дані з нього і перенесіть їх в нову папку та файл в ній, старий файл видаліть після того як все завершиться. Також вийде callback hell

// fs.mkdir(path.join(__dirname, "task-2"), (err) => {
//   if (err) {
//     console.log(err);
//     throw err;
//   }
// });

// const users = ["Lilya", "Olya", "Max", "Olena", "Andrii", "Kolya"];

// for (let user of users) {
//   fs.appendFile(
//     path.join(__dirname, "task-2", "users.txt"),
//     `\n${user}`,
//     (err) => {
//       if (err) {
//         console.log(err);
//         throw err;
//       }
//     }
//   );
// }

// fs.readFile(path.join(__dirname, "task-2", "users.txt"), (err, data) => {
//   if (err) {
//     console.log(err);
//     throw err;
//   }

//   if (data) {
//     fs.mkdir(path.join(__dirname, "task-2", "user-copy"), (err) => {
//       if (err) {
//         console.log(err);
//         throw err;
//       }
//     });

//     fs.writeFile(
//       path.join(__dirname, "task-2", "user-copy", "user-copy.txt"),
//       `${data}`,
//       (err) => {
//         if (err) {
//           console.log(err);
//           throw err;
//         }
//       }
//     );
//     fs.unlink(path.join(__dirname, "task-2", "users.txt"), (err) => {
//       if (err) {
//         console.log(err);
//         throw err;
//       }
//     });
//   }
// });

// condole.log("====Task 3====");

// 3. Створіть папку (можете вручну) напишіть скріпт який створить в ній якись дані (можуть бути нові папки і файли(в файли запишіть якусь дату) )

const readErr = (err) => {
  if (err) {
    console.log(err);
    throw err;
  }
};

 function createFolders() {
 fs.mkdir(path.join(__dirname, "task-3"), readErr);

  for (i = 6; i > 0; i--) {
     fs.mkdir(
      path.join(__dirname, "task-3", `folder_${i}`),
      readErr
    );

    if (i <= 4) {
      fs.mkdir(
        path.join(__dirname, "task-3", `folder_${i}`, `folder_${i - 1}`),
        {recursive: true},
        readErr
      );
    }
    if (i <= 2) {
     fs.writeFile(
        path.join(__dirname, "task-3", `folder_${i}`, `file_${i - 1}.txt`),
        `new data${i}`,
        readErr
      );
    }
  }
}

function deleteDir() {
  fs.rm(
    path.join(__dirname, "task-3"),
    { recursive: true, force: true },
    readErr
  );
  // rimraf(path.join(__dirname, "task-3"), readErr);
}

// і напишіть функцію яка буде зчитувати папку і перевіряти якщо дані які в ній лежать - це файли тоді вам потрібно їх очистити, але не видаляти, якщо дані - це папки, вам потрібно їх перейменувати і додати до назви префікс _new

function readData() {
 fs.readdir(
    path.join(__dirname, "task-3"),
    { withFileTypes: true },
   (err, listOfFiles1) => {
      readErr(err);

      listOfFiles1.forEach((file1) => {
        console.log(file1.name);

        if (file1.isFile()) {
          fs.truncate(
            path.join(__dirname, "task-3", `${file1.name}`),
            0,
            readErr
          );
        } else {
            fs.rename(
            path.join(__dirname, "task-3", `${file1.name}`),
            path.join(__dirname, "task-3", `new_${file1.name}`),
            readErr
          );
          fs.readdir(
            path.join(__dirname, "task-3", `new_${file1.name}`),
            { withFileTypes: true },
           (err, listOfFiles2) => {
              readErr(err);

              listOfFiles2.forEach((file2) => {
                console.log(file2.name);

                if (file2.isFile()) {
                  fs.truncate(
                    path.join( __dirname, "task-3", `new_${file1.name}`, `${file2.name}` ), 0,readErr);
                  
                } else {

                    fs.rename(
                    path.join(  __dirname, "task-3",`new_${file1.name}`,`${file2.name}` ),
                    path.join(__dirname, "task-3", `new_${file1.name}`, `new_${file2.name}`),
                    readErr
                  );
                }
              });
            }
          );
        }
      });
    }
  );
}

// deleteDir();
// createFolders();
// readData();

// recursion ??

// function readDataRecursion (fileName = '') {
//    fs.readdir( path.join(__dirname, "task-3",fileName),{ withFileTypes: true },
//          (err, listOfFiles1) => {
//           readErr(err);
    
//           listOfFiles1.forEach( (file1) => {
//             console.log(file1.name);
    
//             if (file1.isFile()) {
//               fs.truncate(
//                 path.join(__dirname, "task-3", `${file1.name}`),
//                 0,
//                 readErr
//               );
//             } else {
//                fs.rename(
//                 path.join(__dirname, "task-3", `${file1.name}`),
//                 path.join(__dirname, "task-3", `new_${file1.name}`),
//                 readErr
//               );
//               readDataRecursion (`new_${file1.name}`)
//               }
//             }
//           )
//         }
        
//   )}

// readDataRecursion();
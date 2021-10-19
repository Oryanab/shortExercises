const fs = require("fs");

const testFolder = "./maze";

let pathfile = [];
let pathdir = [];

function findTreasureSync(dir) {
  fs.readdir(dir, (err, files) => {
    files.forEach((file) => {
      if (file.includes("room")) {
        pathdir.push(dir + "/" + file);
      } else {
        pathfile.push(dir + "/" + file);
      }
    });
    for (let room of pathdir) {
      fs.readdir(room, (err, files) => {
        files.forEach((file) => {
          if (file.includes("room")) {
            pathdir.push(room + "/" + file);
          } else {
            pathfile.push(room + "/" + file);
          }
        });

        for (let room2 of pathdir) {
          fs.readdir(room2, (err, files) => {
            files.forEach((file) => {
              if (file.includes("room")) {
                pathdir.push(room2 + "/" + file);
              } else {
                pathfile.push(room2 + "/" + file);
              }
            });

            for (let file of pathfile) {
              fs.readFile(file, (err, data) => {
                if (
                  isJson(data) &&
                  JSON.parse(data).hasOwnProperty("treasure")
                ) {
                  console.log(file);
                }
              });
            }
          });
        }
      });
    }
  });
}

findTreasureSync(testFolder);

function isJson(str) {
  try {
    JSON.parse(str);
    return true;
  } catch (e) {
    return false;
  }
}

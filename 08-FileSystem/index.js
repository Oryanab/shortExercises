const fs = require("fs");
const { listenerCount } = require("process");

const testFolder = "./maze";

let pathfile = [];
let pathdir = [];
function copystuff(dir) {
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
            for (let room3 of pathdir) {
              fs.readdir(room3, (err, files) => {
                files.forEach((file) => {
                  if (file.includes("room")) {
                    pathdir.push(room3 + "/" + file);
                  } else {
                    pathfile.push(room3 + "/" + file);
                  }
                });
                for (let file of pathfile) {
                  fs.readFile(file, function read(err, data) {
                    try {
                      const jsonFile = JSON.parse(data);
                      if (jsonFile.hasOwnProperty("treasure")) {
                        console.log(file);
                      }
                    } catch (e) {}
                  });
                }
              });
            }
          });
        }
      });
    }
  });
}
copystuff(testFolder);

// returnFilesInsideDir(testFolder + "room-0");
// returnFilesInsideDir(testFolder + "room-1");
// returnFilesInsideDir(testFolder + "room-2");

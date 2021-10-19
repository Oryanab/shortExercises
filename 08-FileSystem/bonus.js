const fs = require("fs");
const testFolder = "./maze";
let found = false;
function isJson(str) {
  try {
    JSON.parse(str);
    return true;
  } catch (e) {
    return false;
  }
}

async function findTreasure(roomPath) {
  fs.readdir(roomPath, (err, files) => {
    for (let file of files) {
      if (found) {
        return;
      } else {
        openChest(file, roomPath);
      }
    }
  });
}

async function openChest(file, path) {
  if (file.includes("room")) return;
  fs.readFile(`${path}\\${file}`, (err, data) => {
    if (err) return;
    if (!isJson(data)) return;
    const content = JSON.parse(data);
    if (content.hasOwnProperty("treasure")) {
      console.log("we won!", path);
      found = true;
      return;
    }
    if (!content.clue) return;
    if (!content.clue.includes("maze")) return;

    findTreasure(content.clue).then(drawMap(path));
  });
}

function drawMap(currentRoomPath) {
  fs.appendFile("./mapBonus.txt", `${currentRoomPath}, `, (err) => {
    return;
  });
}

//start point
findTreasure(testFolder);

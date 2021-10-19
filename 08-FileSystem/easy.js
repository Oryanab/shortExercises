const fs = require("fs");
const testFolder = "./maze";
let found = false;
let entered = false;
function isJson(str) {
  try {
    JSON.parse(str);
    return true;
  } catch (e) {
    return false;
  }
}

function findTreasureSync(roomPath) {
  entered = false;
  const files = fs.readdirSync(roomPath);
  for (let file of files) {
    if (found || entered) {
      return;
    } else {
      openChestSync(file, roomPath);
    }
  }
}

function openChestSync(file, path) {
  if (!file.includes("chest")) return;
  const chest = fs.readFileSync(`${path}\\${file}`);
  if (!isJson(chest)) return;
  const content = JSON.parse(chest);
  if (content.hasOwnProperty("treasure")) {
    console.log("we won!", path);
    found = true;
    return;
  } else {
    if (!content.clue.includes("maze")) return;
    drawMapSync(path);
    findTreasureSync(content.clue);
    entered = true;
  }
}

function drawMapSync(currentRoomPath) {
  fs.appendFile("./mapEasy.txt", `${currentRoomPath}, `, (err) => {
    return;
  });
}

//start point
findTreasureSync(testFolder);

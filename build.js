const fs = require("fs-extra");
const pug = require("pug");
const changeCase = require("change-case");

const rawPath = __dirname + "/raw/";
const audioPath = __dirname + "/audio/";

fs.removeSync(audioPath); // I just deleted my entire HOME directory.

// Read files
let files = fs.readdirSync("./raw").filter((f) => f != ".DS_Store");
let move = files.map((fileName) => {
  return {
    newPath: audioPath + fileName.split(" ").join("_").toLowerCase(),
    oldPath: rawPath + fileName,
    fileName: fileName.split(" ").join("_").toLowerCase(),
  };
});

let manifest = [];

move.forEach((file) => {
  fs.copySync(file.oldPath, file.newPath);

  manifest.push({
    title: changeCase.titleCase(file.fileName.split(".")[0]).trim(),
    path: "audio/" + file.fileName,
  });
});

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Write HTML
let html = pug.renderFile(`./pug/index.pug`, {
  pretty: true,
  files: manifest.sort((a, b) => (a.title > b.title ? 1 : -1)),
});

fs.writeFileSync("index.html", html);

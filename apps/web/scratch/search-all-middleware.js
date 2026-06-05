const fs = require("fs");
const path = require("path");

function walk(dir) {
  let results = [];
  try {
    const list = fs.readdirSync(dir);
    list.forEach((file) => {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);
      if (stat && stat.isDirectory()) {
        if (!file.startsWith(".") && file !== "node_modules") {
          results = results.concat(walk(fullPath));
        }
      } else {
        results.push(fullPath);
      }
    });
  } catch (e) {}
  return results;
}

const allFiles = walk(".");
console.log("Searching for files containing 'middleware' in name...");
allFiles.forEach(f => {
  if (f.toLowerCase().includes("middleware")) {
    console.log(f);
  }
});

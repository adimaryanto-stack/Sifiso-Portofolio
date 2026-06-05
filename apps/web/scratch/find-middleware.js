const fs = require("fs");
const path = require("path");

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      results.push(file);
    }
  });
  return results;
}

const files = walk("apps/web/src");
console.log("Files in apps/web/src:");
files.forEach(f => {
  if (f.toLowerCase().includes("middleware") || f.toLowerCase().includes("proxy")) {
    console.log("MATCH:", f);
  }
});

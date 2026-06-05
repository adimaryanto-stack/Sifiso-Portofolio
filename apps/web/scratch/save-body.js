const http = require("http");
const fs = require("fs");

http.get("http://localhost:3000/id", (res) => {
  let body = "";
  res.on("data", (chunk) => {
    body += chunk;
  });
  res.on("end", () => {
    fs.writeFileSync("apps/web/scratch/response-body.html", body);
    console.log("Response written to apps/web/scratch/response-body.html");
  });
});

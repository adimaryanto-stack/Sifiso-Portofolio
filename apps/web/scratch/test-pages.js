const http = require("http");

const pages = [
  "http://localhost:3000/services"
];

let completed = 0;
pages.forEach((page) => {
  http.get(page, (res) => {
    let body = "";
    res.on("data", chunk => body += chunk);
    res.on("end", () => {
      console.log(`PAGE: ${page} -> STATUS: ${res.statusCode} | Length: ${body.length}`);
      if (res.statusCode !== 200) {
        console.log(body);
      }
      completed++;
    });
  }).on("error", (err) => {
    console.error(`Error loading page ${page}:`, err);
    completed++;
  });
});

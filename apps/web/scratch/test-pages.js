const http = require("http");

const pages = [
  "http://localhost:3000/",
  "http://localhost:3000/get-started",
  "http://localhost:3000/work",
  "http://localhost:3000/blog"
];

let completed = 0;
pages.forEach((page) => {
  http.get(page, (res) => {
    let body = "";
    res.on("data", chunk => body += chunk);
    res.on("end", () => {
      console.log(`PAGE: ${page} -> STATUS: ${res.statusCode} | Length: ${body.length}`);
      completed++;
      if (completed === pages.length) {
        console.log("All page tests complete!");
      }
    });
  }).on("error", (err) => {
    console.error(`Error loading page ${page}:`, err);
    completed++;
  });
});

const http = require("http");

const pages = [
  "http://localhost:3000/en",
  "http://localhost:3000/en/get-started",
  "http://localhost:3000/en/services/ui-ux-design"
];

let completed = 0;
pages.forEach((page) => {
  http.get(page, (res) => {
    console.log(`PAGE: ${page} -> STATUS: ${res.statusCode}`);
    completed++;
    if (completed === pages.length) {
      console.log("All page tests complete!");
    }
  }).on("error", (err) => {
    console.error(`Error loading page ${page}:`, err);
    completed++;
  });
});

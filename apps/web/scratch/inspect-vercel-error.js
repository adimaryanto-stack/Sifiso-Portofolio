const https = require("https");

const pages = [
  "https://sifiso-portofolio-web.vercel.app/",
  "https://sifiso-portofolio-web.vercel.app/work",
  "https://sifiso-portofolio-web.vercel.app/services",
  "https://sifiso-portofolio-web.vercel.app/get-started",
  "https://sifiso-portofolio-web.vercel.app/blog"
];

let completed = 0;
pages.forEach((page) => {
  https.get(page, (res) => {
    let body = "";
    res.on("data", chunk => body += chunk);
    res.on("end", () => {
      const hasErrorText = body.includes("Something went wrong");
      console.log(`PAGE: ${page} -> STATUS: ${res.statusCode} | Includes Error: ${hasErrorText} | Length: ${body.length}`);
      completed++;
      if (completed === pages.length) {
        console.log("All live page checks complete!");
      }
    });
  }).on("error", (err) => {
    console.error(`Error loading page ${page}:`, err);
    completed++;
  });
});

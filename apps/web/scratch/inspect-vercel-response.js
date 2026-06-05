const https = require("https");

const url = "https://sifiso-portofolio-web.vercel.app/";
console.log(`Fetching ${url}...`);

https.get(url, (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  console.log("HEADERS:", res.headers);
  
  let body = "";
  res.on("data", chunk => body += chunk);
  res.on("end", () => {
    console.log("\nBODY (first 2000 chars):");
    console.log(body.substring(0, 2000));
    console.log("\nBODY (last 1000 chars):");
    console.log(body.substring(body.length - 1000));
  });
}).on("error", (err) => {
  console.error("Fetch error:", err);
});
